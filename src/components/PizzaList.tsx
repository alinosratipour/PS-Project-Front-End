// PizzaList.tsx
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Modal from "../components/UI-Liberary/Modal";
import { GET_ALL_PIZZAS_LIST } from "../queries/queries";
import ListToppingAndPrices from "./ListToppingAndPrices";
import Basket from "./Basket";
import { Pizza,SizePriceProps } from "./SharedTypes"; // Import the shared type
import SizePrice from "./SizePrice";
// interface Pizza {
//   id_pizza: number;
//   name: string;
//   description: string;
//   image: string;
//   price: number;
// }
interface BasketItem {
  id_pizza: number;
  name: string;
  price: number | undefined;
  quantity: number; // Add quantity property
}
function PizzaList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);
  const [basket, setBasket] = useState<BasketItem[]>([]);  // State to manage the basket
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
    const existingItemIndex = basket.findIndex((item) => item.id_pizza === pizza.id_pizza);
  
    if (existingItemIndex !== -1) {
      // If the item is already in the basket, increase its quantity
      const updatedBasket = [...basket];
      updatedBasket[existingItemIndex].quantity += 1;
      setBasket(updatedBasket);
    } else {
      // If it's not in the basket, add it with a quantity of 1
      const pizzaWithPrice = { ...pizza, price: selectedSizePrice || 0, quantity: 1 };
      setBasket([...basket, pizzaWithPrice]);
    }
  };
  
  
  // const removeFromBasket = (basketItem: BasketItem) => {
  //   const updatedItems = basket.filter((item) => item.id_pizza !== basketItem.id_pizza);
  //   setBasket(updatedItems);
  // };

const calculateTotalPrice = () => {
  return basket.reduce((total, pizza) => total + (pizza.price || 0), 0);
};

const increaseQuantity = (basketItem: BasketItem) => {
  const updatedBasket = basket.map((item) => {
    if (item.id_pizza === basketItem.id_pizza) {
      return { ...item, quantity: item.quantity + 1 };
    }
    return item;
  });
  setBasket(updatedBasket);
};

const decreaseQuantity = (basketItem: BasketItem) => {
  if (basketItem.quantity > 1) {
    const updatedBasket = basket.map((item) => {
      if (item.id_pizza === basketItem.id_pizza) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setBasket(updatedBasket);
  }
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
      
      <Basket basket={basket} selectedSizePrice={calculateTotalPrice()} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />
    </div>
  );
}

export default PizzaList;
