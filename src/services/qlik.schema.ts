import { z } from "zod"

export const SelectionFiltersSchema = z.object({
  appId: z.string().optional(),
})

export type SelectionFilters = z.infer<typeof SelectionFiltersSchema>
