import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { isAuthenticated } from "src/features/auth/server/utils";

export const Route = createFileRoute("/_app")({
  component: RouteComponent,
  beforeLoad: async () => {
    if (!(await isAuthenticated())) {
      throw redirect({ to: "/sign-in" });
    }
  },
});

function RouteComponent() {
  return (
    <div className="flex flex-col">
      <main>
        <Outlet />
      </main>
    </div>
  )
}
