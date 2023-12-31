import { useEffect, useState } from "react";
import { Pizza, ToppingType } from "../SharedTypes";
import { calculateToppingsTotal } from "../../utils";
import { useToppingsRemovalFromPizza } from "../store/ToppingOnPizzaStore ";
import { useBasketContext } from "../Context/BasketContext";


interface UseAddToBasketProps {
  selectedToppings?: ToppingType[];
}
const EDITE_TOPPINGS_STORAGE_KEY = "toppings";
const useAddToBasket = ({ selectedToppings }: UseAddToBasketProps) => {
  const { removedToppings, setRemovedToppings } = useToppingsRemovalFromPizza();
  const [selectedSizePrice, setSelectedSizePrice] = useState<
    number | undefined
  >(0);
  const [selectedBasePrice, setSelectedBasePrice] = useState<
    number | undefined
  >(0);

  const { basket, setBasket } = useBasketContext();

     useEffect(() => {
    const storedRemovedToppings = localStorage.getItem(EDITE_TOPPINGS_STORAGE_KEY);
    if (storedRemovedToppings) {
      setRemovedToppings(JSON.parse(storedRemovedToppings));
    }


  }, []);
  useEffect(() => {
    localStorage.setItem(EDITE_TOPPINGS_STORAGE_KEY, JSON.stringify(removedToppings));
  }, [removedToppings]);

  const addToBasket = (pizza: Pizza, size: string, base: string) => {
    if (size !== undefined) {
      const existingPizzaIndex = basket.findIndex(
        (item) =>
          item.id_pizza === pizza.id_pizza &&
          item.size === size &&
          item.base === base
        // && item.size_id === item.size_id
      );

      if (existingPizzaIndex !== -1) {
        // Pizza with the same size and base already exists, update quantity
        const updatedBasket = [...basket];
        updatedBasket[existingPizzaIndex].quantity += 1;
        setBasket(updatedBasket);
      } else {
        const extraToppingsQuantity = calculateToppingsTotal(
          selectedToppings ?? [],
          removedToppings.length
        );

        const extraToppingsCost: number = selectedToppings
          ? selectedToppings
              .map((topping) => (topping.price || 0) * extraToppingsQuantity)
              .find((cost) => cost !== 0) || 0
          : 0;

        // Add a new pizza to the basket
        const pizzaWithPrice = {
          id_pizza: pizza.id_pizza,
          name: pizza.name,
          price: selectedSizePrice || 0,
          quantity: 1,
          size: size,
          // size_id: sizeId,
          base: base,
          basePrice: selectedBasePrice,
          toppings: selectedToppings,
          toppingsTotal: extraToppingsCost,
          removedToppings: removedToppings,
        };

        setBasket([...basket, pizzaWithPrice]);
       // setRemovedToppings([]); // Clear removed toppings after adding to the basket
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
    setSelectedSizePrice,
  };
};

export default useAddToBasket;
