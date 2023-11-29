import React from "react";
import { useQuery } from "@apollo/client";
import { GET_TOPPINGS_ON_PIZZA } from "../../queries/queries";

interface PizzaToppingsProps {
  pizzaId: number;
  selectedSize: number; // Pass the selected size as a prop
}

interface ToppingsData {
  getToppingsOnPizza: {
    id: number;
    id_pizza: number;
    toppings: {
      id: number;
      name: string;
      toppingPrice: {
        id: number;
        id_size: number;
        price_topping: number;
      }[];
    };
  }[];
}

const PizzaToppings: React.FC<PizzaToppingsProps> = ({
  pizzaId,
  selectedSize,
}) => {
  const { data, loading, error } = useQuery<ToppingsData>(
    GET_TOPPINGS_ON_PIZZA,
    {
      variables: { id_pizza: pizzaId },
    }
  );

  if (loading) return <p>Loading toppings...</p>;
  if (error) return <p>Error fetching toppings: {error.message}</p>;

  const toppingsOnPizza = data?.getToppingsOnPizza || [];

  return (
    <div>
      <h2>Your Toppings</h2>
      <ul>
        {toppingsOnPizza.map((toppingOnPizza) => (
          <div key={toppingOnPizza.id}>
            <h4>{toppingOnPizza.toppings.name}</h4>
            <ul>
              {/* Find the correct price for the selected size */}
              {toppingOnPizza.toppings.toppingPrice.map((toppingPrice) => (
                toppingPrice.id_size === selectedSize && (
                  <li key={toppingPrice.id}>
                    £{toppingPrice.price_topping}
                  </li>
                )
              ))}
            </ul>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default PizzaToppings;
