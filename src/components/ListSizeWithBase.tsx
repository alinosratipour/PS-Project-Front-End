import  { useState } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const GET_PIZZAS_WITH_SIZES_AND_PRICES = gql`
  {
    pizzasWithSizesAndPrices {
      id_pizza
      sizesWithPrices {
        id_size
        p_size
        price
      }
    }
  }
`;

const PizzaList = () => {
  const { loading, error, data } = useQuery(GET_PIZZAS_WITH_SIZES_AND_PRICES);
  const [selectedSize, setSelectedSize] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const pizzas = data.pizzasWithSizesAndPrices;

  const sizeAndPriceMap = {};

  pizzas.forEach((pizza) => {
    pizza.sizesWithPrices.forEach((size) => {
      sizeAndPriceMap[size.p_size] = size.price;
    });
  });

  const uniqueSizes = Object.keys(sizeAndPriceMap);

  const handleSizeChange = (event) => {
    const size = event.target.value;
    setSelectedSize(size);
  };

  return (
    <div>
      <h1>List of Pizzas</h1>
      <div>
        <label>Select Pizza Size:</label>
        <select onChange={handleSizeChange}>
          <option value="">Select a Size</option>
          {uniqueSizes.map((size) => (
            <option key={size} value={size}>
              {size} - {sizeAndPriceMap[size]}
            </option>
          ))}
        </select>
      </div>

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
