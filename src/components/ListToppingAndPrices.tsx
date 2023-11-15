import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import {
  GET_PIZZAS_WITH_SIZES_AND_PRICES,
  GET_TOPPING_PRICES,
  GET_ALL_SIZES_WITH_RELATED_BASES,
} from "../queries/queries";
import SizePrice from "./SizePrice";
import ToppingsList from "./ToppingsList";
import SizeRadioButtons from "./UI-Liberary/SizeRadioButton/SizeRadioButtons";

import { If } from "tsx-control-statements/components";
import BaseRadioButtons from "./BaseRadioButtons";
import { BaseWithPrice, ToppingType } from "./SharedTypes";

interface ListToppingAndPricesProps {
  pizzaId: number;
  onSizePriceChange: (
    price: number | undefined,
    sizeName: string | undefined
  ) => void;
  onBaseChange: (base: string | undefined, price: number) => void; // Update the callback to accept base price
  onAddTopping: (topping: ToppingType) => void;
  onRemoveTopping: (topping: ToppingType) => void;
}

interface SizeType {
  id_size: number;
  p_size: string;
  price_topping: number;
  price: number;
  bases: {
    id_base: number;
    price: number;
    base: string;
  }[];
}

function ListToppingAndPrices({
  pizzaId,
  onSizePriceChange,
  onBaseChange,
  onAddTopping,
  onRemoveTopping,
}: ListToppingAndPricesProps) {
  const [sizes, setSizes] = useState<SizeType[]>([]);
  const [selectedSize, setSelectedSize] = useState<number>(1);
  const [isSizeSelected, setIsSizeSelected] = useState(false);
  const [selectedSizePrice, setSelectedSizePrice] = useState<
    number | undefined
  >(0);

  const { loading: sizesLoading, data: sizesData } = useQuery(
    GET_PIZZAS_WITH_SIZES_AND_PRICES
  );
  const [basePrices, setBasePrices] = useState<BaseWithPrice[]>([]);

  // Query for topping data
  const {
    loading,
    error,
    data: toppingData,
  } = useQuery<{ getToppingPricesBySize: ToppingType[] }>(GET_TOPPING_PRICES, {
    variables: { id_size: Number(selectedSize) },
  });

  // Use refetch function for bases data
  const { data: Bases } = useQuery<{
    getBasesPricesBySize: BaseWithPrice[];
  }>(GET_ALL_SIZES_WITH_RELATED_BASES, {
    variables: { id_size: Number(selectedSize) },
  });

  useEffect(() => {
    if (!sizesLoading && sizesData) {
      const pizzaSizesData = sizesData.getpizzasWithSizesAndPrices.find(
        (pizza: any) => pizza.id_pizza === pizzaId
      );

      if (pizzaSizesData) {
        const availableSizes = pizzaSizesData.sizesWithPrices;
        setSizes(availableSizes);

        const initialSelectedSizeData = availableSizes[0];
        if (initialSelectedSizeData) {
          setSelectedSize(initialSelectedSizeData.id_size);
          setSelectedSizePrice(initialSelectedSizeData.price);
        }
      }
    }
  }, [sizesLoading, sizesData, pizzaId]);

  useEffect(() => {
    if (Bases && Bases.getBasesPricesBySize) {
      setBasePrices(Bases.getBasesPricesBySize);
    }
  }, [Bases]);

  const handleSizeChange = (newSize: number) => {
    setSelectedSize(newSize);
    const newSelectedSizeData = sizes.find(
      (sizeData) => sizeData.id_size === newSize
    );

    if (newSelectedSizeData) {
      setSelectedSizePrice(newSelectedSizeData.price);
      onSizePriceChange(newSelectedSizeData.price, newSelectedSizeData.p_size);
      setIsSizeSelected(true);
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
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <h1>Topping Prices</h1>
      <SizeRadioButtons sizes={sizes} onSizeChange={handleSizeChange} />

      <If condition={isSizeSelected}>
        <BaseRadioButtons
          bases={basePrices}
          onBaseChange={handleBaseChange}
          selectedSize={selectedSize}
        />
        <ToppingsList
          toppingData={toppingData?.getToppingPricesBySize}
          onAddTopping={onAddTopping}
          onRemoveTopping={onRemoveTopping}
        />
      </If>

      <SizePrice selectedSizePrice={selectedSizePrice} size="" />
    </div>
  );
}

export default ListToppingAndPrices;
