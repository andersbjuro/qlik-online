import { createServerFn } from "@tanstack/react-start"
import { QlikItem, SelectionData } from "~/features/qlik/types"
import { AddSelectionSchema, DeleteSelectionSchema, SelectionFiltersSchema, SetSelectionSchema } from "./qlik.schema"
import { db } from "~/features/db/lib"
import { selection } from "~/features/qlik/schema"
import { and, eq } from "drizzle-orm"
import { userMiddleware } from "./auth.api"
import { getQlikUser, getQlikItems, getQlikAppSession, getHyperCube, getSelections as qGetelections, setSelections } from "~/features/qlik/qlik-actions"

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
    return items
  })

export const getQlikSelection = createServerFn({ method: 'GET' })
  .inputValidator(SelectionFiltersSchema)
  .middleware([userMiddleware])
  .handler(async ({ data, context: { userSession } }) => {
    console.log("Getting Qlik Selection for appId:", data.appId);
    if (!userSession) return null
    if (!data.appId) return null

    const currentUser = await getQlikUser(userSession.user.email);
    const qlikUser = currentUser.data?.[0];

    if (!qlikUser) {
      return Response.json({ error: 'Qlik user not found' }, { status: 404 });
    }

    const appSession = await getQlikAppSession(data.appId, currentUser.data?.[0]?.id ?? "");
    const app = await appSession.getDoc();
    const qlikSelection = await qGetelections(app)

    const qData = await getHyperCube(app, [], ["Count(FID)", "Count(DISTINCT PID)"]);
    const archive = await getHyperCube(app, ["Arkiv"], []);
    const ts01 = await getHyperCube(app, ["TS01"], []);
    const fid = await getHyperCube(app, ["FID"], [], 10000, 1);
    const vId = fid.map(row => row[0].qNum)!;

    const selection: SelectionData = {
      id: 0,
      userId: userSession.user.id,
      applicationId: data.appId,
      selectionFidCount: qData.map(row => row[0].qNum)[0]!,
      selectionPidCount: qData.map(row => row[1].qNum)[0]!,
      archive: archive.map(row => row[0].qText)[0]!,
      ts01: ts01.map(row => row[0].qText)[0]!,
      description: "",
      selectionAsJson: JSON.stringify(qlikSelection),
      createdAt: new Date().toISOString(),
      selectionLinesAsJson: vId.filter((n): n is number => typeof n === 'number'),
      bookmark: false,
    }
    await appSession.close()
    return selection as SelectionData
  })

export const setQlikSelection = createServerFn({ method: 'POST' })
  .inputValidator(SetSelectionSchema)
  .middleware([userMiddleware])
  .handler(async ({ data, context: { userSession } }) => {
    if (!userSession) return null
    if (!data.appId) return null

    const currentUser = await getQlikUser(userSession.user.email);
    const qlikUser = currentUser.data?.[0];

    const appSession = await getQlikAppSession(data.appId, qlikUser?.id ?? "");
    const app = await appSession.getDoc();

    await setSelections(app, JSON.parse(data.json));
    await appSession.close()
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

export const addSelection = createServerFn({
  method: "POST",
})
  .inputValidator(AddSelectionSchema)
  .middleware([userMiddleware])
  .handler(async ({ data }) => {
    const { id, selectionLinesAsJson, ...addsel } = data;
    const insertData = {
      ...addsel,
      selectionLines: data.selectionLinesAsJson ? JSON.stringify(data.selectionLinesAsJson) : ""
    };
    const [addSelection] = await db
      .insert(selection)
      .values(insertData)
      .returning()

    return addSelection
  });

  export const deleteSelection = createServerFn({
  method: "POST",
})
  .inputValidator(DeleteSelectionSchema)
  .middleware([userMiddleware])
  .handler(async ({ data }) => {

   const deleteSelection =  await db
      .delete(selection)
      .where(eq(selection.id, data.id))
      .returning()

    return deleteSelection
  });
