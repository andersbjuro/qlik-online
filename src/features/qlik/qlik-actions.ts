import { users as qlikUsers, qix as openAppSession, items as qlikItems, spaces as qlikSpaces } from "@qlik/api";
import { Doc } from "@qlik/api/qix";
import { User } from "@qlik/api/users";
import { QlikItem } from "./schema";

export const configFrontend = {
    authType: "oauth2" as const,
    host: import.meta.env.VITE_TENANT_URI!,
    clientId: import.meta.env.VITE_OAUTH_CLIENT_ID!,
    clientSecret: import.meta.env.VITE_OAUTH_CLIENT_SECRET!,
    noCache: true,
};

export async function getQlikItems(user: User) {
    const items: QlikItem[] = []
    const filteredSpaceIdsSet = new Set<string>();

    const hostConfig = { ...configFrontend, userId: user.id, scope: "user_default" }

    const { data: spaces } = await qlikSpaces.getSpaces({ type: "managed" }, { hostConfig });

    if (spaces.data && Array.isArray(spaces.data)) {
        for (let i = 0; i < spaces.data.length; i++) {
            const space = spaces.data[i];
            const { data: assignments } = await qlikSpaces.getSpaceAssignments(space.id, { type: "group" }, { hostConfig });

            // Get group IDs assigned to user
            const groupIds = (user.assignedGroups ?? []).map(g => g.id);

            // Filter spaceIds where assigneeId is in user's groupIds
            assignments.data?.forEach(a => {
                if (groupIds.includes(a.assigneeId) && !filteredSpaceIdsSet.has(a.spaceId)) {
                    filteredSpaceIdsSet.add(a.spaceId);
                }
            });
        }
    }
    const filteredSpaceIds = Array.from(filteredSpaceIdsSet);

    if (filteredSpaceIds.length > 0) {
        for (let i = 0; i < filteredSpaceIds.length; i++) {
            const { data: apps } = await qlikItems.getItems({ resourceType: "app", spaceId: filteredSpaceIds[i] }, { hostConfig });
            apps.data.map((item) => {
                items.push({
                    name: item.name,
                    spaceId: item.spaceId ? item.spaceId : "",
                    resourceId: item.resourceId ? item.resourceId : "",
                    resourceType: item.resourceType ? item.resourceType : "",
                    description: item.description ? item.description : "",
                    //createdAt: item ? new Date(item.createdAt) : new Date(),
                    //updatedAt: item.updatedAt ? new Date(item.updatedAt) : new Date()
                })
            });
        }
    }
    //console.log(items)
    return items
    // const { data: apps } = await qlikItems.getItems({ resourceType: "app" }, { hostConfig });

    // return apps.data.map((item) => {
    //     return {
    //         name: item.name,
    //         spaceId: item.spaceId ? item.spaceId : "",
    //         resourceId: item.resourceId ? item.resourceId : "",
    //         resourceType: item.resourceType ? item.resourceType : "",
    //         description: item.description ? item.description : "",
    //         createdAt: new Date(item.createdAt), // ? new Date(item.createdAt) : new Date()
    //         updatedAt: new Date(item.updatedAt) // ? new Date(item.updatedAt) : new Date()
    //     } as QlikItem;
    // });
    //return []
}

export async function getQlikAppSession(appId: string, userId: string) {
    //const appId = "099116df-4dab-4e50-9697-6083a4392c95"
    const s = openAppSession.openAppSession({
        appId: appId,
        hostConfig: {
            ...configFrontend,
            userId,
            scope: "user_default",
        },
        withoutData: false,
    });

    return s;
}

export async function createQlikUser(name: string, email: string) {

    const currentUser = await getQlikUser(email)

    if (currentUser.data?.length !== 1) {
        const newUser = await qlikUsers.createUser(
            {
                name: name,
                email: email,
                subject: email,
            },
            {
                hostConfig: {
                    ...configFrontend,
                    scope: "admin_classic user_default",
                },
            }
        );

        return newUser;
    }
    return currentUser
}

export async function updateQlikUser(userId: string, userName: string, groups: string[]) {

    const patchUser = await qlikUsers.patchUser(userId,
        [
            {
                "op": "replace", "path": "/name", "value": userName
            },
            {
                "op": "replace", "path": "/status", "value": "active"
            },
            {
                "op": "add", path: "/assignedGroups", value: groups
            }
        ],
        {
            hostConfig: {
                ...configFrontend,
                scope: "admin_classic user_default",
            },
        }
    );
    return patchUser;
}

