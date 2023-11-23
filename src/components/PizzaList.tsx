// PizzaList.tsx
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Modal from "../components/UI-Liberary/Modal";
import ListToppingAndPrices from "./ListToppingAndPrices";
import Basket from "./Basket";
import { Pizza, BasketItem, ToppingType } from "./SharedTypes";
import { GET_ALL_PIZZAS_LIST } from "../queries/queries";
import { calculateToppingsTotal } from "./utils";
import useToppings from "./hooks/ToppingsHook"; // Import the useToppings hook
import useQuantity from "./hooks/useQuantityHook";

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
  const [selectedSizePrice, setSelectedSizePrice] = useState<number | undefined>(
    0
  );
  const [selectedBasePrice, setSelectedBasePrice] = useState<number | undefined>(
    0
  );
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
  const { increaseQuantity,decreaseQuantity } = useQuantity(basket, setBasket);
  useEffect(() => {
    setSelectedToppings([]);
    setToppingsTotal(0);
  }, [selectedSize]);

  const openModal = (pizza: Pizza | null) => {
    setSelectedPizza(pizza);
    setSelectedSize(undefined);
    setIsModalOpen(true);
  };

  const addToBasket = (pizza: Pizza) => {
    if (selectedSize !== undefined) {
      const pizzaWithPrice = {
        id_pizza: pizza.id_pizza,
        name: pizza.name,
        price: selectedSizePrice || 0,
        quantity: 1,
        size: selectedSize,
        base: selectedBase,
        basePrice: selectedBasePrice,
        toppings: selectedToppings,
        toppingsTotal: calculateToppingsTotal(selectedToppings),
      };

      setBasket([...basket, pizzaWithPrice]);
      setIsModalOpen(false);
    }
  };

  
  // const decreaseQuantity = (basketItem: BasketItem) => {
  //   const updatedBasket = basket.map((item) => {
  //     if (
  //       item.id_pizza === basketItem.id_pizza &&
  //       item.price === basketItem.price
  //     ) {
  //       if (item.quantity > 1) {
  //         return { ...item, quantity: item.quantity - 1 };
  //       }
  //       return null as unknown as BasketItem;
  //     }
  //     return item;
  //   });

  //   setBasket(updatedBasket.filter((item) => item !== null));
  // };

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
            <li key={pizza.id_pizza}>
              <img
                src={pizza.image}
                alt={pizza.name}
                width="250px"
                height="250px"
              />
              <h1>{pizza.name}</h1>
              <p>{pizza.description}</p>
              <button onClick={() => openModal(pizza)}>Customize</button>
            </li>
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
              onClick={() => addToBasket(selectedPizza)}
              disabled={selectedSize === undefined || selectedBase === undefined}
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
        onBaseChange={() => {}} // Add your implementation
        onSizeChange={() => {}} // Add your implementation
        onBasketToppingsChange={(updatedToppings) =>
          setSelectedToppings(updatedToppings)
        }
        onBasketToppingsTotalChange={(total) => setToppingsTotal(total)}
      />
    </div>
  );
}

export default PizzaList;
