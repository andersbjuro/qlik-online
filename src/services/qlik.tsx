import { queryOptions } from "@tanstack/react-query"
import { createServerFn } from "@tanstack/react-start"
import { QlikItem } from "~/features/qlik/schema"
import kyInstance from "~/lib/ky"

export const fetchQlikItems = createServerFn({ method: 'GET' }).handler(
  async () => {
    console.info('Fetching qlik items...')
    return kyInstance.get(`http://localhost:3000/api/qlik/items`).json<QlikItem[]>()
  },
)

export const qlikItemsQueryOptions = () =>
  queryOptions({
    queryKey: ['qlik-items'],
    queryFn: () => fetchQlikItems(),
  })
