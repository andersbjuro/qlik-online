import { createServerFn, createMiddleware} from "@tanstack/react-start"
import { getRequest } from "@tanstack/react-start/server"
import { auth } from "src/features/auth/lib"

export const getUserSession = createServerFn({ method: "GET" }).handler(
  async () => {
    const request = getRequest()

    if (!request?.headers) {
      return null
    }

    const userSession = await auth.api.getSession({ headers: request.headers })

    if (!userSession) return null

    return { user: userSession.user, session: userSession.session }
  },
)

export const userMiddleware = createMiddleware({ type: "function" }).server(
  async ({ next }) => {
    const userSession = await getUserSession()

    return next({ context: { userSession } })
  },
)
