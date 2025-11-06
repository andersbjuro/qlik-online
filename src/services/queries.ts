import { queryOptions } from "@tanstack/react-query";
import { fetchQlikItems } from "./qlik.api";
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

export const qlikItemsQueryOptions = () =>
  queryOptions({
    queryKey: ['qlik-items'],
    queryFn: () => fetchQlikItems(),
  })
