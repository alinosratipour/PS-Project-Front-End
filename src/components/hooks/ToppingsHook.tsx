// ToppingsHook.tsx
import React from "react";
import { ToppingType } from "../SharedTypes";
import { calculateToppingsTotal } from "../../utils";

interface ToppingsHookProps {
  selectedToppings: ToppingType[];
  setSelectedToppings: React.Dispatch<React.SetStateAction<ToppingType[]>>;
  setToppingsTotal?:
    | React.Dispatch<React.SetStateAction<number>>
    | ((prevTotal: number) => number);
}

const useToppings = ({
  selectedToppings,
  setSelectedToppings,
  setToppingsTotal,
}: ToppingsHookProps) => {
  const updateToppingsTotal = (toppings: ToppingType[]) => {
    if (setToppingsTotal) {
      setToppingsTotal(calculateToppingsTotal(toppings));
    }
  };

  const addToppingToBasket = (topping: ToppingType) => {
    const existingToppingIndex = selectedToppings.findIndex(
      (t) => t.name === topping.name
    );

    if (existingToppingIndex !== -1) {
      const updatedToppings = [...selectedToppings];
      if (updatedToppings[existingToppingIndex].quantity < 10) {
        updatedToppings[existingToppingIndex].quantity += 1;
        setSelectedToppings(updatedToppings);
        updateToppingsTotal(updatedToppings);
      }
    } else {
      const newToppings = [...selectedToppings, { ...topping, quantity: 1 }];
      setSelectedToppings(newToppings);
      updateToppingsTotal(newToppings);
    }
  };

  const removeToppingFromBasket = (topping: ToppingType) => {
    setSelectedToppings((prevToppings) => {
      const updatedToppings = prevToppings
        .map((t: ToppingType) =>
          t.name === topping.name ? { ...t, quantity: t.quantity - 1 } : t
        )
        .filter((t: ToppingType) => t.quantity > 0);

      updateToppingsTotal(updatedToppings);

      return updatedToppings;
    });
  };

  return {
    addToppingToBasket,
    removeToppingFromBasket,
  };
};

export default useToppings;
