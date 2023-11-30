// PizzaToppings.tsx
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_TOPPINGS_ON_PIZZA } from "../../queries/queries";
import "./PizzaToppings.scss";
import classNames from "classnames";
import useToppingsSelection from "../hooks/ useToppingsSelection";
import { ToppingsData, ToppingType } from "../SharedTypes";

interface PizzaToppingsProps {
  pizzaId: number;
  onRemoveTopping: (topping: ToppingType) => void; // New prop
}

const PizzaToppings: React.FC<PizzaToppingsProps> = ({ pizzaId, onRemoveTopping }) => {
  const { data, loading, error } = useQuery<ToppingsData>(
    GET_TOPPINGS_ON_PIZZA,
    {
      variables: { id_pizza: pizzaId },
    }
  );

  const { selectedToppings, handleToppingClick } = useToppingsSelection({
    onRemoveTopping,
  });

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
