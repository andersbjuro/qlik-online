import { createFileRoute } from "@tanstack/react-router";


export const Route = createFileRoute("/_app/admin/")({
  component: RouteComponent,
  // loader: async ({ context }) => {
  //   context.queryClient.prefetchQuery(todosQueryOptions());
  // },
});

function RouteComponent() {
  return (
    <>
      <div>ADMIN</div>
    </>
  );
}
