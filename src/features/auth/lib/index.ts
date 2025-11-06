import { betterAuth, BetterAuthOptions } from "better-auth";
import { admin, createAuthMiddleware, customSession, genericOAuth, organization, multiSession } from "better-auth/plugins"
import { reactStartCookies } from "better-auth/react-start";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../../db/lib";
import * as schema from "../schema"
//import { email } from "@/features/email/server/service";
//import { passkey } from "better-auth/plugins/passkey";

const options = {
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
      user: schema.user,
      account: schema.account,
      session: schema.session,
      verification: schema.verification,
    },
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    // BUG: Prob a bug with updateAge method. It throws an error - Argument `where` of type SessionWhereUniqueInput needs at least one of `id` arguments.
    // As a workaround, set updateAge to a large value for now.
    updateAge: 60 * 60 * 24 * 7, // 7 days (every 7 days the session expiration is updated)
    // cookieCache: {
    //     enabled: true,
    //     maxAge: 5 * 60 // Cache duration in seconds
    // }
  },
  user: {
    additionalFields: {
      role: {
        type: ["user", "admin"],
        input: false,
      },
      onboardingComplete: {
        type: "boolean",
        input: false,
      },
      issuer: {
        type: "string",
        input: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false
  },
  plugins: [
    reactStartCookies(),
    multiSession(),
    admin(),
    organization(),
    genericOAuth({
      config: [
        {
          providerId: "forbaids",
          clientId: String(process.env.AUTH_CLIENT_ID),
          clientSecret: String(process.env.AUTH_CLIENT_SECRET),
          discoveryUrl: `${String(process.env.NEXT_PUBLIC_ISSUER_URL)}/.well-known/openid-configuration`,
          authorizationUrl: `${String(process.env.NEXT_PUBLIC_ISSUER_URL)}/connect/authorize`,
          tokenUrl: `${String(process.env.NEXT_PUBLIC_ISSUER_URL)}/connect/token`,
          scopes: ["openid", "profile", "email", "offline_access"],

          // `${String(process.env.ISSUER_URL)}/connect/token`
          mapProfileToUser: (profile) => {
            return {
              issuer: profile.iss,
              email: profile.email,
              //lastName: profile.family_name,
            };
          },
        },
      ]
    }),
  ],
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const ADMIN_EMAILS = process.env.ADMIN_EMAILS?.split(";") ?? [];
          return { data: { ...user, role: ADMIN_EMAILS.includes(user.email) ? 'admin' : 'user' } }
        },
      }
    },

  },
} satisfies BetterAuthOptions;

export const auth = betterAuth({
    ...options,
    hooks: {
        after: createAuthMiddleware(async (ctx) => {
            if (ctx.context.newSession) {
                if (ctx.context.newSession.user.onboardingComplete === false) {
                    console.log("User onboarding not complete, redirecting to onboarding page");
                    ctx.redirect("/onboarding");
                }
            }
        }),
    },
    plugins: [
        ...(options.plugins ?? []),
        customSession(async (session) => {
            return {
                ...session,
                user: {
                    ...session.user,
                    dd: "test",
                },
            };
        }, options),
    ],
});
