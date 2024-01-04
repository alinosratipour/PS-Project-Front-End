import { ToppingType } from "./components/SharedTypes";

export const calculateToppingsTotal = (
  toppings: ToppingType[] = [],
  removedToppings: number = 0
) => {
  const totalToppingsQuantity = toppings.reduce(
    (total, topping) => total + (topping.quantity || 0),
    0
  );

  // return totalToppingsQuantity > removedToppings
  //   ? totalToppingsQuantity - removedToppings
  //   : 0;

  return Math.max(0, totalToppingsQuantity - removedToppings);
};
