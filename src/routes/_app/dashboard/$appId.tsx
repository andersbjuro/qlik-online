import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import QlikSheet from '~/features/qlik/components/qlik-sheet'

export const Route = createFileRoute('/_app/dashboard/$appId')({
  component: RouteComponent,
})

function RouteComponent() {
  const appId = "c60b1314-0442-4ae8-8c27-a8cb6bd2b4a9" // Replace with your Qlik app ID
  return (
    <main className="flex">
      <Suspense fallback={<span className="p-10">Laddar Qlik...</span>}>
        <QlikSheet appId={appId} />
      </Suspense>
    </main>
  )
}
