import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";
import QlikSidebar from "~/features/qlik/components/qlik-sidebar";
import SiteHeader from "~/features/qlik/components/site-header";

export const Route = createFileRoute("/_app/dashboard")({
  component: RouteComponent,
  // loader: async ({ context }) => {
  //   context.queryClient.prefetchQuery(todosQueryOptions());
  // },
});

function RouteComponent() {

  return (
    <SidebarProvider style={
      {
        "--sidebar-width": "calc(var(--spacing) * 62)",
        "--header-height": "calc(var(--spacing) * 12)",
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
