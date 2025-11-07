import { createServerFn } from "@tanstack/react-start"
import { QlikItem } from "~/features/qlik/types"
import kyInstance from "src/lib/ky"
import { SelectionFiltersSchema } from "./qlik.schema"
import { db } from "~/features/db/lib"
import { selection } from "~/features/qlik/schema"
import { and, eq } from "drizzle-orm"
import { userMiddleware } from "./auth.api"

export const fetchQlikItems = createServerFn({ method: 'GET' }).handler(
  async () => {
    return kyInstance.get(`http://localhost:3000/api/qlik/items`).json<QlikItem[]>()
  }
)

export const getSelections = createServerFn({ method: 'GET' })
  .inputValidator(SelectionFiltersSchema)
  .middleware([userMiddleware])
  .handler(async ({ data, context: { userSession } }) => {
    if (!userSession) return null
    if (!data.appId) return null

    const selections = await db
      .select()
      .from(selection)
      .where(
        and(
          eq(selection.applicationId, data.appId!),
          eq(selection.userId, userSession.user.id)
        )
      )
      .orderBy(selection.createdAt)
      console.log('selections', selections);
    return selections
  })
