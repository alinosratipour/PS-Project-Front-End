import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Modal from "../components/UI-Liberary/Modal";
import ListToppingAndPrices from "./ListToppingAndPrices";
import Basket from "./Basket";
import { Pizza, BasketItem, ToppingType } from "./SharedTypes";
import { GET_ALL_PIZZAS_LIST } from "../queries/queries";

import useToppings from "./hooks/ToppingsHook"; // Import the useToppings hook
import useQuantity from "./hooks/useQuantityHook";
import useAddToBasket from "./hooks/useAddToBasketHook";
import PizzaItem from "./PizzaItem";

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
    setIsModalOpen, // Pass setIsModalOpen
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
          <>
            <h2>{selectedPizza.name}</h2>
            <p>{selectedPizza.description}</p>
            <img
              src={selectedPizza.image}
              alt={selectedPizza.name}
              width="250px"
              height="250px"
            />
            <ListToppingAndPrices
              pizzaId={selectedPizza.id_pizza}
              onSizePriceChange={(price, size) => {
                setSelectedSize(size);
                setSelectedSizePrice(price);
              }}
              onBaseChange={(base, basePrice) => {
                setSelectedBase(base);
                setSelectedBasePrice(basePrice);
              }}
              onAddTopping={addToppingToBasket}
              onRemoveTopping={removeToppingFromBasket}
            />
            <button
              onClick={() =>
                addToBasket(
                  selectedPizza,
                  selectedSize || "",
                  selectedBase || ""
                )
              }
              disabled={
                selectedSize === undefined || selectedBase === undefined
              }
            >
              Add to Basket
            </button>
          </>
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
