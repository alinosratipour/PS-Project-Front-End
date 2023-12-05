import { useState, useEffect } from "react";

interface ToppingQuantityHook {
  toppingQuantities: { [key: string]: number };
  updateToppingQuantity: (toppingName: string, quantity: number) => void;
}

const useToppingQuantity: (pizzaToppings: any) => ToppingQuantityHook = (pizzaToppings) => {
  const [toppingQuantities, setToppingQuantities] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (pizzaToppings) {
      const initialQuantities: { [key: string]: number } = pizzaToppings.reduce(
        (quantities: { [key: string]: number }, topping: any) => {
          quantities[topping.name] = topping.quantity || 1; // Set the default quantity to 1
          return quantities;
        },
        {}
      );


      setToppingQuantities(initialQuantities);
    }
  }, [pizzaToppings]);

  const updateToppingQuantity = (toppingName: string, quantity: number) => {
    setToppingQuantities((prevQuantities) => ({
      ...prevQuantities,
      [toppingName]: isNaN(quantity) ? 1 : quantity,
    }));
  };

  return {
    toppingQuantities,
    updateToppingQuantity,
  };
};

export default useToppingQuantity;
