import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/dashboard/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_app/dashboard/settings"!</div>
}
