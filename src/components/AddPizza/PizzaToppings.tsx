// PizzaToppings.tsx
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_TOPPINGS_ON_PIZZA } from "../../queries/queries";
import "./PizzaToppings.scss";
import classNames from "classnames";
import useToppingsSelection from "../hooks/ useToppingsSelection";

interface PizzaToppingsProps {
  pizzaId: number;
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

const PizzaToppings: React.FC<PizzaToppingsProps> = ({ pizzaId }) => {
  const { data, loading, error } = useQuery<ToppingsData>(
    GET_TOPPINGS_ON_PIZZA,
    {
      variables: { id_pizza: pizzaId },
    }
  );

  const { selectedToppings, handleToppingClick } = useToppingsSelection();

  if (loading) return <p>Loading toppings...</p>;
  if (error) return <p>Error fetching toppings: {error.message}</p>;

  const toppingsOnPizza = data?.getToppingsOnPizza || [];

  return (
    <div className="topping-container">
      {toppingsOnPizza.map((toppingOnPizza) => (
        <div
          key={toppingOnPizza.id}
          className={classNames("box", {
            selected: selectedToppings.includes(toppingOnPizza.id),
          })}
          onClick={() =>
            handleToppingClick(toppingOnPizza.id, toppingOnPizza.toppings.name)
          }
        >
          {toppingOnPizza.toppings.name}
        </div>
      ))}
    </div>
  );
};

export default PizzaToppings;
