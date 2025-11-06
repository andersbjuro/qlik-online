import { createFileRoute } from "@tanstack/react-router";
import ApplicationList from "src/features/qlik/components/application-list";

export const Route = createFileRoute("/_app/dashboard/")({
  component: RouteComponent
});

function RouteComponent() {

  return (
    <div>
      <ApplicationList />
    </div>
  )
}
