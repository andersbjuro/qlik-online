import { Button } from "src/components/ui/button";
//mport AddSelectionDialog from "./add-selection-dialog";
//import { useMutation, useQuery } from "@tanstack/react-query";
//import kyInstance from "@/lib/ky";
import { SelectionData } from "src/features/qlik/schema";
import { Suspense, useState } from "react";
import { cn } from "src/lib/utils";
import { Separator } from "src/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "src/components/ui/dropdown-menu";
import { Switch } from "src/components/ui/switch"
import { Label } from "src/components/ui/label";
import { Dot, EllipsisVerticalIcon } from "lucide-react";
//import OrderSelectionsDialog from "./order-selections-dialog";
//import { IconDotsVertical } from "@tabler/icons-react";
//import { useParams } from "next/navigation";
//import { useDeleteSelectionMutation } from "./mutations";

export default function SelectionsComponent() {
  //const params = useParams()
  const [bmark, setBmark] = useState(false);
  const [selectedId, setSelectedId] = useState<number>();
  //const mutation = useDeleteSelectionMutation();
  // const { data: selections } = useQuery<SelectionData[]>({
  //   queryKey: ["selections", params.app],
  //   queryFn: () => kyInstance.get(`/api/selections?appId=${params.app}`).json<SelectionData[]>(),
  //   enabled: !!params.app,
  // });


  // const filter = bmark ? selections?.filter(x => x.bookmark) : selections?.filter(x => !x.bookmark)
  // async function handleSetSelection(selection: SelectionData) {
  //   await kyInstance.post(`/api/qlik/selections`, { json: { appId: selection.applicationId, data: JSON.parse(selection.selectionAsJson) } }).json();
  //   setSelectedId(selection.id);
  // }

  // async function handleDeleteSelection(selectionId: number) {
  //   mutation.mutate(selectionId,
  //     {
  //       onSuccess: () => {
  //         setSelectedId(undefined)
  //       },
  //     },
  //   );
  // }

  return (
    <div className="flex h-full">
      <div className="flex flex-col w-full">
        <div className="flex items-center justify-between space-x-2 ">
          <div className="flex items-center space-x-2">
            <Switch id="bmark" name="bmark"
              checked={bmark}
              onCheckedChange={setBmark} />
            <Label htmlFor="bmark">Bokmärken</Label>
          </div>
          <div>
            <DropdownMenu>
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
                    {/* <AddSelectionDialog /> */}
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    {/* <OrderSelectionsDialog /> */}
                  </DropdownMenuItem>
                </div>

              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <Suspense fallback={<span>Laddar...</span>}>
            {/* {filter && filter.length > 0 ? (
              <div className="w-full space-y-1 p-1">
                {filter.map((item: any) => (
                  <div key={item.id} className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex flex-col items-start">
                    <div className={cn('w-full border-l-4 ', selectedId === item.id ? 'border-primary' : '')}>
                      <div onClick={() => { handleSetSelection(item) }} className="cursor-pointer flex flex-col ">
                        <div className="flex justify-between items-center">
                          <div className="w-full p-2 font-semibold">
                            {item.description}
                          </div>
                          <div className="mr-3 text-xs">
                            {item.selectionFidCount}
                          </div>
                        </div>

                        <h4 className="ml-2 mb-1 text-xs">
                          arkiv {item.archive} skapad
                        </h4>
                        <Separator />
                      </div>
                      <div className="flex justify-between">
                        <div />
                        <div className="ml-5">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="icon" variant="ghost" className="focus-visible:ring-0 focus-visible:ring-offset-0">
                                <IconDotsVertical className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel className="text-xs text-muted-foreground">{'Kommandon'}</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem asChild>
                                <div onClick={() => { handleSetSelection(item) }}>
                                  <Label className="text-xs">Visa</Label>
                                </div>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <div onClick={() => { handleDeleteSelection(item.id) }}>
                                  <Label className="text-xs">Radera</Label>
                                </div>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            ) : (
              <div></div>
            )} */}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
