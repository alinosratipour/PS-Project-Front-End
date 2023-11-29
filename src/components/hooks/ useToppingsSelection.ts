// useToppingsSelection.ts
import { useState } from "react";

const useToppingsSelection = () => {
  const [selectedToppings, setSelectedToppings] = useState<number[]>([]);
  const [selectedToppingNames, setSelectedToppingNames] = useState<string[]>(
    []
  ); // Track topping names

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

  return { selectedToppings, selectedToppingNames, handleToppingClick };
};

export default useToppingsSelection;
