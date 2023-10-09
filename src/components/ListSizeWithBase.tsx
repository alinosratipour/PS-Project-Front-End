import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PIZZAS_WITH_SIZES_AND_PRICES } from '../queries/queries';
import PizzaSizeDropdown from './PizzaSizeDropdown'; // Import the new component

// Define a type for the size and price mapping
type SizeAndPriceMap = Record<string, number>;

const PizzaList = () => {
  const { loading, error, data } = useQuery(GET_PIZZAS_WITH_SIZES_AND_PRICES);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const pizzas = data.pizzasWithSizesAndPrices;

  const sizeAndPriceMap: SizeAndPriceMap = {};

  pizzas.forEach((pizza: { sizesWithPrices: { p_size: string; price: number }[] }) => {
    pizza.sizesWithPrices.forEach((size) => {
      sizeAndPriceMap[size.p_size] = size.price;
    });
  });

  const uniqueSizes = Object.keys(sizeAndPriceMap);

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const size = event.target.value;
    setSelectedSize(size);
  };

  return (
    <div>
      <h1>List of Pizzas</h1>
      <PizzaSizeDropdown
        sizes={uniqueSizes}
        selectedSize={selectedSize}
        handleSizeChange={handleSizeChange}
        sizeAndPriceMap={sizeAndPriceMap}
      />

      {selectedSize && (
        <div>
          <h2>Selected Size: {selectedSize}</h2>
          <h3>Price: {sizeAndPriceMap[selectedSize]}</h3>
        </div>
      )}
    </div>
  );
};

export default PizzaList;
