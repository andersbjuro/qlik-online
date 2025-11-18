import { SelectionFilters } from './qlik.schema';
import { queryOptions } from "@tanstack/react-query";
import { getQlikItemsForUser, getQlikSelection, getSelections } from "./qlik.api";
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

export const qlikQueries = {
  all: ["qlik"],
  items: () =>
    queryOptions({
      queryKey: [...qlikQueries.all, "items"],
      queryFn: () => getQlikItemsForUser(),
    }),
  qSelections: (appId: string, enabled: boolean) =>
    queryOptions({
      queryKey: [...qlikQueries.all, "qSelections", appId],
      queryFn: () => getQlikSelection({ data: { appId } }),
      staleTime: 100,
      enabled: enabled
    })
}

export const selectionQueries = {
  all: ["selections"],
  list: (filter: SelectionFilters) =>
    queryOptions({
      queryKey: [...selectionQueries.all, "list", filter],
      queryFn: () => getSelections({ data: filter }),
      enabled: !!filter.appId,
    })
}
