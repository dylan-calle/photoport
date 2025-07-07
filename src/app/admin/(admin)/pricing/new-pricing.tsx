"use client";
import { useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
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

type PricingBlock = {
  name: string;
  price: string;
  currency_abrv: string;
  label: string;
  popular: boolean;
  benefits: string[];
};

export function AddNewPricing({ setState }: { setState: Dispatch<SetStateAction<PricingBlock>> }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<PricingBlock>({
    name: "",
    price: "",
    currency_abrv: "",
    label: "",
    popular: false,
    benefits: [],
  });
  const allFilled =
    formData.name.trim() !== "" &&
    formData.price.trim() !== "" &&
    formData.currency_abrv.trim() !== "" &&
    formData.label.trim() !== "" &&
    formData.benefits.length > 0;

  const [newBenefit, setNewBenefit] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddBenefit = () => {
    if (newBenefit.trim()) {
      setFormData((prev) => ({
        ...prev,
        benefits: [...prev.benefits, newBenefit.trim()],
      }));
      setNewBenefit("");
    }
  };

  const handleSubmit = () => {
    setState(formData);
    setOpen(false);
    setFormData({
      name: "",
      price: "",
      currency_abrv: "",
      label: "",
      popular: false,
      benefits: [],
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <IconPlus />
          <span className="text-xs sm:text-sm">New Pricing</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New pricing</DialogTitle>
          <DialogDescription>Add a pricing block</DialogDescription>
        </DialogHeader>

        <div className="grid gap-2">
          <Label>Title</Label>
          <Input
            name="name"
            value={formData.name}
            autoComplete="off"
            placeholder="Basic Plan"
            className="placeholder:italic placeholder:text-white/40"
            onChange={handleChange}
          />

          <Label>Price</Label>
          <Input
            name="price"
            type="number"
            value={formData.price}
            autoComplete="off"
            placeholder="500"
            className="placeholder:italic placeholder:text-white/40"
            onChange={handleChange}
          />

          <Label>Currency Abbreviation</Label>
          <Input
            name="currency_abrv"
            autoComplete="off"
            placeholder="Bs"
            className="placeholder:italic placeholder:text-white/40"
            value={formData.currency_abrv}
            onChange={handleChange}
          />

          <Label>Label</Label>
          <Input
            name="label"
            placeholder="idk but powerful"
            autoComplete="off"
            className="placeholder:italic placeholder:text-white/40"
            value={formData.label}
            onChange={handleChange}
          />

          <div className="flex items-center gap-2 my-4">
            <Label>Popular:</Label>
            <Input
              type="checkbox"
              className="size-5"
              name="popular"
              checked={formData.popular}
              onChange={handleChange}
            />
          </div>

          <Label>Benefits</Label>
          <div className="flex gap-2">
            <Input
              value={newBenefit}
              onChange={(e) => setNewBenefit(e.target.value)}
              autoComplete="off"
              placeholder="Write a benefit"
            />
            <Button type="button" onClick={handleAddBenefit} className="hover:cursor-pointer">
              Add
            </Button>
          </div>

          <ul className="list-disc list-inside text-sm text-muted-foreground mt-2">
            {formData.benefits.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
            title={`${!allFilled ? "Fill all the camps" : "my name is button"}`}
            className={`${allFilled ? "hover:cursor-pointer" : " dark:hover:cursor-not-allowed"}`}
            disabled={!allFilled}
          >
            Add
            <IconPlus />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
