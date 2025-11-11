import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarInset, SidebarProvider } from "src/components/ui/sidebar";
import { AppSidebar } from "~/features/app/app-sidebar";
import QlikHeader from "~/features/qlik/components/qlik-header";
import { qlikQueries } from "~/services/queries";

export const Route = createFileRoute("/_app/dashboard")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(qlikQueries.items());
  },
});

function RouteComponent() {
  return (
    <SidebarProvider style={
      {
        "--sidebar-width": "calc(var(--spacing) * 62)",
        "--header-height": "calc(var(--spacing) * 12)",
      } as React.CSSProperties
    }>
      <AppSidebar />
      <SidebarInset>
        <QlikHeader />
        <div className="flex flex-1 flex-col gap-4 p-2 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
