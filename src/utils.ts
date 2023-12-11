import { ToppingType } from "./components/SharedTypes";

export const calculateToppingsTotal = (
  toppings: ToppingType[] = [],
  numberOfFreeToppings: number = 0
) => {
  const totalToppingsQuantity = toppings.reduce(
    (total, topping) => total + (topping.quantity || 0),
    0
  );

  return totalToppingsQuantity > numberOfFreeToppings
    ? totalToppingsQuantity - numberOfFreeToppings
    : 0;
};
