import React, { useEffect, useState } from "react";
import { ToppingType } from "../SharedTypes";
import classnames from "classnames";
import "./ToppingsList.scss";
import useToppingQuantity from "../hooks/ToppingQuantityHook";

interface ToppingsListProps {
  onAddTopping: (topping: ToppingType) => void;
  onRemoveTopping: (topping: ToppingType) => void;
  availableToppings?: ToppingType[] | undefined;
  pizzaToppings?: ToppingType[] | undefined;
  selectedToppings?: ToppingType[];
  refetchToppings?: (idSize: number) => Promise<void>;
}

// ... (import statements)

function ToppingsList({
  availableToppings,
  pizzaToppings,
  selectedToppings,
  onAddTopping,
  onRemoveTopping,
}: ToppingsListProps) {
  const { toppingQuantities, updateToppingQuantity } = useToppingQuantity(pizzaToppings);
  const [showRemoveButtons, setShowRemoveButtons] = useState<{ [key: string]: boolean }>({});

  const isToppingInBasket = (topping: ToppingType) =>
    selectedToppings && selectedToppings.some((t) => t.name === topping.name);

  const isToppingInPizza = (topping: ToppingType) =>
    pizzaToppings && pizzaToppings.some((t) => t.toppings && t.toppings.name === topping.name);

  const handleRemoveClick = (topping: ToppingType) => {
    const updatedQuantity = toppingQuantities[topping.name] - 1;
    updateToppingQuantity(topping.name, updatedQuantity);
    onRemoveTopping(topping);

    // Update the state to show/hide remove button based on quantity
    setShowRemoveButtons((prevButtons) => ({
      ...prevButtons,
      [topping.name]: updatedQuantity > 0,
    }));
  };

  const handleAddClick = (topping: ToppingType) => {
    const updatedQuantity = toppingQuantities[topping.name] + 1;
    updateToppingQuantity(topping.name, updatedQuantity);
    onAddTopping(topping);

    // Always show the remove button when adding
    setShowRemoveButtons((prevButtons) => ({
      ...prevButtons,
      [topping.name]: true,
    }));
  };

  useEffect(() => {
    // Initialize showRemoveButtons based on existing pizza toppings
    if (pizzaToppings) {
      const initialButtons: { [key: string]: boolean } = {};
      pizzaToppings.forEach((topping) => {
        const name = topping.toppings?.name;
        if (name) {
          initialButtons[name] = true; // Show remove button initially
        }
      });
      setShowRemoveButtons(initialButtons);
    }
  }, [pizzaToppings]);

  return (
    <ul>
      {availableToppings &&
        availableToppings.map((topping, index) => (
          <li key={index}>
            <span
              className={classnames("topping-name", {
                "in-pizza": isToppingInPizza(topping),
                "in-basket": isToppingInBasket(topping),
              })}
            >
              {topping.name}: £{topping.price}
              {isToppingInPizza(topping) && (
                <>
                  {toppingQuantities[topping.name] > 0 && (
                    <span className="quantity">
                      Qty: {toppingQuantities[topping.name]}
                    </span>
                  )}
                  {showRemoveButtons[topping.name] && (
                    <button onClick={() => handleRemoveClick(topping)}>
                      remove
                    </button>
                  )}
                  <button onClick={() => handleAddClick(topping)}>
                    add
                  </button>
                </>
              )}
              {!isToppingInPizza(topping) && (
                <>
                  {toppingQuantities[topping.name] > 0 && (
                    <span className="quantity">
                      Qty: {toppingQuantities[topping.name]}
                    </span>
                  )}
                  {showRemoveButtons[topping.name] && (
                    <button onClick={() => handleRemoveClick(topping)}>
                      remove
                    </button>
                  )}
                  <button onClick={() => handleAddClick(topping)}>
                    add
                  </button>
                </>
              )}
            </span>
          </li>
        ))}
    </ul>
  );
}

export default ToppingsList;

