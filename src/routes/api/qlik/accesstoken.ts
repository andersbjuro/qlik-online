import { createFileRoute } from '@tanstack/react-router'
import { auth as qlikAuth, } from "@qlik/api";
import { getQlikUser, configFrontend } from 'src/features/qlik/qlik-actions';
import { getUserSession } from '~/services/auth.api';

export const Route = createFileRoute('/api/qlik/accesstoken')({
  server: {

    handlers: {
      POST: async () => {
        const user = await getUserSession();
        const currentUser = await getQlikUser(user?.user.email || "");
        const accessToken = await qlikAuth.getAccessToken({
          hostConfig: {
            ...configFrontend,
            userId: currentUser.data?.[0]?.id ?? undefined,
            scope: "user_default",
          }
        });
        return Response.json({ accessToken })
      },
    },
  }
})
