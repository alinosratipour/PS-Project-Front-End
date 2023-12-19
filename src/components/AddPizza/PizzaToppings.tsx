import { useQuery } from "@apollo/client";
import { GET_TOPPINGS_ON_PIZZA } from "../../queries/queries";
import "./PizzaToppings.scss";
import classNames from "classnames";
import { ToppingsData, ToppingType } from "../SharedTypes";
import { useToppingsRemovalFromPizza } from "../store/ToppingOnPizzaStore ";
import { useToppings } from "../Context/selectedTopping";


interface PizzaToppingsProps {
  pizzaId: number;
}

const PizzaToppings: React.FC<PizzaToppingsProps> = ({ pizzaId }) => {
  const { data, loading, error } = useQuery<ToppingsData>(
    GET_TOPPINGS_ON_PIZZA,
    {
      variables: { id_pizza: pizzaId },
    }
  );

  const { removedToppings, setRemovedToppings } = useToppingsRemovalFromPizza();
  const { selectedToppings } = useToppings();

  const handleToppingClick = (toppingId: number, toppingName: string) => {
    setRemovedToppings((prevRemoved: ToppingType[]) => {
      const existingTopping = prevRemoved.find((t) => t.id === toppingId);

      if (existingTopping) {
        // Topping is already removed, so undo removal
        return prevRemoved.filter((t) => t.id !== toppingId);
      } else {
        // Topping is not removed, so add to removedToppings
        return [
          ...prevRemoved,
          {
            id: toppingId,
            name: toppingName,
            id_size: 0,
            price: 0,
            quantity: 0,
          },
        ];
      }
    });
  };
  if (loading) return <p>Loading toppings...</p>;
  if (error) return <p>Error fetching toppings: {error.message}</p>;

  const toppingsOnPizza = data?.getToppingsOnPizza || [];

  return (
    <div className="topping-container">
      {toppingsOnPizza.map((toppingOnPizza) => (
        <div
          key={toppingOnPizza.id}
          className={classNames("box", {
            selected: removedToppings.some((t) => t.id === toppingOnPizza.id),
          })}
          onClick={() =>
            handleToppingClick(toppingOnPizza.id, toppingOnPizza.toppings.name)
          }
        >
          {toppingOnPizza.toppings.name}
        </div>
      ))}
      {selectedToppings.map((extraToppings) => (
        <div
          key={extraToppings.id}
          className={classNames("box", {
            ExtraTopping: selectedToppings.length > 0, // Updated this line
          })}
          // onClick={() => removeToppingFromBasket(extraToppings)}
        >
          <span className="ExtraTopping">{extraToppings.name}</span>
          <span>{extraToppings.quantity}</span>
        </div>
      ))}
    </div>
  );
};

export default PizzaToppings;
