import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { auth } from "../lib";

export const isAuthenticated = createServerFn().handler(async () => {
  const request = getRequest();
  if (!request.headers) {
    throw new Error("No headers found in the request");
  }
  const session = await auth.api.getSession({ headers: request.headers });
  return session !== null;
});
