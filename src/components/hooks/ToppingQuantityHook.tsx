import { useState, useEffect } from "react";
import { ToppingType } from "../SharedTypes";
interface ToppingQuantityHook {
  toppingQuantities: { [key: string]: number };
  updateToppingQuantity: (toppingName: string, quantity: number) => void;
  resetToppingQuantity: (toppingName: string) => void;
}

const useToppingQuantity: (
  pizzaToppings: ToppingType[]
) => ToppingQuantityHook = (pizzaToppings) => {
  const [toppingQuantities, setToppingQuantities] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    if (pizzaToppings) {
      const initialQuantities: { [key: string]: number } = {};
      pizzaToppings.forEach((topping) => {
        const name = topping.toppings?.name;
        if (name) {
          initialQuantities[name] = (initialQuantities[name] || 0) + 1;
        }
      });
      setToppingQuantities(initialQuantities);
    }
  }, [pizzaToppings]);

  const updateToppingQuantity = (toppingName: string, quantity: number) => {
    setToppingQuantities((prevQuantities) => ({
      ...prevQuantities,
      [toppingName]: isNaN(quantity) ? 1 : quantity,
    }));
  };

  const resetToppingQuantity = (toppingName: string) => {
    setToppingQuantities((prevQuantities) => ({
      ...prevQuantities,
      [toppingName]: 1,
    }));
  };

  return {
    toppingQuantities,
    updateToppingQuantity,
    resetToppingQuantity,
  };
};

export default useToppingQuantity;
