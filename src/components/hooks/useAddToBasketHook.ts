import { BasketItem, Pizza, ToppingType } from "../SharedTypes";
import { calculateToppingsTotal } from "../../utils";

interface UseAddToBasketProps {
  basket: BasketItem[];
  setBasket: React.Dispatch<React.SetStateAction<BasketItem[]>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>; // Pass setIsModalOpen
  selectedSizePrice?: number;
  selectedBasePrice?: number;
  selectedToppings: ToppingType[];
  setSelectedToppings: React.Dispatch<React.SetStateAction<ToppingType[]>>;
  setToppingsTotal: React.Dispatch<React.SetStateAction<number>>;
}

const useAddToBasket = ({
  basket,
  setBasket,
  setIsModalOpen, // Receive setIsModalOpen
  selectedSizePrice,
  selectedBasePrice,
  selectedToppings,
}: UseAddToBasketProps) => {
  const addToBasket = (pizza: Pizza, size: string, base: string) => {
    if (size !== undefined) {
      const existingPizzaIndex = basket.findIndex(
        (item) =>
          item.id_pizza === pizza.id_pizza &&
          item.size === size &&
          item.base === base
      );

      if (existingPizzaIndex !== -1) {
        // Pizza with the same size and base already exists, update quantity
        const updatedBasket = [...basket];
        updatedBasket[existingPizzaIndex].quantity += 1;
        setBasket(updatedBasket);
      } else {
        // Add a new pizza to the basket
        const pizzaWithPrice = {
          id_pizza: pizza.id_pizza,
          name: pizza.name,
          price: selectedSizePrice || 0,
          quantity: 1,
          size: size,
          base: base,
          basePrice: selectedBasePrice,
          toppings: selectedToppings,
          toppingsTotal: calculateToppingsTotal(selectedToppings),
        };

        setBasket([...basket, pizzaWithPrice]);
      }

      setIsModalOpen(false); // Use setIsModalOpen here
    }
  };

  const calculateTotalPrice = () => {
    const pizzasTotalPrice = basket.reduce((total, item) => {
      const pizzaPrice =
        (item.price || 0) * item.quantity +
        (item.basePrice || 0) * item.quantity +
        (item.toppingsTotal || 0) * item.quantity;

      return total + pizzaPrice;
    }, 0);

    return Number(pizzasTotalPrice.toFixed(2));
  };

  return { addToBasket, calculateTotalPrice };
};

export default useAddToBasket;
