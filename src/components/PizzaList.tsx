import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Modal from "../components/UI-Liberary/Modal";
import { GET_ALL_PIZZAS_LIST } from "../queries/queries";
import ListToppingAndPrices from "./ListToppingAndPrices";
import Basket from "./Basket";
import { Pizza, SizePriceProps,BasketItem } from "./SharedTypes";

// interface BasketItem {
//   id_pizza: number;
//   name: string;
//   price: number | undefined;
//   quantity: number;
//   size: string; // Add a size property
// }

function PizzaList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [selectedSize, setSelectedSize] = useState<SizePriceProps | null>(null);
  const [selectedSizePrice, setSelectedSizePrice] = useState<number | undefined>(0);
  const { loading, error, data } = useQuery<{ getAllPizzasList: Pizza[] }>(
    GET_ALL_PIZZAS_LIST
  );

  const openModal = (pizza: Pizza) => {
    setSelectedPizza(pizza);
    setIsModalOpen(true);
  };

  const addToBasket = (pizza: Pizza) => {
    // Check if an item with the same id_pizza and selectedSizePrice exists in the basket
    const existingItemIndex = basket.findIndex(
      (item) =>
        item.id_pizza === pizza.id_pizza && item.price === selectedSizePrice
    );
  
    if (existingItemIndex !== -1) {
      // If the item is already in the basket, increase its quantity
      const updatedBasket = [...basket];
      updatedBasket[existingItemIndex].quantity += 1;
      setBasket(updatedBasket);
    } else {
      // If it's not in the basket, add it as a new item with a quantity of 1
      const pizzaWithPrice = {
        id_pizza: pizza.id_pizza,
        name: pizza.name,
        price: selectedSizePrice || 0,
        quantity: 1,
      };
      setBasket([...basket, pizzaWithPrice]);
    }
  };
  
  const calculateTotalPrice = () => {
    return basket.reduce((total, item) => (item.price || 0) * item.quantity + total, 0);
  };

  const increaseQuantity = (basketItem: BasketItem) => {
    const updatedBasket = basket.map((item) => {
      if (
        item.id_pizza === basketItem.id_pizza &&
        item.price === basketItem.price
      ) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setBasket(updatedBasket);
  };
  

  const decreaseQuantity = (basketItem: BasketItem) => {
    const updatedBasket = basket.map((item) => {
      if (item.id_pizza === basketItem.id_pizza && item.price === basketItem.price) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    });
    setBasket(updatedBasket.filter((item) => item.quantity > 0));
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
              onSizePriceChange={(price) => setSelectedSizePrice(price)}
            />
            <button onClick={() => addToBasket(selectedPizza)}>Add to Basket</button>
          </>
        )}
      </Modal>

      <Basket
        basket={basket}
        selectedSizePrice={calculateTotalPrice()}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
      />
    </div>
  );
}

export default PizzaList;
