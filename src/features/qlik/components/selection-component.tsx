
import { SelectionData } from "~/features/qlik/types";
import { useState } from "react";
import { cn } from "src/lib/utils";
import { Switch } from "src/components/ui/switch"
import { Label } from "src/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "src/components/ui/tooltip"
import { BoxIcon, Trash2Icon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { selectionQueries } from "~/services/queries";
import { useParams } from "@tanstack/react-router";
import { setQlikSelection } from "~/services/qlik.api";
import { Button } from "~/components/ui/button";
import { useDeleteSelection } from "../use-cases";

//import { useDeleteSelectionMutation } from "./mutations";

export default function SelectionsComponent() {
  const { appId } = useParams({ strict: false })
  const [bmark, setBmark] = useState(false);
  const [selectedId, setSelectedId] = useState<number>();
  const selections = useQuery(selectionQueries.list({ appId: appId || "" }));
  const mutation = useDeleteSelection();

  const filter = bmark ? selections.data?.filter(x => x.bookmark) : selections.data?.filter(x => !x.bookmark)
  async function handleSetSelection(selection: SelectionData) {
    await setQlikSelection({ data: { appId: selection.applicationId, json: selection.selectionAsJson } });
    setSelectedId(selection.id);
  }

  async function handleDeleteSelection(selectionId: number) {
    mutation.mutate(selectionId,
      {
        onSuccess: () => {
          setSelectedId(undefined)
        },
      },
    );
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
        </div>

        <div className="flex-1 overflow-y-auto ">
          {filter && filter.length > 0 ? (
            <div className="w-full space-y-1">
              {filter.map((item: any) => (
                <SelectionItem key={item.id} item={item} onSelect={handleSetSelection} onDelete={handleDeleteSelection} selectedId={selectedId} />
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


interface DeleteSelectionButtonProps {
  id: number;
  onDelete: (id: number) => void;
}

export function DeleteSelectionButton({ id, onDelete }: DeleteSelectionButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          asChild
          variant="destructive"
          className="h-5 py-0 px-1 right-0"
          onClick={() => { onDelete(id) }}
        >
          <Trash2Icon className="h-5 w-5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Radera sparat urval, kan inte ångras</p>
      </TooltipContent>
    </Tooltip>
  )
}

interface SelectionItemProps {
  item: SelectionData;
  selectedId?: number;
  onSelect: (item: SelectionData) => void;
  onDelete: (id: number) => void;
}

export const SelectionItem = ({ item, selectedId, onSelect, onDelete }: SelectionItemProps) => {
  return (
    <div className="group/item flex flex-col p-2 border-b hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
      <div className={cn('w-full border-l-4 ', selectedId === item.id ? 'border-primary' : '')}>

        <div className="flex flex-col ">
          <div className="flex">
            <div className="flex flex-row justify-between w-full text-xs font-medium">
              <div className="p-1 cursor-pointer" onClick={() => { onSelect(item) }}>
                {item.description}
              </div>

              <div className="z-10 opacity-0 transition-all duration-150 group-hover/item:opacity-100 cursor-pointer">
                <DeleteSelectionButton id={item.id} onDelete={onDelete} />
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center ml-1 mb-1 text-xs">
            <div className="mr-3 text-xs">
              antal {item.selectionFidCount}
            </div>
            <h4 >
              arkiv {item.archive}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
