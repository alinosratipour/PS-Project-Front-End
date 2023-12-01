// useBasket.tsx
import { useState, Dispatch, SetStateAction } from "react";
import { BasketItem } from "../SharedTypes";

interface UseBasket {
  basket: BasketItem[];
  setBasket: Dispatch<SetStateAction<BasketItem[]>>;
}

const useBasket = (): UseBasket => {
  const [basket, setBasket] = useState<BasketItem[]>([]);

  return { basket, setBasket };
};

export default useBasket;
