import { z } from "zod"
import { SelectionData } from "~/features/qlik/types";

export const SelectionFiltersSchema = z.object({
  appId: z.string().optional(),
})

export type SelectionFilters = z.infer<typeof SelectionFiltersSchema>

export const AddSelectionSchema = z.custom<SelectionData>()

export const SetSelectionSchema = z.object({
  appId: z.string(),
  json: z.string(),
})

export const DeleteSelectionSchema = z.object({
  id: z.number(),
})
