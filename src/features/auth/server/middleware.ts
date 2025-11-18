import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { auth } from "src/features/auth/lib";

export const withAuth = createMiddleware({
  type: "function",
}).server(async ({ next }) => {
  const request = getRequest();

  if (!request?.headers) {
    throw redirect({ to: "/sign-in" });
  }

  const session = await auth.api.getSession({ headers: request.headers });

  if (!session) {
    throw redirect({ to: "/sign-in" });
  }

  return next({
    context: { userId: session.user.id },
  });
});
