import { ToppingType } from "./SharedTypes";

export const calculateToppingsTotal = (toppings: ToppingType[]) => {
    const total = toppings.reduce(
      (total, topping) => total + topping.price * (topping.quantity || 1),
      0
    );
    return total;
  };
