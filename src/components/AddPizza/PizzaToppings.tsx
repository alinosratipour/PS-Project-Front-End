import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_TOPPINGS_ON_PIZZA } from "../../queries/queries";
import "./PizzaToppings.scss";
import classNames from "classnames";

interface PizzaToppingsProps {
  pizzaId: number;
//  selectedSize: number;
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
 
}) => {
  const { data, loading, error } = useQuery<ToppingsData>(
    GET_TOPPINGS_ON_PIZZA,
    {
      variables: { id_pizza: pizzaId },
    }
  );

  const [selectedToppings, setSelectedToppings] = useState<number[]>([]);

  const handleToppingClick = (toppingId: number) => {
    console.log("Clicked toppingId:", toppingId);
  
    // Toggle the topping in the selectedToppings array
    setSelectedToppings((prevSelected) => {
      if (prevSelected.includes(toppingId)) {
        // If already selected, remove it
        return prevSelected.filter((id) => id !== toppingId);
      } else {
        // If not selected, add it
        return [...prevSelected, toppingId];
      }
    });
  };
  
  if (loading) return <p>Loading toppings...</p>;
  if (error) return <p>Error fetching toppings: {error.message}</p>;

  const toppingsOnPizza = data?.getToppingsOnPizza || [];
const toppingCount = data?.getToppingsOnPizza || [];
console.log("toppingCount",toppingCount.length);

  return (
    <div className="topping-container">
      {toppingsOnPizza.map((toppingOnPizza) => (
        <div
          key={toppingOnPizza.id}
          className={classNames("box", {
            selected: selectedToppings.includes(toppingOnPizza.id),
          })}
          onClick={() => handleToppingClick(toppingOnPizza.id)}
        >
          {toppingOnPizza.toppings.name}
        </div>
      ))}
    </div>
  );
};

export default PizzaToppings;
