// useAddToBasket.tsx
import { Dispatch, SetStateAction } from "react";
import { BasketItem, Pizza, ToppingType } from "../SharedTypes";
import { calculateToppingsTotal } from "../../utils";

interface UseAddToBasketProps {
  basket: BasketItem[];
  setBasket: Dispatch<SetStateAction<BasketItem[]>>;
  selectedSizePrice?: number;
  selectedBasePrice?: number;
  selectedToppings: ToppingType[];
}

const useAddToBasket = ({
  basket,
  setBasket,
  selectedSizePrice,
  selectedBasePrice,
  selectedToppings,
}: UseAddToBasketProps) => {
  const addToBasket = (pizza: Pizza, size: string, base: string) => {
    if (size !== undefined) {
      const existingPizzaIndex = basket.findIndex(
        (item) =>
          item.id_pizza === pizza.id_pizza &&
          item.size === size &&
          item.base === base
      );

      if (existingPizzaIndex !== -1) {
        // Pizza with the same size and base already exists, update quantity
        const updatedBasket = [...basket];
        updatedBasket[existingPizzaIndex].quantity += 1;
        setBasket(updatedBasket);
      } else {
        // Add a new pizza to the basket
        const pizzaWithPrice = {
          id_pizza: pizza.id_pizza,
          name: pizza.name,
          price: selectedSizePrice || 0,
          quantity: 1,
          size: size,
          base: base,
          basePrice: selectedBasePrice,
          toppings: selectedToppings,
          toppingsTotal: calculateToppingsTotal(selectedToppings),
        };

        setBasket([...basket, pizzaWithPrice]);
      }
    }
  };

  const calculateTotalPrice = () => {
    const pizzasTotalPrice = basket.reduce((total, item) => {
      const pizzaPrice =
        (item.price || 0) * item.quantity +
        (item.basePrice || 0) * item.quantity +
        (item.toppingsTotal || 0) * item.quantity;

      return total + pizzaPrice;
    }, 0);

    return Number(pizzasTotalPrice.toFixed(2));
  };

  return { addToBasket, calculateTotalPrice };
};

export default useAddToBasket;
