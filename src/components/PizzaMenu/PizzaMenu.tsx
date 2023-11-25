import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Modal from "../UI-Liberary/Modal/Modal";
import Basket from "../Basket/Basket";
import AddPizzaModal from "../AddPizza/AddPizzaModal";
import PizzaItem from "../PizzaItems/PizzaItem";
import { Pizza, BasketItem, ToppingType } from "../SharedTypes";
import { GET_ALL_PIZZAS_LIST } from "../../queries/queries";
import useToppings from "../hooks/ToppingsHook";
import useQuantity from "../hooks/useQuantityHook";
import useAddToBasket from "../hooks/useAddToBasketHook";
import "./PizzaMenu.scss";

const PizzaMenu = () => {
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

  const { addToBasket, calculateTotalPrice } = useAddToBasket({
    basket,
    setBasket,
    setIsModalOpen,
    selectedSizePrice,
    selectedBasePrice,
    selectedToppings,
    setSelectedToppings,
    setToppingsTotal,
  });

  const openAddPizzaModal = (pizza: Pizza | null) => {
    setSelectedPizza(pizza);
    setSelectedSize(undefined);
    setIsModalOpen(true);
  };

  if (loading) {
    return <p>Loading Pizzas...</p>; // Render a loading indicator while data is being fetched
  }

  if (error) {
    return <p>Error fetching data</p>; // Render an error message if there's an issue with the query
  }

  return (
    <div>
      <div className="pizza-menu-container">
        <div className="pizza-items-container">
          {data &&
            data.getAllPizzasList.map((pizza) => (
              <PizzaItem
                key={pizza.id_pizza}
                pizza={pizza}
                onAddPizza={openAddPizzaModal}
              />
            ))}
        </div>
        <div className="basket-container">
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
      </div>
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
    </div>
  );
};

export default PizzaMenu;
