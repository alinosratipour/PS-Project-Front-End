import { useState } from "react";
import { ToppingType } from "../SharedTypes";

interface ToppingsSelectionResult {
  selectedToppings: number[];
  selectedToppingNames: string[];
  removedToppings: ToppingType[];
  handleToppingClick: (toppingId: number, toppingName: string) => void;
}

interface UseToppingsSelectionProps {
  onRemoveTopping: (topping: ToppingType) => void;
}

const useToppingsSelection = ({
  onRemoveTopping,
}: UseToppingsSelectionProps) => {
  const [selectedToppings, setSelectedToppings] = useState<number[]>([]);
  const [selectedToppingNames, setSelectedToppingNames] = useState<string[]>(
    []
  );
  const [removedToppings, setRemovedToppings] = useState<ToppingType[]>([]);

  const handleToppingClick = (toppingId: number, toppingName: string) => {
    setSelectedToppings((prevSelected) => {
      if (prevSelected.includes(toppingId)) {
        // Find the removed topping
        const removedTopping: ToppingType | undefined = removedToppings.find(
          (t) => t.id === toppingId
        );
        // Add the removed topping to the state
        if (removedTopping) {
          setRemovedToppings((prevRemoved) => [...prevRemoved, removedTopping]);
          // Call the onRemoveTopping callback
          onRemoveTopping(removedTopping);
        }

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
    removedToppings,
    handleToppingClick,
  };

  return result;
};

export default useToppingsSelection;
