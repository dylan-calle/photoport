"use client";
import { useState, useEffect } from "react";
import axios from "axios";
// import Image from "next/image";
// import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ScreenSpinner from "@/components/screen-spiner";
import { AddNewPricingBlock } from "./new-pricing-block";

type Pricing = {
  name: string;
  price: number;
  currency_abrv: string;
  label: string;
  benefits: [string];
  popular: boolean;
  type: string;
};
type PricingTypes = {
  type: string;
  type_show: string;
};

export default function Page() {
  const [pricingBlocks, setPricingBlocks] = useState<Pricing[]>([]);
  const [pricingTypes, setPricingTypes] = useState<PricingTypes[]>([]);
  // const [needFetchData, setNeedFetchData] = useState<boolean>(false);
  const [isSpinnerOpen, setIsSpinnerOpen] = useState<boolean>(false);

  //const [codeToDelete, setCodeToDelete] = useState<string>("");
  // const [openDelete, setOpenDelete] = useState<boolean>(false);

  const fetchData = async () => {
    setIsSpinnerOpen(true);
    try {
      const [pricingBlocksRes, pricingTypesRes] = await Promise.all([
        axios.get("/api/pricing"),
        axios.get("/api/pricing-types"),
      ]);
      setPricingBlocks(pricingBlocksRes.data);
      setPricingTypes(pricingTypesRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSpinnerOpen(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ScreenSpinner isOpen={isSpinnerOpen} />
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="px-4 lg:px-6 flex gap-x-5 items-center">
              <h2 className="font-poppins text-2xl">Manage Pricing</h2>
              <AddNewPricingBlock fetchImages={fetchData} />
              {/* <DialogCloseButton fetchImages={setNeedFetchData} />
              <AlertDialogGallery
                fetchImages={setNeedFetchData}
                isOn={openDelete}
                setIsOn={setOpenDelete}
                code_title={codeToDelete}
              /> */}
            </div>
            <section className="w-full px-4 sm:px-6">
              {pricingTypes?.map((type, index) => (
                <div key={type.type_show + index}>
                  <h3 className="text-xl font-poppins font-semibold sm:text-2xl">{type.type_show}</h3>

                  <div className="mt-5 sm:mt-6 mb-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:items-start">
                    {pricingBlocks?.map(
                      (pricingBlock, index) =>
                        pricingBlock.type === type.type && (
                          <Card
                            className={`flex flex-col h-full ${pricingBlock.popular && "border-primary"}`}
                            key={pricingBlock.name + index}
                          >
                            <CardHeader className="text-center pb-2">
                              {pricingBlock.popular && (
                                <Badge className="uppercase w-max self-center mb-3">Most popular</Badge>
                              )}

                              <CardTitle className="mb-7">{pricingBlock.name}</CardTitle>
                              <span className="font-bold text-5xl">{`${pricingBlock.currency_abrv} ${pricingBlock.price}`}</span>
                            </CardHeader>
                            <CardDescription className="text-center">{pricingBlock.label}</CardDescription>
                            <CardContent className="flex-1">
                              <ul className="mt-7 space-y-2.5 text-sm">
                                {pricingBlock.benefits.map((benefit, index) => (
                                  <li className="flex space-x-2" key={benefit + index}>
                                    <CheckIcon className="flex-shrink-0 mt-0.5 h-4 w-4" />
                                    <span className="text-muted-foreground">{benefit}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                            <CardFooter></CardFooter>
                          </Card>
                        )
                    )}
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
