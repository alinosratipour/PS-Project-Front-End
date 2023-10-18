import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Dropdown from "../components/UI-Liberary/DropDown/DropDown";

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

const GET_TOPPING_PRICES = gql`
  query GetToppingPricesBySize($id_size: Int) {
    getToppingPricesBySize(id_size: $id_size) {
      id_size
      name
      price
    }
  }
`;

const GET_PIZZAS_WITH_SIZES_AND_PRICES = gql`
  {
    getpizzasWithSizesAndPrices {
      id_pizza
      sizesWithPrices {
        id_size
        p_size
        price_topping
        price
      }
    }
  }
`;

function ToppingPrices() {
  const [sizes, setSizes] = useState<SizeType[]>([]);
  const [selectedSizePrice, setSelectedSizePrice] = useState<
    number | undefined
  >(0);
  const [selectedSize, setSelectedSize] = useState<number>(1);

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
      const availableSizes =
        sizesData.getpizzasWithSizesAndPrices[0].sizesWithPrices;
      setSizes(availableSizes);

      // Update the selected size price based on the initial selected size
      const initialSelectedSizeData = availableSizes.find(
        (sizeData: SizeType) => sizeData.id_size === selectedSize
      );
      if (initialSelectedSizeData) {
        setSelectedSizePrice(initialSelectedSizeData.price);
      }
    }
  }, [sizesLoading, sizesData, selectedSize]);

  const handleSizeChange = (newSize: number) => {
    setSelectedSize(newSize);

    const newSizeInt = parseInt(newSize.toString(), 10); // Ensure newSize is an integer
    // Update the selected size price based on the newly selected size
    const newSelectedSizeData = sizes.find(
      (sizeData) => sizeData.id_size === newSizeInt
    );
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
        <p>Selected Size Price: £{selectedSizePrice || 0}</p>
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

export default ToppingPrices;
