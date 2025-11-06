import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { isAuthenticated } from "src/features/auth/server/utils";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
  beforeLoad: async () => {
    if (await isAuthenticated()) {
      throw redirect({ to: "/dashboard" });
    }
  },
});

function RouteComponent() {
  return (
    <div className="h-screen flex flex-col gap-4">
      <div className="grow flex flex-col justify-center">
        <Outlet />
      </div>
    </div>
  );
}
