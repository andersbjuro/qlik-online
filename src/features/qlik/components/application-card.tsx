import { Card, CardContent } from "~/components/ui/card";
import { QlikItem } from "~/features/qlik/schema";
import { ChartAreaIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function ApplicationCard({ item }: { item: QlikItem }) {

  return (
    <Link
      to="/dashboard/$appId"
      params={{ appId: item.resourceId }}
    >
      <Card key={item.resourceId} className="relative group p-0 gap-0 h-46 hover:bg-sidebar-accent hover:text-primary ">
        <div className="flex w-full rouded-t-lg items-center justify-center bg-sidebar h-30 ">
          <div className="flex flex-col items-center justify-center">
            <ChartAreaIcon className="size-10" />
            <span className="text-sm relative px-2 ">
              qlik sense app
            </span>
          </div>
        </div>

        <CardContent>
          <div className="flex flex-col mt-2 mb-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">{item.name}</span>
              {/* <span className="text-sm text-muted-foreground">Ändrad {item.updatedAt.toLocaleDateString()}</span> */}
            </div>
            <span className="text-sm text-muted-foreground">{item.description}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
