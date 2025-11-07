import { createFileRoute } from "@tanstack/react-router";
import RequestPasswordReset from "src/features/auth/client/components/request-password-reset";

export const Route = createFileRoute("/_auth/request-reset-password")({
  component: RouteComponent,
});

function RouteComponent() {
  return <RequestPasswordReset />;
}
