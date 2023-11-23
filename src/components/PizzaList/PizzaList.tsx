import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Modal from "../UI-Liberary/Modal";
import Basket from "../Basket";
import AddPizzaModal from "./AddPizzaModal";
import PizzaItem from "./PizzaItem";
import { Pizza, BasketItem, ToppingType } from "../SharedTypes";
import { GET_ALL_PIZZAS_LIST } from "../../queries/queries";
import useToppings from "../hooks/ToppingsHook";
import useQuantity from "../hooks/useQuantityHook";
import useAddToBasket from "../hooks/useAddToBasketHook";

function PizzaList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    undefined
  );
  const [selectedBase, setSelectedBase] = useState<string | undefined>(
    undefined
  );
  const [selectedSizePrice, setSelectedSizePrice] = useState<
    number | undefined
  >(0);
  const [selectedBasePrice, setSelectedBasePrice] = useState<
    number | undefined
  >(0);
  const [selectedToppings, setSelectedToppings] = useState<ToppingType[]>([]);
  const [toppingsTotal, setToppingsTotal] = useState<number>(0);

  const { loading, error, data } = useQuery<{ getAllPizzasList: Pizza[] }>(
    GET_ALL_PIZZAS_LIST
  );

  const { addToppingToBasket, removeToppingFromBasket } = useToppings({
    selectedToppings,
    setSelectedToppings,
    setToppingsTotal,
  });

  const { increaseQuantity, decreaseQuantity } = useQuantity(basket, setBasket);

  useEffect(() => {
    setSelectedToppings([]);
    setToppingsTotal(0);
  }, [selectedSize]);

  const { addToBasket } = useAddToBasket({
    basket,
    setBasket,
    setIsModalOpen,
    selectedSizePrice,
    selectedBasePrice,
    selectedToppings,
    setSelectedToppings,
    setToppingsTotal,
  });

  const openModal = (pizza: Pizza | null) => {
    setSelectedPizza(pizza);
    setSelectedSize(undefined);
    setIsModalOpen(true);
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

  return (
    <div>
      <ul>
        {data &&
          data.getAllPizzasList.map((pizza) => (
            <PizzaItem
              key={pizza.id_pizza}
              pizza={pizza}
              onCustomize={openModal}
            />
          ))}
      </ul>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedPizza && (
          <AddPizzaModal
            selectedPizza={selectedPizza}
            setSelectedSize={setSelectedSize}
            setSelectedSizePrice={setSelectedSizePrice}
            setSelectedBase={setSelectedBase}
            setSelectedBasePrice={setSelectedBasePrice}
            addToppingToBasket={addToppingToBasket}
            removeToppingFromBasket={removeToppingFromBasket}
            addToBasket={addToBasket}
            selectedSize={selectedSize}
            selectedBase={selectedBase}
          />
        )}
      </Modal>
      <Basket
        basket={basket}
        calculateTotalPrice={calculateTotalPrice}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        selectedToppings={selectedToppings}
        toppingsTotal={toppingsTotal}
        setBasket={setBasket}
        onBasketToppingsChange={(updatedToppings) =>
          setSelectedToppings(updatedToppings)
        }
        onBasketToppingsTotalChange={(total) => setToppingsTotal(total)}
      />
    </div>
  );
}

export default PizzaList;
