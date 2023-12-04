import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_TOPPINGS_ON_PIZZA } from "../../queries/queries";
import "./PizzaToppings.scss";
import classNames from "classnames";
import { useToppingsOnPizzaStore } from "../Context/toppingsOnPizzzaStore";
import { ToppingType } from "../SharedTypes";

interface PizzaToppingsProps {
  pizzaId: number;
}

const PizzaToppings: React.FC<PizzaToppingsProps> = ({ pizzaId }) => {
  const { data, loading, error } = useQuery<{ getToppingsOnPizza: ToppingType[] }>(
    GET_TOPPINGS_ON_PIZZA,
    {
      variables: { id_pizza: pizzaId },
    }
  );

  const {
    selectedToppingsOnPizza,
    toggleTopping,
    fetchToppingsOnPizza,
    toppingsOnPizza,
  } = useToppingsOnPizzaStore();

  useEffect(() => {
    // Fetch toppings when the component mounts or pizzaId changes
    fetchToppingsOnPizza(pizzaId);
  }, [fetchToppingsOnPizza, pizzaId]);

  if (loading) return <p>Loading toppings...</p>;
  if (error) return <p>Error fetching toppings: {error.message}</p>;
console.log(toppingsOnPizza);

  return (
    <div className="topping-container">
      {toppingsOnPizza.map((topping) => (
        <div
          key={topping.id}
          className={classNames("box", {
            selected: selectedToppingsOnPizza.includes(topping.id_size),
          })}
          onClick={() => toggleTopping(topping.id_size)}
        >
          {topping.name}
        </div>
      ))}
    </div>
  );
};

export default PizzaToppings;
