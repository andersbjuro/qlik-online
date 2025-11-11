import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from 'src/components/ui/dialog';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
//import { Checkbox } from 'src/components/ui/checkbox';
//import LoadingButton from '@/components/LoadingButton';
//import { useSubmitSelectionMutation } from './mutations';
//import kyInstance from '@/lib/ky';
import { SelectionData } from '../types';
import { useQuery } from '@tanstack/react-query';
import { Label } from 'src/components/ui/label';
import { useParams } from '@tanstack/react-router';

function AddSelectionDialog() {
  //const params = useParams()
  //const appId = params.app as string;
  const { appId } = useParams({ strict: false })
  const [description, setDescriptionInput] = useState("");
  const [bookmark, setBookmark] = useState(false);
  const [open, setOpen] = useState(false)

  // const mutation = useSubmitSelectionMutation();
  // const {
  //     data: selections, isFetching: selIsPending,
  // } = useQuery<SelectionData>({
  //     queryKey: ["qlikselections", appId],
  //     queryFn: () => kyInstance.get(`/api/qlik/selections?appId=${appId}`).json<SelectionData>(),
  //     enabled: open,
  //     staleTime: 0,
  // });

  function onSubmit() {
    // mutation.mutate(
    //     {
    //         ...selections,
    //         description: description,
    //         bookmark: bookmark,
    //     } as SelectionData,
    //     {
    //         onSuccess: () => {
    //             setOpen(false);
    //             setDescriptionInput("");
    //             setBookmark(false);
    //         },
    //     },
    // );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size='sm' className="text-xs w-full justify-start" disabled={!appId}>
          Spara urval
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Spara urval</DialogTitle>
          <DialogDescription>
            Spara urval, bokmärk för att spara till ett senare tillfälle.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-2'>
          {/* <Label className='text-sm font-medium'>Applikation: {selections?.applicationId}</Label>
                    <Label className='text-sm font-medium'>Antal fordon: {selections?.selectionFidCount}</Label> */}
          <Label htmlFor="description" className='text-sm font-medium'>Beskrivning</Label>
          <Input className='w-full' id="description" name="description" value={description}
            onChange={(e) => setDescriptionInput(e.target.value)}
            autoFocus />
          <div className="flex items-center space-x-2 mt-3">
            {/* <Checkbox id="bookmark" name="bookmark" onCheckedChange={() => setBookmark(!bookmark)} /> */}
            <Label
              htmlFor="bookmark"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Spara som bokmärke
            </Label>
          </div>
        </div>
        <DialogFooter>
          {/* <LoadingButton
                        loading={mutation.isPending || selIsPending}
                        variant="default"
                        onClick={onSubmit}
                        disabled={!selections || selections?.selectionAsJson === '[]' ? true : false}
                    >
                        Spara
                    </LoadingButton> */}
          <Button
            variant="default"
            size="sm"
            onClick={() => { setOpen(false) }}
          >
            Spara
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

}

export default AddSelectionDialog
