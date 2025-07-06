"use client";
import { Button } from "@/components/ui/button";
import { useState, ChangeEvent } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconPlus, IconUpload } from "@tabler/icons-react";
import ScreenSpinner from "@/components/screen-spiner";
import SucessDialog from "@/components/sucess-dialog";

import axios from "axios";

type Data = {
  photos: FileList | null;
};
const blankData = {
  photos: null,
};
type DialogCloseButtonProps = {
  fetchImages: () => void;
  code: string;
};

export function AddMorePhotos({ fetchImages, code }: DialogCloseButtonProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<Data>(blankData);
  const [isSpinnerOpen, setIsSpinnerOpen] = useState<boolean>(false);

  const [isMessageOpen, setIsMessageOpen] = useState<boolean>(false);
  const [messageDialog, setMessageDialog] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.files }));
  };
  const handleClose = () => {
    setData(blankData);
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSpinnerOpen(true);

    if (!data.photos?.length) {
      console.log("Missing required field");
      return;
    }

    const formData = new FormData();

    Array.from(data.photos).forEach((photo: File) => {
      formData.append("photos", photo);
    });

    try {
      await axios.post(`/api/gallery/${code}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessageDialog("Collection added sucessfully");
      setIsMessageOpen(true);
      fetchImages();
      handleClose();
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setIsSpinnerOpen(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleClose();
        setOpen(isOpen);
      }}
    >
      <ScreenSpinner isOpen={isSpinnerOpen} />
      <SucessDialog message={messageDialog} state={isMessageOpen} setState={setIsMessageOpen} />
      <DialogTrigger asChild>
        <Button className="hover:cursor-pointer">
          <IconPlus />
          <span className="text-xs sm:text-sm">Add Photos</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Photos</DialogTitle>
          <DialogDescription>You are adding a more photos to this collection.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="upload-images" className="">
              Upload images
            </Label>
            <Input
              id="upload-images"
              name="photos"
              type="file"
              autoComplete="off"
              multiple
              accept="image/jpeg"
              onChange={handleChange}
            />
            <span className="text-xs font-poppins">
              *Larger images (&gt;1MB) may affect the performance of the page :) cuidado
            </span>
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="hover:cursor-pointer">
              Close
            </Button>
          </DialogClose>
          <Button type="button" variant="default" className="hover:cursor-pointer" onClick={handleSubmit}>
            Upload
            <IconUpload />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
