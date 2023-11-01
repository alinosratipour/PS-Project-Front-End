import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Modal from "../components/UI-Liberary/Modal";
import { GET_ALL_PIZZAS_LIST } from "../queries/queries";
import ListToppingAndPrices from "./ListToppingAndPrices";
import Basket from "./Basket";
import { Pizza, BasketItem } from "./SharedTypes";

function PizzaList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [selectedSizePrice, setSelectedSizePrice] = useState<number | undefined>(0);
  const [selectedSizeName, setSelectedSizeName] = useState<string | undefined>("");
  const [sizeSelected, setSizeSelected] = useState(false);
  const [errors, setErrors] = useState<string>("");

  const { loading, error, data } = useQuery<{ getAllPizzasList: Pizza[] }>(
    GET_ALL_PIZZAS_LIST
  );

  const openModal = (pizza: Pizza) => {
    setSelectedPizza(pizza);
    setIsModalOpen(true);
    setSizeSelected(false);
    setErrors(""); // Reset any previous error messages
  };

  const addToBasket = (pizza: Pizza) => {
    if (selectedSizeName !== undefined) {
      // Proceed with adding to the basket
      const existingItemIndex = basket.findIndex(
        (item) =>
          item.id_pizza === pizza.id_pizza && item.price === selectedSizePrice
      );

      if (existingItemIndex !== -1) {
        const updatedBasket = [...basket];
        updatedBasket[existingItemIndex].quantity += 1;
        setBasket(updatedBasket);
      } else {
        const pizzaWithPrice = {
          id_pizza: pizza.id_pizza,
          name: pizza.name,
          price: selectedSizePrice || 0,
          quantity: 1,
          size: selectedSizeName,
        };

        setBasket([...basket, pizzaWithPrice]);
      }
    } else {
      // Display an error message
      setErrors("Please select a size before adding the item to the basket.");
    }
  };

  const calculateTotalPrice = () => {
    return basket.reduce(
      (total, item) => (item.price || 0) * item.quantity + total,
      0
    );
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
      if (
        item.id_pizza === basketItem.id_pizza &&
        item.price === basketItem.price
      ) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return null as unknown as BasketItem;
      }
      return item;
    });

    setBasket(updatedBasket.filter((item) => item !== null));
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
              onSizePriceChange={(price, sizeName) => {
                setSelectedSizePrice(price);
                setSelectedSizeName(sizeName);
                setSizeSelected(sizeName !== "--Please Select Size--" );
                setErrors(""); // Reset any previous error messages
           
              }}
            />
            {errors && <p className="error">{errors}</p>}
            <button
              onClick={() => addToBasket(selectedPizza)}
              disabled={!sizeSelected}
            >
              Add to Basket
            </button>
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
