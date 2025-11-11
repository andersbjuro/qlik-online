import { Button } from "src/components/ui/button";
//mport AddSelectionDialog from "./add-selection-dialog";
//import { useMutation, useQuery } from "@tanstack/react-query";
//import kyInstance from "@/lib/ky";
import { SelectionData } from "~/features/qlik/types";
import { useState } from "react";
import { cn } from "src/lib/utils";
import { Separator } from "src/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "src/components/ui/dropdown-menu";
import { Switch } from "src/components/ui/switch"
import { Label } from "src/components/ui/label";
import { BoxIcon, Dot, EllipsisVerticalIcon } from "lucide-react";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { selectionQueries } from "~/services/queries";
import { useParams } from "@tanstack/react-router";
import { on } from "events";
//import OrderSelectionsDialog from "./order-selections-dialog";
//import { IconDotsVertical } from "@tabler/icons-react";
//import { useParams } from "next/navigation";
//import { useDeleteSelectionMutation } from "./mutations";

export default function SelectionsComponent() {
  const { appId } = useParams({ strict: false })
  const [bmark, setBmark] = useState(false);
  const [selectedId, setSelectedId] = useState<number>();
  const selections = useSuspenseQuery(selectionQueries.list({ appId: appId || '' }))
  //const mutation = useDeleteSelectionMutation();

  const filter = bmark ? selections.data?.filter(x => x.bookmark) : selections.data?.filter(x => !x.bookmark)
  async function handleSetSelection(selection: SelectionData) {
    //await kyInstance.post(`/api/qlik/selections`, { json: { appId: selection.applicationId, data: JSON.parse(selection.selectionAsJson) } }).json();
    setSelectedId(selection.id);
  }

  async function handleDeleteSelection(selectionId: number) {
    // mutation.mutate(selectionId,
    //   {
    //     onSuccess: () => {
    //       setSelectedId(undefined)
    //     },
    //   },
    // );
  }

  return (
    <div className="flex h-full">
      <div className="flex flex-col w-full p-2">
        <div className="flex items-center justify-between space-x-2 mb-4">
          <div className="flex items-center justify-between w-full">
            <Label htmlFor="bmark" className="text-xs">Visa bokmärken</Label>
            <Switch id="bmark" name="bmark"
              checked={bmark}
              onCheckedChange={setBmark}
            />
          </div>
          <div>
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" className="focus-visible:ring-0 focus-visible:ring-offset-0">
                  <EllipsisVerticalIcon className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="text-xs text-muted-foreground">{'Kommandon'}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="">
                  <DropdownMenuItem asChild>
                     <AddSelectionDialog />
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <OrderSelectionsDialog />
                  </DropdownMenuItem>
                </div>

              </DropdownMenuContent>
            </DropdownMenu> */}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto ">
          {filter && filter.length > 0 ? (
            <div className="w-full space-y-1">
              {filter.map((item: any) => (
                <SelectionItem key={item.id} item={item} onSelect={handleSetSelection} selectedId={selectedId} />
              ))}
            </div>

          ) : (
            <div className="flex min-h-[200px] items-center justify-center">
              <div className="text-center">
                <BoxIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="font-semibold text-lg text-muted-foreground">Inga urval</h3>
                <p className="text-muted-foreground text-xs">Ingen applikation vald eller urval sparade</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

interface SelectionItemProps {
  item: SelectionData;
  selectedId?: number;
  onSelect: (item: SelectionData) => void;
}

export const SelectionItem = ({ item, selectedId, onSelect }: SelectionItemProps) => {
  return (
    <div className="flex flex-col p-2 border-b hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
      <div className={cn('w-full border-l-4 ', selectedId === item.id ? 'border-primary' : '')}>
        <div onClick={() => { onSelect(item) }} className="cursor-pointer flex flex-col ">
          <div className="flex justify-between items-center">
            <div className="w-full p-2 text-xs font-medium">
              {item.description}
            </div>
            <div className="mr-3 text-xs">
              {item.selectionFidCount}
            </div>
          </div>

          <h4 className="ml-2 mb-1 text-xs">
            arkiv {item.archive}
          </h4>
        </div>
      </div>
    </div>
  );
}
