// useAddToppingsHook.js
import { ToppingType } from "../SharedTypes";
import { calculateToppingsTotal } from "../../utils";
import useToppings from "./StateHooks/useToppings";
import { useState } from "react";

const useAddToppings = () => {
  const { selectedToppings: internalSelectedToppings, setToppingsTotal } =
    useToppings();

  const [selectedToppings, setSelectedToppings] = useState<ToppingType[]>(
    internalSelectedToppings
  );

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
      // Log for debugging
      console.log("Before removal:", prevToppings);

      const updatedToppings = prevToppings.map((t: ToppingType) =>
        t.name === topping.name ? { ...t, quantity: t.quantity - 1 } : t
      );

      // Log for debugging
      console.log("After removal:", updatedToppings);

      const filteredToppings = updatedToppings.filter(
        (t: ToppingType) => t.quantity > 0
      );

      // Log for debugging
      console.log("After filter:", filteredToppings);

      updateToppingsTotal(filteredToppings);

      return filteredToppings;
    });
  };

  return {
    selectedToppings,
    setSelectedToppings,
    setToppingsTotal,
    addToppingToBasket,
    removeToppingFromBasket,
  };
};

export default useAddToppings;
