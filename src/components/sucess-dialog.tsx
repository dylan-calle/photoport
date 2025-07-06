"use client";
import { Dispatch, SetStateAction } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { IconCircleCheckFilled } from "@tabler/icons-react";

type SuccessDialogProps = {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
  message: string;
};

export default function SucessDialog({ message, state, setState }: SuccessDialogProps) {
  const handleClose = () => {
    setState(false);
  };

  return (
    <Dialog
      open={state}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleClose();
        setState(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-x-2">
            <IconCircleCheckFilled />
            Action completed sucessfully
          </DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
