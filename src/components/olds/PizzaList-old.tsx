import React from "react";
import { useQuery } from "@apollo/client";
import Modal from "../components/UI-Liberary/Modal";
import { GET_ALL_PIZZAS_LIST } from "../queries/queries";
import ListToppingAndPrices from "./ListToppingAndPrices";
import Basket from "./Basket";
import { Pizza, BasketItem, ToppingType } from "./SharedTypes";
import { calculateToppingsTotal } from "./utils";

function PizzaList() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedPizza, setSelectedPizza] = React.useState<Pizza | null>(null);
  const [basket, setBasket] = React.useState<BasketItem[]>([]);
  const [selectedSize, setSelectedSize] = React.useState<string | undefined>(
    undefined
  );
  const [selectedBase, setSelectedBase] = React.useState<string | undefined>(
    undefined
  );
  const [selectedSizePrice, setSelectedSizePrice] = React.useState<
    number | undefined
  >(0);
  const [selectedBasePrice, setSelectedBasePrice] = React.useState<
    number | undefined
  >(0);
  const [selectedToppings, setSelectedToppings] = React.useState<ToppingType[]>(
    []
  );
  const [toppingsTotal, setToppingsTotal] = React.useState<number>(0);

  const { loading, error, data } = useQuery<{ getAllPizzasList: Pizza[] }>(
    GET_ALL_PIZZAS_LIST
  );

  React.useEffect(() => {
    setSelectedToppings([]);
    setToppingsTotal(0);
  }, [selectedSize]);

  const openModal = (pizza: Pizza | null) => {
    setSelectedPizza(pizza);
    setSelectedSize(undefined);
    setIsModalOpen(true);
  };

  const addToppingToBasket = (topping: ToppingType) => {
    const existingToppingIndex = selectedToppings.findIndex(
      (t) => t.name === topping.name
    );

    if (existingToppingIndex !== -1) {
      const updatedToppings = [...selectedToppings];
      if (updatedToppings[existingToppingIndex].quantity < 10) {
        updatedToppings[existingToppingIndex].quantity += 1;
        setSelectedToppings(updatedToppings);
        setToppingsTotal(calculateToppingsTotal(updatedToppings));
      }
    } else {
      const newToppings = [...selectedToppings, { ...topping, quantity: 1 }];
      setSelectedToppings(newToppings);
      setToppingsTotal(calculateToppingsTotal(newToppings));
    }
  };

  const removeToppingFromBasket = (topping: ToppingType) => {
    setSelectedToppings((prevToppings) => {
      const updatedToppings = prevToppings
        .map((t: ToppingType) =>
          t.name === topping.name ? { ...t, quantity: t.quantity - 1 } : t
        )
        .filter((t: ToppingType) => t.quantity > 0);

      setToppingsTotal(calculateToppingsTotal(updatedToppings));

      return updatedToppings;
    });
  };

  const addToBasket = (pizza: Pizza) => {
    if (selectedSize !== undefined) {
      // ... (existing code)

      const pizzaWithPrice = {
        id_pizza: pizza.id_pizza,
        name: pizza.name,
        price: selectedSizePrice || 0,
        quantity: 1,
        size: selectedSize,
        base: selectedBase,
        basePrice: selectedBasePrice,
        toppings: selectedToppings,
        toppingsTotal: calculateToppingsTotal(selectedToppings), // Add toppingsTotal
      };

      setBasket([...basket, pizzaWithPrice]);
      setIsModalOpen(false);
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
    const pizzasTotalPrice = basket.reduce((total, item) => {
      const pizzaPrice =
        (item.price || 0) * item.quantity +
        (item.basePrice || 0) * item.quantity +
        (item.toppingsTotal || 0) * item.quantity;

      return total + pizzaPrice; // Only add the pizza price for each iteration
    }, 0);

    const totalPrice = pizzasTotalPrice; // Remove toppingsTotalPrice from the overall total

    return Number(totalPrice.toFixed(2));
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