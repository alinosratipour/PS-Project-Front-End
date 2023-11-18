import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import {
  GET_PIZZAS_WITH_SIZES_AND_PRICES,
  GET_ALL_SIZES_WITH_RELATED_BASES,
} from "../queries/queries";
import SizePrice from "./SizePrice";
import ToppingsList from "./ToppingsList";
import SizeRadioButtons from "./UI-Liberary/SizeRadioButton/SizeRadioButtons";
import BaseRadioButtons from "./BaseRadioButtons";
import { BaseWithPrice, ToppingType } from "./SharedTypes";
import { useSizeContext } from "../components/Context/SizeContext";
import { useBaseContext } from "../components/Context/BaseContext";
import { useToppingContext } from "../components/Context/ToppingContaxt";

interface ListToppingAndPricesProps {
  pizzaId: number;
  onSizePriceChange: (
    price: number | undefined,
    sizeName: string | undefined
  ) => void;
  onBaseChange: (base: string | undefined, price: number) => void;
  onAddTopping: (topping: ToppingType) => void;
  onRemoveTopping: (topping: ToppingType) => void;
  initialSize?: string;
}

function ListToppingAndPrices({
  pizzaId,
  onSizePriceChange,
  onBaseChange,
  onAddTopping,
  onRemoveTopping,
  initialSize,
}: ListToppingAndPricesProps) {
  const { availableSizes, setSizes } = useSizeContext();
  const { availableBases, setAvailableBases, refetchBases } = useBaseContext();
  const { availableToppings, refetchToppings } = useToppingContext();
  const [selectedSize, setSelectedSize] = useState<number>(1);
  const [isSizeSelected, setIsSizeSelected] = useState(false);
  const [selectedSizePrice, setSelectedSizePrice] = useState<number | undefined>(0);

  const { loading: sizesLoading, data: sizesData } = useQuery(GET_PIZZAS_WITH_SIZES_AND_PRICES);
  const { data: Bases } = useQuery<{ getBasesPricesBySize: BaseWithPrice[] }>(
    GET_ALL_SIZES_WITH_RELATED_BASES,
    {
      variables: { id_size: Number(selectedSize) },
    }
  );

  useEffect(() => {
    if (!sizesLoading && sizesData) {
      const pizzaSizesData = sizesData.getpizzasWithSizesAndPrices.find(
        (pizza: any) => pizza.id_pizza === pizzaId
      );
      if (pizzaSizesData) {
        const availableSizes = pizzaSizesData.sizesWithPrices;
        setSizes(availableSizes);

        const initialSelectedSizeData = availableSizes.find(
          (sizeData) => sizeData.p_size === initialSize
        );

        if (initialSelectedSizeData) {
          setSelectedSize(initialSelectedSizeData.id_size);
          setSelectedSizePrice(initialSelectedSizeData.price);
          onSizePriceChange(
            initialSelectedSizeData.price,
            initialSelectedSizeData.p_size
          );
          setIsSizeSelected(true);
        }
      }
    }
  }, [sizesLoading, sizesData, pizzaId, initialSize]);

  useEffect(() => {
    if (Bases && Bases.getBasesPricesBySize) {
      setAvailableBases(Bases.getBasesPricesBySize);
    }
  }, [Bases]);

  const handleSizeChange = (newSize: number) => {
    setSelectedSize(newSize);
    const newSelectedSizeData = availableSizes.find(
      (sizeData) => sizeData.id_size === newSize
    );

    if (newSelectedSizeData) {
      setSelectedSizePrice(newSelectedSizeData.price);
      onSizePriceChange(newSelectedSizeData.price, newSelectedSizeData.p_size);
      setIsSizeSelected(true);
      refetchToppings(newSize);
      refetchBases(newSize);
    }
  };

  const handleBaseChange = (newBase: string) => {
    const selectedBase = Bases?.getBasesPricesBySize.find(
      (item) => item.base === newBase
    );
    const basePrice = selectedBase ? selectedBase.price : 0;
    onBaseChange(newBase, basePrice);
  };

  if (sizesLoading) return "Loading sizes...";
console.log(availableToppings);

  return (
    <div>
      <h1>Topping Prices</h1>
      <SizeRadioButtons sizes={availableSizes} onSizeChange={handleSizeChange} />

      {isSizeSelected && (
        <>
          <BaseRadioButtons
            bases={availableBases}
            onBaseChange={handleBaseChange}
          />
          <ToppingsList
             availableToppings={availableToppings}
            onAddTopping={onAddTopping}
            onRemoveTopping={onRemoveTopping}
          />
        </>
      )}

      <SizePrice selectedSizePrice={selectedSizePrice} size="" />
    </div>
  );
}

export default ListToppingAndPrices;
