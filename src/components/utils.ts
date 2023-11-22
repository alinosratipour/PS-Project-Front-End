import { ToppingType } from "./SharedTypes";


export const calculateToppingsTotal = (toppings: ToppingType[]) => {
  return toppings.reduce((total, topping) => {
    const toppingTotal = (topping.price || 0) * (topping.quantity || 1);
    return total + toppingTotal;
  }, 0);
};

