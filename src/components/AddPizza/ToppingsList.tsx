import { ToppingType } from "../SharedTypes";

interface ToppingsListProps {
  //toppingData?: ToppingType[] | undefined;
  onAddTopping: (topping: ToppingType) => void;
  onRemoveTopping: (topping: ToppingType) => void;
  availableToppings?: ToppingType[] | undefined;
  refetchToppings?: (idSize: number) => Promise<void>; // Add this line
  selectedToppings?: ToppingType[];
}

function ToppingsList({
  availableToppings,
  selectedToppings,
  // toppingData,
  onAddTopping,
  onRemoveTopping,
}: ToppingsListProps) {
  const isToppingInBasket = (topping: ToppingType) =>
    selectedToppings && selectedToppings.some((t) => t.name === topping.name);

  return (
    <ul>
      {availableToppings &&
        availableToppings.map((topping, index) => (
          <li
            key={index}
            style={isToppingInBasket(topping) ? { color: "red" } : {}}
          >
            {topping.name}: £{topping.price}
            <button onClick={() => onAddTopping(topping)}>add</button>
            <button onClick={() => onRemoveTopping(topping)}>remove</button>
          </li>
        ))}
    </ul>
  );
}

export default ToppingsList;
