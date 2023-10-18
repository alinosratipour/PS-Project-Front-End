import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

interface ToppingType {
  id_size: number;
  name: string;
  price: number;
}

interface SizeType {
  id_size: number;
  p_size: string; // Assuming the size name is a string
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
  const [selectedSize, setSelectedSize] = useState(1);
  const [sizes, setSizes] = useState<SizeType[]>([]); // Specify the type
  const [selectedSizePrice, setSelectedSizePrice] = useState<number>(0); // Store selected size price

  const {
    loading: sizesLoading,
    error: sizesError,
    data: sizesData,
  } = useQuery(GET_PIZZAS_WITH_SIZES_AND_PRICES);

  const {
    loading,
    error,
    data = { getToppingPricesBySize: [] },
  } = useQuery<{ getToppingPricesBySize: ToppingType[] }>(GET_TOPPING_PRICES, {
    variables: { id_size: selectedSize },
  });

  useEffect(() => {
    if (!sizesLoading && sizesData) {
      // Extract the available sizes and their names from the query response
      const availableSizes = sizesData.getpizzasWithSizesAndPrices[0].sizesWithPrices;
      setSizes(availableSizes);
    }
  }, [sizesLoading, sizesData]);

  useEffect(() => {
    // Update the selected size price whenever the selected size changes
    if (sizes.length > 0) {
      const selectedSizeData = sizes.find((sizeData) => sizeData.id_size === selectedSize);
      if (selectedSizeData) {
        setSelectedSizePrice(selectedSizeData.price);
      }
    }
  }, [selectedSize, sizes]);

  if (sizesLoading) return "Loading sizes...";
  if (sizesError) return `Error! ${sizesError.message}`;

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const toppingPrices = data.getToppingPricesBySize;

  return (
    <div>
      <h1>Topping Prices</h1>
      <div>
        <label>Select Size: </label>
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(parseInt(e.target.value))}
        >
          {sizes.map((sizeData) => (
            <option key={sizeData.id_size} value={sizeData.id_size}>
               {sizeData.p_size} - £{sizeData.price} 
            </option>
          ))}
        </select>
      </div>
      <div>
        <p>Selected Size Price: £{selectedSizePrice}</p>
      </div>
      <ul>
        {toppingPrices.map((topping, index) => (
          <li key={index}>
            {topping.name}: £{topping.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToppingPrices;
