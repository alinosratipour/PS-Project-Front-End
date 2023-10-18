import { useState } from 'react';
import { useQuery ,gql} from '@apollo/client';


interface ToppingType {
  id_size: number;
  name: string;
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

function ToppingPrices() {
  const [selectedSize, setSelectedSize] = useState(1);

  const { loading, error, data = { getToppingPricesBySize: [] } } = useQuery<{ getToppingPricesBySize: ToppingType[] }>(GET_TOPPING_PRICES, {
    variables: { id_size: selectedSize },
  });

  if (loading) return 'Loading...';
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
          <option value={1}>Small</option>
          <option value={2}>Medium</option>
          <option value={3}>Large</option>
          <option value={4}>X-Large</option>
        </select>
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
