import { useState } from "react";

interface ToppingsSelectionResult {
  selectedToppings: number[];
  selectedToppingNames: string[];
  handleToppingClick: (toppingId: number, toppingName: string) => void;
}

const useToppingsSelection = () => {
  const [selectedToppings, setSelectedToppings] = useState<number[]>([]);
  const [selectedToppingNames, setSelectedToppingNames] = useState<string[]>(
    []
  );

  const handleToppingClick = (toppingId: number, toppingName: string) => {
    setSelectedToppings((prevSelected) => {
      if (prevSelected.includes(toppingId)) {
        return prevSelected.filter((id) => id !== toppingId);
      } else {
        return [...prevSelected, toppingId];
      }
    });

    setSelectedToppingNames((prevNames) => {
      if (prevNames.includes(toppingName)) {
        return prevNames.filter((name) => name !== toppingName);
      } else {
        return [...prevNames, toppingName];
      }
    });
  };

  const result: ToppingsSelectionResult = {
    selectedToppings,
    selectedToppingNames,
    handleToppingClick,
  };

  return result;
};

export default useToppingsSelection;
