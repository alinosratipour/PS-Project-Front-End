import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import Dropdown from "./UI-Liberary/DropDown/DropDown";
import { GET_PIZZAS_WITH_SIZES_AND_PRICES, GET_TOPPING_PRICES } from "../queries/queries";

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

interface ListToppingAndPricesProps {
  pizzaId: number; // Pass the pizza ID as a prop
}

function ListToppingAndPrices({ pizzaId }: ListToppingAndPricesProps) {
  const [sizes, setSizes] = useState<SizeType[]>([]);
  const [selectedSizePrice, setSelectedSizePrice] = useState<number | undefined>(0);
  const [selectedSize, setSelectedSize] = useState<number | undefined>(pizzaId);


  const {
    loading: sizesLoading,
    error: sizesError,
    data: sizesData,
  } = useQuery(GET_PIZZAS_WITH_SIZES_AND_PRICES);

  const {
    loading,
    error,
    data: toppingData,
  } = useQuery<{ getToppingPricesBySize: ToppingType[] }>(GET_TOPPING_PRICES, {
    variables: { id_size: Number(selectedSize) },
  });

  useEffect(() => {
    if (!sizesLoading && sizesData) {
      const pizzaSizesData = sizesData.getpizzasWithSizesAndPrices.find((pizza: any) => pizza.id_pizza === pizzaId);

      if (pizzaSizesData) {
        const availableSizes = pizzaSizesData.sizesWithPrices;
        setSizes(availableSizes);

        const initialSelectedSizeData = availableSizes[0]; // Default to the first size
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
  if (sizesError) return `Error! ${sizesError.message}`;
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <h1>Topping Prices</h1>
      <div>
        <label>Select Size: </label>
        <Dropdown
          options={sizes.map((sizeData) => ({
            value: sizeData.id_size,
            label: `${sizeData.p_size} - £${sizeData.price}`,
          }))}
          selectedValue={selectedSize}
          onOptionChange={handleSizeChange}
        />
      </div>
      <div>
        <p>£{selectedSizePrice || 0}</p>
      </div>
      <ul>
        {toppingData &&
          toppingData.getToppingPricesBySize.map((topping, index) => (
            <li key={index}>
              {topping.name}: £{topping.price}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default ListToppingAndPrices;
