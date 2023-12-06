import React, { useState } from 'react';
import { ToppingType } from "../SharedTypes";
import classnames from "classnames";
import "./ToppingsList.scss";

interface ToppingsListProps {
  onAddTopping: (topping: ToppingType) => void;
  onRemoveTopping: (topping: ToppingType) => void;
  availableToppings?: ToppingType[] | undefined;
  pizzaToppings?: ToppingType[] | undefined;
  selectedToppings?: ToppingType[];
  refetchToppings?: (idSize: number) => Promise<void>;
}

function ToppingsList({
  availableToppings,
  pizzaToppings,
  selectedToppings,
  onAddTopping,
  onRemoveTopping,
}: ToppingsListProps) {
  const [selectedPizzaToppings, setSelectedPizzaToppings] = useState<ToppingType[]>([]);
  const [toppingQuantities, setToppingQuantities] = useState<{ [key: string]: number }>({});

  const isToppingInBasket = (topping: ToppingType) =>
    selectedToppings && selectedToppings.some((t) => t.name === topping.name);

  const isToppingInPizza = (topping: ToppingType) => (
    pizzaToppings && pizzaToppings.some((t) => t.toppings && t.toppings.name === topping.name)
  );

  const handleAddClick = (topping: ToppingType) => {
    onAddTopping(topping);

    // Add the topping to selectedPizzaToppings
    setSelectedPizzaToppings((prev) => [...prev, topping]);

    // Update topping quantity
    setToppingQuantities((prev) => ({
      ...prev,
      [topping.name]: (prev[topping.name] || 0) + 1,
    }));
  };

  const handleRemoveClick = (topping: ToppingType) => {
    onRemoveTopping(topping);

    // Remove the topping from selectedPizzaToppings
    setSelectedPizzaToppings((prev) =>
      prev.filter((t) => t.name !== topping.name)
    );

    // Update topping quantity
    setToppingQuantities((prev) => ({
      ...prev,
      [topping.name]: Math.max((prev[topping.name] || 0) - 1, 0),
    }));
  };

  return (
    <ul>
      {availableToppings && availableToppings.map((topping, index) => (
        <li key={index}>
          <span className={classnames("topping-name", {
            "in-pizza": isToppingInPizza(topping),
            "in-basket": isToppingInBasket(topping),
          })}>
            {topping.name}: £{topping.price}{' '}
            {toppingQuantities[topping.name] > 0 && (
              <span>({toppingQuantities[topping.name]})</span>
            )}
          </span>
          {isToppingInPizza(topping) ? (
            <>
              {toppingQuantities[topping.name] > 0 && (
                <button onClick={() => handleRemoveClick(topping)}>
                  remove
                </button>
              )}
              <button onClick={() => handleAddClick(topping)}>add</button>
            </>
          ) : (
            <>
              {toppingQuantities[topping.name] > 0 && (
                <>
                  <span className="quantity">
                    Qty: {toppingQuantities[topping.name]}
                  </span>
                  <button onClick={() => handleRemoveClick(topping)}>
                    remove
                  </button>
                </>
              )}
              <button onClick={() => handleAddClick(topping)}>add</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default ToppingsList;
