import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import {
  GET_PIZZAS_WITH_SIZES_AND_PRICES,
  GET_TOPPING_PRICES,
} from "../queries/queries";

// Import the subcomponents
import SizeDropdown from "./SizeDropdown";
import SizePrice from "./SizePrice";
import ToppingsList from "./ToppingsList";

interface ListToppingAndPricesProps {
  pizzaId: number;
}

interface ToppingType {
  id_size: number;
  name: string;
  price: number;
}

interface SizeType {
  id_size: number;
  p_size: string;
  price_topping: number;
  price: number;
}

function ListToppingAndPrices({ pizzaId }: ListToppingAndPricesProps) {
  const [sizes, setSizes] = useState<SizeType[]>([]);
  const [selectedSize, setSelectedSize] = useState<number>(1);
   const [selectedSizePrice, setSelectedSizePrice] = useState<number | undefined>(0);

  // Query for sizes data if it's not available
  const { loading: sizesLoading, data: sizesData } = useQuery(GET_PIZZAS_WITH_SIZES_AND_PRICES);

  // Query for topping data
  const { loading, error, data: toppingData } = useQuery<{ getToppingPricesBySize: ToppingType[] }>(GET_TOPPING_PRICES, {
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

  const handleSizeChange = (newSize: number) => {
    setSelectedSize(newSize);
    const newSelectedSizeData = sizes.find((sizeData) => sizeData.id_size === newSize);

    if (newSelectedSizeData) {
      setSelectedSizePrice(newSelectedSizeData.price);
    }
  };

  if (sizesLoading) return "Loading sizes...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <h1>Topping Prices</h1>

      {/* Render the SizeDropdown subcomponent */}
      <SizeDropdown sizes={sizes} selectedSize={selectedSize} onSizeChange={handleSizeChange} />

      {/* Render the SizePrice subcomponent */}
      <SizePrice selectedSizePrice={selectedSizePrice} />

      {/* Render the ToppingsList subcomponent */}
      <ToppingsList toppingData={toppingData?.getToppingPricesBySize} />
    </div>
  );
}

export default ListToppingAndPrices;
