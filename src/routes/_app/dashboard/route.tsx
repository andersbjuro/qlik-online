import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarInset, SidebarProvider } from "src/components/ui/sidebar";
import QlikSidebar from "src/features/qlik/components/qlik-sidebar";
import SiteHeader from "src/features/qlik/components/site-header";
import { qlikItemsQueryOptions } from "src/services/queries";

export const Route = createFileRoute("/_app/dashboard")({
  component: RouteComponent,
  loader: async ({ context }) => {
    await context.queryClient.prefetchQuery(qlikItemsQueryOptions())
  },
});

function RouteComponent() {

  return (
    <SidebarProvider style={
      {
        "--sidebar-width": "calc(var(--spacing) * 62)",
        "--header-height": "calc(var(--spacing) * 10)",
      } as React.CSSProperties
    }>
      <QlikSidebar variant='inset' />
      <SidebarInset>
        <SiteHeader />
        <main className='p-2'>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
