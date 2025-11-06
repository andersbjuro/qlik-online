import { createFileRoute } from "@tanstack/react-router";
import SignIn from "src/features/auth/client/components/sign-in";

export const Route = createFileRoute("/_auth/sign-in")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex min-h-svh items-center justify-center gap-6 p-6 md:p-10">
      <SignIn />
    </main>
  );
}
