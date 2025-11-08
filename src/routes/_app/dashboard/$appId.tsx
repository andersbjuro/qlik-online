import { createFileRoute } from '@tanstack/react-router'
import QlikSheet from 'src/features/qlik/components/qlik-sheet'

export const Route = createFileRoute('/_app/dashboard/$appId')({
  component: RouteComponent
})

function RouteComponent() {
  const { appId } = Route.useParams()

  return (
    <main className="flex">
      <QlikSheet appId={appId} />
    </main>
  )
}
