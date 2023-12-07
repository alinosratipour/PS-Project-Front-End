// useAddToBasket.tsx
import { Dispatch, SetStateAction, useState } from "react";
import { BasketItem, Pizza, ToppingType } from "../SharedTypes";
import { calculateToppingsTotal } from "../../utils";
import { useToppingsStore } from "../store/ToppingOnPizza";
import useBasket from "./useBasket";
interface UseAddToBasketProps {
  // basket: BasketItem[];
  //setBasket: Dispatch<SetStateAction<BasketItem[]>>;
  //selectedSizePrice?: number;
  //selectedBasePrice?: number;
  selectedToppings: ToppingType[];
}

const useAddToBasket = ({
  //basket,
  //setBasket,
  //selectedSizePrice,
  //selectedBasePrice,
  selectedToppings,
}: UseAddToBasketProps) => {
  const { removedToppings, setRemovedToppings } = useToppingsStore();
  const [selectedSizePrice, setSelectedSizePrice] = useState<
    number | undefined
  >(0);
  const [selectedBasePrice, setSelectedBasePrice] = useState<
    number | undefined
  >(0);
  const { basket, setBasket } = useBasket();
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
          removedToppings: removedToppings,
        };

        setBasket([...basket, pizzaWithPrice]);
        setRemovedToppings([]); // Clear removed toppings after adding to the basket
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

  return {
    addToBasket,
    calculateTotalPrice,
    removedToppings,
    setRemovedToppings,
    basket,
    setBasket,
    selectedBasePrice,
    selectedSizePrice,
    setSelectedBasePrice,
    setSelectedSizePrice
  };
};

export default useAddToBasket;
