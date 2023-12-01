import { useState, Dispatch, SetStateAction } from "react";
import { ToppingType } from "../SharedTypes";

interface UseToppings {
  selectedToppings: ToppingType[];
  setSelectedToppings: Dispatch<SetStateAction<ToppingType[]>>;
  toppingsTotal: number;
  setToppingsTotal: Dispatch<SetStateAction<number>>;
}

const useToppings = (): UseToppings => {
  const [selectedToppings, setSelectedToppings] = useState<ToppingType[]>([]);
  const [toppingsTotal, setToppingsTotal] = useState<number>(0);

  return { selectedToppings, setSelectedToppings, toppingsTotal, setToppingsTotal };
};

export default useToppings;
