import { createServerFn } from "@tanstack/react-start"
import { QlikItem } from "~/features/qlik/types"
import kyInstance from "src/lib/ky"
import { SelectionFiltersSchema } from "./qlik.schema"
import { db } from "~/features/db/lib"
import { selection } from "~/features/qlik/schema"
import { and, eq } from "drizzle-orm"
import { userMiddleware } from "./auth.api"
import { getQlikUser, getQlikItems } from "~/features/qlik/qlik-actions"

export const getQlikItemsForUser = createServerFn({ method: 'GET' })
  .middleware([userMiddleware])
  .handler(async ({ context: { userSession } }) => {
    if (!userSession) return null

    const currentUser = await getQlikUser(userSession.user.email);
    const qlikUser = currentUser.data?.[0];

    if (!qlikUser) {
      return Response.json({ error: 'Qlik user not found' }, { status: 404 });
    }

    const items: QlikItem[] = await getQlikItems(qlikUser);
    return items //Response.json(items, { status: 200 })
  })

export const getSelections = createServerFn({ method: 'GET' })
  .inputValidator(SelectionFiltersSchema)
  .middleware([userMiddleware])
  .handler(async ({ data, context: { userSession } }) => {
    if (!userSession) return null
    if (!data.appId) return []

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
    return selections
  })
