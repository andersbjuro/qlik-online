import { createAuthClient } from "better-auth/react";
import {
  inferAdditionalFields, adminClient, organizationClient,
  customSessionClient, multiSessionClient, genericOAuthClient, passkeyClient
} from "better-auth/client/plugins";
import { auth } from ".";
import { useSuspenseQuery } from "@tanstack/react-query";
import { authQueries } from "src/services/queries";

export const authClient = createAuthClient({
  // baseURL: "http://localhost:3000",
  plugins: [
    genericOAuthClient(),
    inferAdditionalFields<typeof auth>(),
    passkeyClient(),
    adminClient(),
    multiSessionClient(),
    organizationClient(),
    customSessionClient<typeof auth>(),
  ],
});

export const useAuthentication = () => {
  const { data: userSession } = useSuspenseQuery(authQueries.user())

  return { userSession, isAuthenticated: !!userSession }
}

export const useAuthenticatedUser = () => {
  const { userSession } = useAuthentication()

  if (!userSession) {
    throw new Error("User is not authenticated!")
  }

  return userSession
}
