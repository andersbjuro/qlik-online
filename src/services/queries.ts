import { SelectionFilters } from './qlik.schema';
import { queryOptions } from "@tanstack/react-query";
import { fetchQlikItems, getSelections } from "./qlik.api";
import { getUserSession } from "./auth.api";

export const authQueries = {
  all: ["auth"],
  user: () =>
    queryOptions({
      queryKey: [...authQueries.all, "user"],
      queryFn: () => getUserSession(),
      staleTime: 5000,
    }),
}

// export const qlikItemsQueryOptions = () =>
//   queryOptions({
//     queryKey: ['qlik-items'],
//     queryFn: () => fetchQlikItems()
//   })

export const qlikQueries = {
  all: ["qlik"],
  items: () =>
    queryOptions({
      queryKey: [...qlikQueries.all, "items"],
      queryFn: () => fetchQlikItems()
    })
}

export const selectionQueries = {
  all: ["selections"],
  list: (filter: SelectionFilters) =>
    queryOptions({
      queryKey: [...selectionQueries.all, "list", filter],
      queryFn: () => getSelections({ data: filter }),
    })
}
