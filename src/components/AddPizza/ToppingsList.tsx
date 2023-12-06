import { ToppingType } from "../SharedTypes";
import classnames from "classnames";
import "./ToppingsList.scss";
import { useState } from "react";

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

  const isToppingInBasket = (topping: ToppingType) =>
    selectedToppings && selectedToppings.some((t) => t.name === topping.name);

  const isToppingInPizza = (topping: ToppingType) => {
    return (
      pizzaToppings &&
      pizzaToppings.some(
        (t) => t.toppings && t.toppings.name === topping.name
      )
    );
  };

  const handleRemoveClick = (topping: ToppingType) => {
    onRemoveTopping(topping);

    // Add the topping to selectedPizzaToppings
    setSelectedPizzaToppings((prev) => [...prev, topping]);
  };

  return (
    <ul>
      {availableToppings &&
        availableToppings.map((topping, index) => (
          <li key={index}>
            <span
              className={classnames('topping-name', {
                'in-pizza': isToppingInPizza(topping),
                'in-basket': isToppingInBasket(topping),
              })}
            >
              {topping.name}: £{topping.price}
            </span>
            {isToppingInPizza(topping) ? (
              <>
                <button onClick={() => handleRemoveClick(topping)}>
                  remove
                </button>
                {selectedPizzaToppings.includes(topping) && (
                  <button onClick={() => onAddTopping(topping)}>add</button>
                )}
              </>
            ) : (
              <button onClick={() => onAddTopping(topping)}>add</button>
            )}
          </li>
        ))}
    </ul>
  );
}

export default ToppingsList;
