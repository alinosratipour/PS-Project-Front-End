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
import { BaseWithPrice, SizeType, ToppingType } from "./SharedTypes";
import { useSizeContext } from '../components/Context/SizeContext'; // Import the context

interface ListToppingAndPricesProps {
  pizzaId: number;
  onSizePriceChange: (
    price: number | undefined,
    sizeName: string | undefined
  ) => void;
  onBaseChange: (base: string | undefined, price: number) => void; // Update the callback to accept base price
  onAddTopping: (topping: ToppingType) => void;
  onRemoveTopping: (topping: ToppingType) => void;
  initialSize?: string; // new prop

}



function ListToppingAndPrices({
  pizzaId,
  onSizePriceChange,
  onBaseChange,
  onAddTopping,
  onRemoveTopping,
  initialSize,
}: ListToppingAndPricesProps) {

  const { availableSizes, setSizes } = useSizeContext(); // Use the context
 // const [sizes, setSizes] = useState<SizeType[]>([]);
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
    refetch: refetchToppingData,
  } = useQuery<{ getToppingPricesBySize: ToppingType[] }>(GET_TOPPING_PRICES, {
    variables: { id_size: Number(selectedSize) },
  });

  // Use refetch function for bases data
  const { data: Bases, refetch: refetchBases } = useQuery<{
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
      setBasePrices(Bases.getBasesPricesBySize);
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
      refetchToppingData({ id_size: newSize });
      refetchBases({ id_size: newSize });
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
      <SizeRadioButtons sizes={availableSizes} onSizeChange={handleSizeChange}  />

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
