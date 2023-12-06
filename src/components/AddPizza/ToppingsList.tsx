import { ToppingType } from "../../components/SharedTypes";
import { useState } from "react";
import classnames from "classnames"; // Import classnames package
import "./ToppingsList.scss";

interface ToppingsListProps {
  onAddTopping: (topping: ToppingType) => void;
  onRemoveTopping: (topping: ToppingType) => void;
  availableToppings?: ToppingType[] | undefined;
  refetchToppings?: (idSize: number) => Promise<void>;
  selectedToppings?: ToppingType[];
}
function ToppingsList({
  availableToppings,
  selectedToppings,
  onAddTopping,
  onRemoveTopping,
}: ToppingsListProps) {
  const [toppingQuantities, setToppingQuantities] = useState<{
    [key: string]: number;
  }>({});

  const isToppingInBasket = (topping: ToppingType) =>
    selectedToppings && selectedToppings.some((t) => t.name === topping.name);

  const handleAddClick = (topping: ToppingType) => {
    onAddTopping(topping);

    // Update topping quantity
    setToppingQuantities((previousToppingQuantities) => {
      const currentQuantity = previousToppingQuantities[topping.name] || 0;

      // Check if the quantity is less than 10 before incrementing
      const newQuantity =
        currentQuantity < 10 ? currentQuantity + 1 : currentQuantity;

      return {
        ...previousToppingQuantities,
        [topping.name]: newQuantity,
      };
    });
  };

  const handleRemoveClick = (topping: ToppingType) => {
    onRemoveTopping(topping);

    // Update topping quantity
    setToppingQuantities((previousToppingQuantities) => ({
      ...previousToppingQuantities,
      [topping.name]: Math.max(
        (previousToppingQuantities[topping.name] || 0) - 1,
        0
      ),
    }));
  };

  return (
    <ul>
      {availableToppings &&
        availableToppings.map((topping, index) => (
          <li
            key={index}
            className={classnames({
              "in-Basket": isToppingInBasket(topping),
              "in-ToppingList": toppingQuantities[topping.name] > 0,
              "in-Default": toppingQuantities[topping.name] === 0,
              "in-Green": toppingQuantities[topping.name] === 1,
            })}
          >
            <span>
              {topping.name}: £{topping.price}
              {toppingQuantities[topping.name] > 0 && (
                <span>({toppingQuantities[topping.name]})</span>
              )}
            </span>

            {(isToppingInBasket(topping) && (
              <>
                <button onClick={() => handleRemoveClick(topping)}>
                  remove
                </button>
                <button onClick={() => handleAddClick(topping)}>add</button>
              </>
            )) ||
              (toppingQuantities[topping.name] > 0 ? (
                <>
                  <button onClick={() => handleRemoveClick(topping)}>
                    remove
                  </button>
                  <button onClick={() => handleAddClick(topping)}>add</button>
                </>
              ) : (
                <button onClick={() => handleAddClick(topping)}>add</button>
              ))}
          </li>
        ))}
    </ul>
  );
}

export default ToppingsList;
