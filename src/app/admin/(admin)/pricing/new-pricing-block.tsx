"use client";
import { Button } from "@/components/ui/button";
import { useState, ChangeEvent, useEffect } from "react";
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
import { IconPlus } from "@tabler/icons-react";
import ScreenSpinner from "@/components/screen-spiner";
import SucessDialog from "@/components/sucess-dialog";

import axios from "axios";
import { AddNewPricing } from "./new-pricing";

type Block = {
  name: string;
  price: string;
  currency_abrv: string;
  label: string;
  popular: boolean;
  benefits: string[];
};

type Data = {
  type_show: string;
  blocks: Block[];
};

const blankData = {
  type_show: "",
  blocks: [],
};
type DialogCloseButtonProps = {
  fetchImages: () => void;
};

export function AddNewPricingBlock({ fetchImages }: DialogCloseButtonProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<Data>(blankData);
  const [isSpinnerOpen, setIsSpinnerOpen] = useState<boolean>(false);

  const [isMessageOpen, setIsMessageOpen] = useState<boolean>(false);
  const [messageDialog, setMessageDialog] = useState<string>("");

  const [newPrice, setNewPrice] = useState<Block>({
    name: "",
    price: "",
    currency_abrv: "",
    label: "",
    popular: false,
    benefits: [],
  });

  useEffect(() => {
    if (newPrice.name === "") return;
    setData((prev) => ({
      ...prev,
      blocks: [...prev.blocks, newPrice],
    }));
  }, [newPrice]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClose = () => {
    setData(blankData);
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSpinnerOpen(true);

    console.log("data is", data);
    if (!data.type_show || !data.blocks?.length) {
      console.error("Missing required fields");
      return;
    }

    try {
      await axios.post("/api/pricing/block", data);

      setMessageDialog("Pricing added sucessfully");
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
          <span className="text-xs sm:text-sm">New Pricing Block</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New pricing block</DialogTitle>
          <DialogDescription>You are adding a new block for pricing.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="block-name">Pricing block name</Label>
            <Input id="block-name" name="type_show" autoComplete="off" value={data.type_show} onChange={handleChange} />

            <Label htmlFor="type" className="">
              Pricing
            </Label>
            <AddNewPricing setState={setNewPrice} />
            <div className="flex gap-3">
              {data.blocks.map((block, index) => (
                <div className="border-2 border-white rounded-xl p-4" key={block.name + index}>
                  <span className="block font-semibold text-center font-poppins">{block.name}</span>
                  <span className="block font-bold text-center font-poppins">
                    {block.currency_abrv + " " + block.price}
                  </span>
                  <span className="block text-center font-poppins">{block.benefits.length + " benefits"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="hover:cursor-pointer">
              Close
            </Button>
          </DialogClose>
          <Button type="button" variant="default" className="hover:cursor-pointer" onClick={handleSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
