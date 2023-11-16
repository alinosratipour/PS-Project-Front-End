import { ToppingType } from "./SharedTypes";

interface ToppingsListProps {
  toppingData: ToppingType[] | undefined;
  onAddTopping: (topping: ToppingType) => void;
  onRemoveTopping: (topping: ToppingType) => void;
}

function ToppingsList({
  toppingData,
  onAddTopping,
  onRemoveTopping,
}: ToppingsListProps) {
  return (
    <ul>
      {toppingData &&
        toppingData.map((topping, index) => (
          <li key={index}>
            {topping.name}: £{topping.price}
            <button onClick={() => onAddTopping(topping)}>add</button>
            <button onClick={() => onRemoveTopping(topping)}>remove</button>
          </li>
        ))}
    </ul>
  );
}

export default ToppingsList;
