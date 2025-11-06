import { createFileRoute } from "@tanstack/react-router";
import SignUp from "src/features/auth/client/components/sign-up";

export const Route = createFileRoute("/_auth/sign-up")({
  component: RouteComponent,
});

function RouteComponent() {
   return (
      <main className="flex min-h-svh items-center justify-center gap-6 p-6 md:p-10">
        <SignUp />
      </main>
    );
}
