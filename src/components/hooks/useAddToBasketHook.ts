import { useState } from "react";
import { Pizza, ToppingType } from "../SharedTypes";
import { calculateToppingsTotal } from "../../utils";
import { useToppingsRemovalFromPizza } from "../store/ToppingOnPizzaStore ";
import { useBasketContext } from "../Context/BasketContext";
interface UseAddToBasketProps {
  selectedToppings?: ToppingType[];
}

const useAddToBasket = ({ selectedToppings }: UseAddToBasketProps) => {
  const { removedToppings, setRemovedToppings } = useToppingsRemovalFromPizza();
  const [selectedSizePrice, setSelectedSizePrice] = useState<
    number | undefined
  >(0);
  const [selectedBasePrice, setSelectedBasePrice] = useState<
    number | undefined
  >(0);
  // const { basket, setBasket } = useBasket();
  const { basket, setBasket } = useBasketContext();
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
        const totalToppingsQuantity = selectedToppings
          ? selectedToppings.reduce(
              (total, topping) => total + (topping.quantity || 0),
              0
            )
          : 0;

        const toppingsTotal =
          totalToppingsQuantity >= 4 ? totalToppingsQuantity - 3 : 0;
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
          toppingsTotal: toppingsTotal,
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
      console.log("item.toppingsTotal", item.toppingsTotal);
      console.log("item.quantity", item.quantity);
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
    setSelectedSizePrice,
  };
};

export default useAddToBasket;
