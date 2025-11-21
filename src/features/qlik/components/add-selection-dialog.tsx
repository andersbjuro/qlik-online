import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from 'src/components/ui/dialog';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { SelectionData } from '../types';
import { useQuery } from '@tanstack/react-query';
import { Label } from 'src/components/ui/label';
import { useParams } from '@tanstack/react-router';
import { qlikQueries } from '~/services/queries';
import LoadingButton from '~/components/loading-button';
import { Switch } from '~/components/ui/switch';
import { useAddSelection } from '../use-cases';
import { toast } from 'sonner';
import { SaveIcon } from 'lucide-react';

function AddSelectionDialog() {
  const { appId } = useParams({ strict: false })
  const [description, setDescriptionInput] = useState("");
  const [bookmark, setBookmark] = useState(false);
  const [open, setOpen] = useState(false)

  const { data, isFetching } = useQuery(qlikQueries.qSelections(appId || '', open))
  const selections = data as SelectionData
  const mutation = useAddSelection();

  function onSubmit() {
    mutation.mutate(
      {
        ...selections,
        description: description,
        bookmark: bookmark,
      } as SelectionData,
      {
        onSuccess: () => {
          toast.success(`Urval sparat`);
          setOpen(false);
          setDescriptionInput("");
          setBookmark(false);
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='sm' className="text-xs" disabled={!appId}>
           <SaveIcon className="mr-2 h-4 w-4" />
          Spara urval
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Spara urval</DialogTitle>
          <DialogDescription>
            Spara urval, bokmärke för att användas vid ett senare tillfälle.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-2'>
          <Label className='text-sm font-medium'>Antal fordon: {selections?.selectionFidCount}</Label>
          <Label htmlFor="description" className='text-sm font-medium'>Beskrivning</Label>
          <Input className='w-full' id="description" name="description" value={description}
            onChange={(e) => setDescriptionInput(e.target.value)}
            autoFocus />
          <div className="flex items-center space-x-2 mt-3">
            <Label htmlFor="bmark" className="text-xs">Spara som bokmärke</Label>
            <Switch id="bmark" name="bmark"
              checked={bookmark}
              onCheckedChange={setBookmark}
            />
          </div>
        </div>
        <DialogFooter>
          <LoadingButton
            isLoading={isFetching || mutation.isPending}
            variant="default"
            onClick={onSubmit}
            disabled={!selections || selections?.selectionAsJson === '[]' ? true : false}
          >
            Spara
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

}

export default AddSelectionDialog
