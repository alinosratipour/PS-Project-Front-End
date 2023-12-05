import { useState, useEffect } from "react";

interface ToppingQuantityHook {
  toppingQuantities: { [key: string]: number };
  updateToppingQuantity: (toppingName: string, quantity: number) => void;
}

const useToppingQuantity: (pizzaToppings: any) => ToppingQuantityHook = (pizzaToppings) => {
  const [toppingQuantities, setToppingQuantities] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (pizzaToppings) {
      const initialQuantities: { [key: string]: number } = {};
      pizzaToppings.forEach((topping) => {
        const name = topping.toppings?.name;
        if (name) {
          initialQuantities[name] = 0;
        }
      });
      setToppingQuantities(initialQuantities);
    }
  }, [pizzaToppings]);

  const updateToppingQuantity = (toppingName: string, quantity: number) => {
    setToppingQuantities((prevQuantities) => ({
      ...prevQuantities,
      [toppingName]:  isNaN(quantity) ? 1 : quantity,
    }));
  };

  return {
    toppingQuantities,
    updateToppingQuantity,
    setToppingQuantities, // Add this line if you need to access setToppingQuantities externally
  };
};

export default useToppingQuantity;
