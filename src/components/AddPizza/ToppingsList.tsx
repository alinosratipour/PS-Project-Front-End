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

// ... (your existing imports)

function ToppingsList({
  availableToppings,
  pizzaToppings,
  selectedToppings,
  onAddTopping,
  onRemoveTopping,
}: ToppingsListProps) {
  const { toppingQuantities, updateToppingQuantity } =
    useToppingQuantity(pizzaToppings);
  const [initialQuantitySet, setInitialQuantitySet] = useState(false);

  // Initialize quantities from pizzaToppings if it is present
  useEffect(() => {
    if (!initialQuantitySet && pizzaToppings) {
      pizzaToppings.forEach((toppingOnPizza) => {
        const name = toppingOnPizza.toppings?.name;
        const quantity = toppingOnPizza.quantity || 1;
  
        // Check if the quantity has changed before updating
        if (name && toppingQuantities[name] !== quantity) {
          updateToppingQuantity(name, quantity);
        }
      });
  
      // Set the initial quantity only once
      setInitialQuantitySet(true);
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount
  

  const isToppingInBasket = (topping: ToppingType) =>
    selectedToppings && selectedToppings.some((t) => t.name === topping.name);

  const isToppingInPizza = (topping: ToppingType) =>
    pizzaToppings &&
    pizzaToppings.some((t) => t.toppings && t.toppings.name === topping.name);



    const handleRemoveClick = (topping: ToppingType) => {
      onRemoveTopping(topping);
    
      const updatedQuantity = toppingQuantities[topping.name] - 1;
    
      // Ensure the quantity doesn't go below 0
      const newQuantity = Math.max(updatedQuantity, 0);
    
      updateToppingQuantity(topping.name, newQuantity);
    
      // If the new quantity is 0, set the initial quantity flag to false
      if (newQuantity === 0) {
        setInitialQuantitySet(false);
      }
    };
    
  
  const handleAddClick = (topping: ToppingType) => {
    onAddTopping(topping);
    updateToppingQuantity(topping.name, toppingQuantities[topping.name] + 1);
  };

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
        Quantity: {toppingQuantities[topping.name]}
      </span>
    )}
    {toppingQuantities[topping.name] > 0 ? (
      <>
        <button onClick={() => handleRemoveClick(topping)}>
          remove
        </button>
        <button onClick={() => handleAddClick(topping)}>
          add
        </button>
      </>
    ) : (
      <button onClick={() => handleAddClick(topping)}>
        add
      </button>
    )}
  </>
)}

            </span>
            {!isToppingInPizza(topping) && (
              <>
                <span className="quantity">
                  Quantity: {toppingQuantities[topping.name]}
                </span>
                <button onClick={() => handleAddClick(topping)}>add</button>
              </>
            )}
          </li>
        ))}
    </ul>
  );
}

export default ToppingsList;
