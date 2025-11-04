import { createFileRoute } from '@tanstack/react-router'
import { auth as qlikAuth, } from "@qlik/api";
import { getQlikUser, configFrontend } from '../../../features/qlik/qlik-actions';

export const Route = createFileRoute('/api/qlik/accesstoken')({
  server: {
    handlers: {
      POST: async () => {
        const currentUser = await getQlikUser("anders@forba.se");
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
