/// <reference types="vite/client" />
import { QueryClient } from '@tanstack/react-query'
import { HeadContent, Scripts, createRootRouteWithContext } from '@tanstack/react-router'
//import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
//import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import * as React from 'react'
import { DefaultCatchBoundary } from 'src/components/DefaultCatchBoundary'
import { NotFound } from 'src/components/NotFound'
import appCss from '../styles/app.css?url'
import { authQueries } from '~/services/queries'
import { Toaster } from '~/components/ui/sonner'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  beforeLoad: async ({ context }) => {
    const userSession = await context.queryClient.fetchQuery(authQueries.user())

    return { userSession }
  },
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Forba Online',
      },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: DefaultCatchBoundary,
  notFoundComponent: () => <NotFound />,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen flex flex-col antialiased ">
        <main className="flex-1 ">{children}</main>
        <Toaster />
      {/*   <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition='bottom-left'/> */}
        <Scripts />
      </body>
    </html>
  )
}
