import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { QlikItem } from "~/features/qlik/components/qlik-item";
import { qlikQueries } from "~/services/queries";

export const Route = createFileRoute("/_app/dashboard/")({
  component: RouteComponent
});

function RouteComponent() {

  return (
    <div>
      <main>
        <h1 className="text-xl font-medium mb-3 pl-3">Katalog</h1>
        <div className="container mx-auto px-4 ">
          <Suspense fallback={<div>Laddar...</div>}>
            <Items />
          </Suspense>
        </div>
      </main>
    </div>
  )
}

function Items() {
  const { data: items } = useSuspenseQuery(qlikQueries.items())

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {items && Array.isArray(items) && items
        .slice() // avoid mutating original array
        .sort((a: any, b: any) => a.spaceId.localeCompare(b.spaceId)).map((item: any) => (
          <QlikItem key={item.resourceId} item={item} />
        ))}
      {Array.isArray(items) && items.length === 0 && <div className="flex justify-center items-center col-span-3">
        <div className="text-xl font-semibold">Inga publiserade applikationer</div>
      </div>
      }
    </div>
  )
}
