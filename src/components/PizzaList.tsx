import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Modal from "../components/UI-Liberary/Modal";
import { GET_ALL_PIZZAS_LIST } from "../queries/queries";
import ListToppingAndPrices from "./ListToppingAndPrices";
import Basket from "./Basket";
import { Pizza, BasketItem,ToppingType } from "./SharedTypes";

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

  const openModal = (pizza: Pizza) => {
    setSelectedPizza(pizza);
    setSelectedSize(undefined); // Deselect size when opening the modal
    setIsModalOpen(true);
  };


  
  
 
  const addToppingToBasket = (topping: ToppingType) => {
    const existingToppingIndex = selectedToppings.findIndex(
      (t) => t.name === topping.name
    );
  
    if (existingToppingIndex !== -1) {
      // Topping already exists, update its quantity
      const updatedToppings = [...selectedToppings];
      if (updatedToppings[existingToppingIndex].quantity < 10) {
        updatedToppings[existingToppingIndex].quantity += 1;
        setSelectedToppings(updatedToppings);
  
        // Update toppingsTotal directly
        setToppingsTotal(calculateToppingsTotal(updatedToppings));
      }
    } else {
      // Topping doesn't exist, add it with quantity 1
      const newToppings = [...selectedToppings, { ...topping, quantity: 1 }];
      setSelectedToppings(newToppings);
  
      // Update toppingsTotal directly
      setToppingsTotal(calculateToppingsTotal(newToppings));
    }
  };
  
  
  const calculateToppingsTotal = (toppings: ToppingType[]) => {
    const total = toppings.reduce(
      (total, topping) => total + topping.price * (topping.quantity || 1),
      0
    );
    console.log("Intermediate toppingsTotal:", total);
    return total;
  };

  const removeToppingFromBasket = (topping: ToppingType) => {
    setSelectedToppings((prevToppings) => {
      const updatedToppings = prevToppings.filter((t: ToppingType) => t !== topping);
      // Update toppingsTotal directly
      setToppingsTotal(calculateToppingsTotal(updatedToppings));
      return updatedToppings;
    });
  };
  

  const addToBasket = (pizza: Pizza) => {
    if (selectedSize !== undefined) {
      // Proceed with adding to the basket
      console.log("basket", basket);

      const existingItemIndex = basket.findIndex(
        (item) =>
          item.id_pizza === pizza.id_pizza &&
          item.size === selectedSize &&
          item.base === selectedBase
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
          size: selectedSize,
          base: selectedBase,
          basePrice: selectedBasePrice,
        };

        setBasket([...basket, pizzaWithPrice]);
      }
    }
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

  const calculateTotalPrice = () => {
    return basket.reduce(
      (total, item) =>
        (item.price || 0) * item.quantity +
        (item.basePrice || 0) * item.quantity +
        total,
      0
    );
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

      />
    </div>
  );
}

export default PizzaList;
