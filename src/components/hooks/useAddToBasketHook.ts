// useAddToBasketHook.ts
import { useState } from "react";
import { BasketItem, Pizza, ToppingType } from "../SharedTypes";
import { calculateToppingsTotal } from "../utils";

interface UseAddToBasketProps {
  basket: BasketItem[];
  setBasket: React.Dispatch<React.SetStateAction<BasketItem[]>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>; // Pass setIsModalOpen
  selectedSizePrice?: number;
  selectedBasePrice?: number;
  selectedToppings: ToppingType[];
  setSelectedToppings: React.Dispatch<React.SetStateAction<ToppingType[]>>;
  setToppingsTotal: React.Dispatch<React.SetStateAction<number>>;
}

const useAddToBasket = ({
  basket,
  setBasket,
  setIsModalOpen, // Receive setIsModalOpen
  selectedSizePrice,
  selectedBasePrice,
  selectedToppings,
}: UseAddToBasketProps) => {
  const addToBasket = (pizza: Pizza, size: string, base: string) => {
    if (size !== undefined) {
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
      setIsModalOpen(false); // Use setIsModalOpen here
    }
  };

  return { addToBasket };
};

export default useAddToBasket;
