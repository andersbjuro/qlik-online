import { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from 'src/components/ui/dialog';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import LoadingButton from '~/components/loading-button';
import { SelectionData } from '../types';
import { useQuery } from '@tanstack/react-query';
import { Label } from '~/components/ui/label';
import { useParams } from '@tanstack/react-router';
import { selectionQueries } from '~/services/queries';
import { ShoppingCartIcon } from 'lucide-react';
import { Checkbox } from '~/components/ui/checkbox';

function OrderSelectionsDialog() {
  const { appId } = useParams({ strict: false })
  const [description, setDescriptionInput] = useState("");
  const [open, setOpen] = useState(false)
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const { data, isFetching } = useQuery(selectionQueries.list({ appId: appId || "" }))
  const allSelections = data as SelectionData[]
  const selections = allSelections?.filter(selection => selection.bookmark === false) || []

  const handleSelectItem = (itemId: number, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, itemId])
    } else {
      setSelectedItems(prev => prev.filter(id => id !== itemId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(selections.map(item => item.id))
    } else {
      setSelectedItems([])
    }
  }

  const isAllSelected = selections.length > 0 && selectedItems.length === selections.length
  const isIndeterminate = selectedItems.length > 0 && selectedItems.length < selections.length

  function onSubmit() {
    // mutation.mutate(
    //     {
    //         ...selections,
    //         description: description,

    //     } as SelectionData,
    //     {
    //         onSuccess: () => {
    //             setOpen(false);
    //             setDescriptionInput("");
    //         },
    //     },
    // );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='sm' className="text-xs" disabled={!appId}>
          <ShoppingCartIcon className="mr-2 h-4 w-4" />
          Beställ
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Skapa beställning</DialogTitle>
        </DialogHeader>
        <div className='flex flex-col gap-2'>
          <Label htmlFor="description" className='text-sm font-medium'>Beskrivning</Label>
          <Input className='w-full' id="description" name="description" value={description}
            onChange={(e) => setDescriptionInput(e.target.value)}
            autoFocus />
          <div className="mt-4">
            <Label className='text-sm font-medium'>Välj urval att beställa</Label>

            {selections && selections.length > 0 && (
              <>
                {/* Select All Checkbox */}
                <div className="flex items-center space-x-2 mt-2 p-2 border-b">
                  <Checkbox
                    id="select-all"
                    checked={isAllSelected}
                    ref={(el: any) => {
                      if (el) el.indeterminate = isIndeterminate
                    }}
                    onCheckedChange={handleSelectAll}
                  />
                  <Label htmlFor="select-all" className="text-xs font-medium cursor-pointer">
                    Välj alla ({selections.length})
                  </Label>
                </div>

                {/* Individual Selection Items */}
                <div className="max-h-48 overflow-y-auto border rounded-md mt-2">
                  {selections.map((selection) => (
                    <div key={selection.id} className="flex items-center space-x-2 p-3 hover:bg-gray-50 border-b last:border-b-0">
                      <Checkbox
                        id={`selection-${selection.id}`}
                        checked={selectedItems.includes(selection.id)}
                        onCheckedChange={(checked: boolean) => handleSelectItem(selection.id, checked)}
                      />
                      <div className="flex-1 cursor-pointer" onClick={() => {
                        const isSelected = selectedItems.includes(selection.id)
                        handleSelectItem(selection.id, !isSelected)
                      }}>
                        <Label htmlFor={`selection-${selection.id}`} className="text-xs cursor-pointer">
                          {selection.description || `Urval ${selection.id}`}
                        </Label>
                        <div className="text-xs text-muted-foreground">
                          Skapad: {new Date(selection.createdAt).toLocaleDateString('sv-SE')}
                          {selection.selectionFidCount && (
                            <span className="ml-2">• {selection.selectionFidCount} fordon</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-xs text-muted-foreground mt-2">
                  {selectedItems.length} av {selections.length} urval valda
                </div>
              </>
            )}

            {(!selections || selections.length === 0) && !isFetching && (
              <div className="text-sm text-muted-foreground mt-2 p-4 text-center border rounded-md">
                Inga urval hittades för denna applikation
              </div>
            )}

            {isFetching && (
              <div className="text-sm text-muted-foreground mt-2 p-4 text-center">
                Laddar urval...
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <LoadingButton
            isLoading={isFetching}
            variant="default"
            onClick={onSubmit}
            disabled={selectedItems.length === 0 || isFetching || description.trim() === ""}
          >
            Beställ ({selectedItems.length})
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

}

export default OrderSelectionsDialog
