import { st } from "node_modules/@qlik/api/chunks/qix-CrD3jqUl";

export type SelectionData = {
    id: number,
    userId: string
    applicationId: string,
    description: string,
    selectionAsJson: string,
    archive: string,
    ts01: string,
    selectionFidCount: number,
    selectionPidCount: number,
    bookmark: boolean,
    createdAt: string,
    selectionLines?: number[]
};

export type QlikApplication = {
    name: string
    appId: string
    sheetId: string
    description: string
}

export type QlikItem = {
    name: string
    spaceId: string
    resourceId: string
    resourceType: string
    description: string,
   // createdAt: Date,
   updatedAt: string
}
