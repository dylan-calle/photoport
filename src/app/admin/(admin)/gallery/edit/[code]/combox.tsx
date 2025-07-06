"use client";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import axios from "axios";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type ComboboxProps = {
  setDataFunction: Dispatch<SetStateAction<Data>>;
  placeHolder: string;
};
type Data = {
  title: string;
  type: string;
};
export function Combobox({ setDataFunction, placeHolder }: ComboboxProps) {
  type GalleryTypes = {
    type: string;
    type_show: string;
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(placeHolder);
  const [typesList, setTypesList] = useState<GalleryTypes[]>([]);
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const res = await axios.get("/api/gallery-photos/types");

        setTypesList(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTypes();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {value ? typesList.find((type) => type.type === value)?.type_show : "Select type..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search type" className="h-9" />
          <CommandList>
            <CommandEmpty>No type found.</CommandEmpty>
            <CommandGroup>
              {typesList.map((type) => (
                <CommandItem
                  key={type.type}
                  value={type.type}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setDataFunction((prev) => ({ ...prev, type: currentValue === value ? "" : currentValue }));
                    setOpen(false);
                  }}
                >
                  {type.type_show}
                  <Check className={cn("ml-auto", value === type.type ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
