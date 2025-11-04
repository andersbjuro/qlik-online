import { createFileRoute } from "@tanstack/react-router";
import ApplicationList from "~/features/qlik/components/application-list";
import { qlikItemsQueryOptions } from "~/services/qlik";

export const Route = createFileRoute("/_app/dashboard/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(qlikItemsQueryOptions())
  },
});

function RouteComponent() {

  return (
    <div>
      <ApplicationList />
    </div>
  )
}