export async function getQlikUser(email: string) {
    try {
        const { data: user } = await qlikUsers.getUsers(
            {
                filter: `email eq "${email}" and status eq "active"`,
            },
            {
                hostConfig: {
                    ...configFrontend,
                    scope: "user_default",
                },
            }
        );
        return user;
    } catch (error) {
        console.error("Error getting user:", error);
        throw error;
    }
}

export async function getSelections(app: Doc) {
    if (!app) {
        console.error("App is not initialized");
    }

    const selectionObj = await app.createSessionObject({
        qInfo: {
            qId: "CurrentSelections",
            qType: "CurrentSelections",
        },
        qSelectionObjectDef: {
            qSelectionThreshold: 1000,
        },
    });
    const layout = await selectionObj.getLayout();
    const selections = layout?.qSelectionObject?.qSelections ?? [];

    const selectionsObjects: any[] = [];
    for (let index = 0; index < selections.length; index++) {
        const selection = selections[index];
        let values = await getHyperCube(app, [selection.qField], []);
        selectionsObjects.push({
            qField: selection.qField,
            qTotal: selection.qTotal,
            qSelectedCount: selection.qSelectedCount,
            qSelectedFieldSelectionInfo: values,
        });
    }

    return selectionsObjects
}

export async function setSelections(app: Doc, data: any) {

    const values: any = []
    await app.clearAll();

    for (let index = 0; index < data.length; index++) {
        const qFfield = await app.getField(data[index].qField);
        data[index].qSelectedFieldSelectionInfo.forEach((ref: any) => {
            ref.forEach((v: any) => {
                values.push(v.qNum !== 'NaN' ? { qIsNumeric: true, qNumber: v.qNum } : { qText: v.qText })
            })
        })
        await qFfield.selectValues(values, true, true);
    }
}

export async function getHyperCube(app: Doc, dimensions: any, measures: any, qHeight: number = 100, qWidth: number = 2) {
    var qDim: { qDef: { qGrouping: string; qFieldDefs: string[]; qSortCriterias: { qSortByAscii: number }[] } }[] = [];
    var qMeas: { qDef: { qDef: string }; qSortBy: { qSortByState: number; qSortByFrequency: number; qSortByNumeric: number; qSortByAscii: number; qSortByLoadOrder: number; qSortByExpression: number; qExpression: { qv: string } } }[] = [];

    if (dimensions.length) {
        dimensions.forEach(function (value: any) {
            qDim.push({
                qDef: {
                    qGrouping: "N",
                    qFieldDefs: [value],
                    qSortCriterias: [{ qSortByAscii: 1 }],
                },
            });
        });
    }

    if (measures.length) {
        measures.forEach(function (value: any) {
            qMeas.push({
                qDef: {
                    qDef: value,
                },
                qSortBy: {
                    qSortByState: 0,
                    qSortByFrequency: 0,
                    qSortByNumeric: 1,
                    qSortByAscii: 1,
                    qSortByLoadOrder: 0,
                    qSortByExpression: 0,
                    qExpression: {
                        qv: "",
                    },
                },
            });
        });
    }

    // Hypercube properties
    const properties = {
        qInfo: {
            qType: "my-straight-hypercube",
        },
        qHyperCubeDef: {
            qDimensions: qDim,
            qMeasures: qMeas,
            qInitialDataFetch: [
                { qTop: 0, qLeft: 0, qHeight: qHeight, qWidth: qWidth },
            ],
        },
    };

    // Extract hypercube data
    const model = await app.createSessionObject(properties);
    const layout = await model.getLayout();
    let data = layout?.qHyperCube?.qDataPages?.[0]?.qMatrix ?? [];

    // Get additional pages if needed
    const columns = layout?.qHyperCube?.qSize?.qcx;
    const totalHeight = layout?.qHyperCube?.qSize?.qcy;
    const pageHeight = Math.floor(qHeight / columns!);
    const numberOfPages = Math.ceil(totalHeight! / pageHeight);

    for (let i = 1; i < numberOfPages; i++) {
        const page = {
            qTop: pageHeight * i,
            qLeft: 0,
            qWidth: columns,
            qHeight: pageHeight,
        };
        const row = await model.getHyperCubeData("/qHyperCubeDef", [page]);
        if (row[0].qMatrix) {
            data.push(...row[0].qMatrix);
        }
    }

    return data
    // Transform data for front-end consumption
    // const returnedDimension = data.map(row => row[0].qText);
    // const returnedMeasure = data.map(row => row[1].qText);

    // return {
    //     returnedDimension: returnedDimension,
    //     returnedMeasure: returnedMeasure
    // }
}
