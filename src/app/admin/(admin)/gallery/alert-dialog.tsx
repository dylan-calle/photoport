"use client";
import { Button } from "@/components/ui/button";
import { useState, Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import ScreenSpinner from "@/components/screen-spiner";
import SucessDialog from "@/components/sucess-dialog";

export function AlertDialogGallery({
  fetchImages,
  isOn,
  setIsOn,
  code_title,
}: {
  fetchImages: Dispatch<SetStateAction<boolean>>;
  isOn: boolean;
  setIsOn: Dispatch<SetStateAction<boolean>>;
  code_title: string;
}) {
  const handleClose = () => {
    setIsOn(false);
  };
  const [isSpinnerOpen, setIsSpinnerOpen] = useState<boolean>(false);

  const [isMessageOpen, setIsMessageOpen] = useState<boolean>(false);
  const [messageDialog, setMessageDialog] = useState<string>("");

  const handleDelete = async () => {
    setIsSpinnerOpen(true);
    try {
      await axios.delete(`/api/gallery/${code_title}`);
      setMessageDialog("Collection deleted sucessfully");
      setIsMessageOpen(true);
      fetchImages((prev) => !prev);
      handleClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSpinnerOpen(false);
    }
  };
  return (
    <Dialog
      open={isOn}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleClose();
        setIsOn(isOpen);
      }}
    >
      <ScreenSpinner isOpen={isSpinnerOpen} />
      <SucessDialog message={messageDialog} state={isMessageOpen} setState={setIsMessageOpen} />
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>Deleting a collection cannot be undone.</DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="hover:cursor-pointer">
              Close
            </Button>
          </DialogClose>
          <Button
            onClick={handleDelete}
            type="button"
            variant="destructive"
            className="hover:cursor-pointer dark:hover:bg-destructive/100"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
