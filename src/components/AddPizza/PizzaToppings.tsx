// PizzaToppings.tsx
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_TOPPINGS_ON_PIZZA } from "../../queries/queries";
import "./PizzaToppings.scss";
import classNames from "classnames";
import { ToppingsData, ToppingType } from "../SharedTypes";
import {useToppingsStore} from "../store/ToppingOnPizza"

interface PizzaToppingsProps {
  pizzaId: number;
}

const PizzaToppings: React.FC<PizzaToppingsProps> = ({ pizzaId }) => {
  const { data, loading, error } = useQuery<ToppingsData>(
    GET_TOPPINGS_ON_PIZZA,
    {
      variables: { id_pizza: pizzaId },
    }
  );

  //const [removedToppings, setRemovedToppings] = useState<ToppingType[]>([]);
const {removedToppings, setRemovedToppings} = useToppingsStore();

  const handleToppingClick = (toppingId: number, toppingName: string) => {
    setRemovedToppings((prevRemoved: ToppingType[]) => {
      const existingTopping = prevRemoved.find((t) => t.id === toppingId);
  
      if (existingTopping) {
        // Topping is already removed, so undo removal
        return prevRemoved.filter((t) => t.id !== toppingId);
      } else {
        // Topping is not removed, so add to removedToppings
        return [...prevRemoved, { id: toppingId, name: toppingName, id_size: 0, price: 0, quantity: 0 }];
      }
    });
  };
  if (loading) return <p>Loading toppings...</p>;
  if (error) return <p>Error fetching toppings: {error.message}</p>;

  const toppingsOnPizza = data?.getToppingsOnPizza || [];

  return (
    <div className="topping-container">
      {toppingsOnPizza.map((toppingOnPizza) => (
        <div
          key={toppingOnPizza.id}
          className={classNames("box", {
            selected: removedToppings.some(
              (t) => t.id === toppingOnPizza.id
            ),
          })}
          onClick={() =>
            handleToppingClick(
              toppingOnPizza.id,
              toppingOnPizza.toppings.name
            )
          }
        >
          {toppingOnPizza.toppings.name}
        </div>
      ))}
    </div>
  );
};

export default PizzaToppings;
