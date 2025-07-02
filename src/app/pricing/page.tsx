import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getPricing } from "@/lib/pricing-service";
import { getPricingTypes } from "@/lib/pricingTypes-service";
import { CheckIcon } from "lucide-react";
import React from "react";
import ButtonPricing from "./button";

type Pricing = {
  name: string;
  price: number;
  currency_abrv: string;
  label: string;
  benefits: string[];
  popular: boolean;
  type: string;
  createdAt: string;
};
export default async function PricesPage() {
  const pricingBlocks = (await getPricing("")) as Pricing[] | null;
  const pricingTypes = await getPricingTypes();

  return (
    <>
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] pt-10 sm:py-10">
        <div className="max-w-2xl mx-auto text-center lg:mb-14 mb-10">
          <h2 className="font-poppins scroll-m-20 border-b text-4xl sm:text-5xl font-semibold tracking-tight transition-colors first:mt-0">
            Pricing
          </h2>
          <p className="mt-1 text-muted-foreground">Whatever your status, our offers evolve according to your needs.</p>
        </div>
        {pricingTypes?.map((type, index) => (
          <div key={type.type_show + index}>
            <h3 className="text-xl font-poppins font-semibold sm:text-2xl">{type.type_show}</h3>

            <div className="mt-5 sm:mt-6 mb-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:items-start">
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
                      <CardFooter>
                        <ButtonPricing messageWhatsapp={pricingBlock.name + " de la categoría " + type.type_show} />
                      </CardFooter>
                    </Card>
                  )
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
