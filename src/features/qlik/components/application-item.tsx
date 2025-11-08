import { Card, CardContent } from "src/components/ui/card";
import { QlikItem } from "~/features/qlik/types";
import { ChartAreaIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { formatDate } from "~/lib/date";

export function ApplicationItem({ item }: { item: QlikItem }) {

  return (
    <>
      {item.resourceId ? (
        <Link
          to="/dashboard/$appId"
          params={{ appId: item.resourceId }}
        >
          <Card key={item.resourceId} className="relative group p-0 gap-0 hover:bg-sidebar-accent hover:text-primary ">
            <div className="flex w-full p-2 rouded-t-lg items-center justify-center bg-sidebar h-30 ">
              <div className="flex flex-col items-center justify-center">
                <ChartAreaIcon className="size-10" />
                <span className="text-sm relative px-2 ">
                  qlik sense app
                </span>
              </div>
            </div>
            <CardContent>
              <div className="flex flex-col mt-2 mb-2">
                <span className="text-sm font-medium">{item.name}</span>
                <span className="text-xs text-muted-foreground">{item.description}</span>
                <span className="text-xs text-muted-foreground ">Ändrad {formatDate(item.updatedAt)} </span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ) : (
        null
      )}
    </>
  );
}
