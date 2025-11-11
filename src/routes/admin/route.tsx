import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
    <Outlet />
  </div>
}
