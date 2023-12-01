import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Modal from "../UI-Liberary/Modal/Modal";
import Basket from "../Basket/Basket";
import AddPizzaModal from "../AddPizza/AddPizzaModal";
import PizzaItem from "../PizzaItems/PizzaItem";
import { Pizza } from "../SharedTypes";
import { GET_ALL_PIZZAS_LIST } from "../../queries/queries";
import useAddToppings from "../hooks/useAddToppingsHook";
import useQuantity from "../hooks/useQuantityHook";
import useAddToBasket from "../hooks/useAddToBasketHook";
import useBasket from "../hooks/useBasket";
import { useLoadingContext } from "../Context/LoadingContext";
import useToppings from "../hooks/useToppings";
import "./PizzaMenu.scss";

const PizzaMenu = () => {
  const [localLoading, setLocalLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);
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

  const { loading: globalLoading, setLoading } = useLoadingContext();
  const { basket, setBasket } = useBasket();
  const {
    selectedToppings,
    setSelectedToppings,
    toppingsTotal,
    setToppingsTotal,
  } = useToppings();

  const { addToppingToBasket, removeToppingFromBasket } = useAddToppings({
    selectedToppings,
    setSelectedToppings,
    setToppingsTotal,
  });

  const { increaseQuantity, decreaseQuantity } = useQuantity(basket, setBasket);

  useEffect(() => {
    setSelectedToppings([]);
    setToppingsTotal(0);
  }, [selectedSize]);

  // Using useAddToBasket hook
  const { addToBasket, calculateTotalPrice } = useAddToBasket({
    basket,
    setBasket,
    selectedSizePrice,
    selectedBasePrice,
    selectedToppings,
  });

  const { error, data } = useQuery<{ getAllPizzasList: Pizza[] }>(
    GET_ALL_PIZZAS_LIST,
    {
      onCompleted: () => {
        setLocalLoading(false);
        setLoading(false);
      },
      onError: () => {
        setLocalLoading(false);
        setLoading(false);
      },
    }
  );

  const openAddPizzaModal = (pizza: Pizza | null) => {
    setSelectedPizza(pizza);
    setSelectedSize(undefined);
    setIsModalOpen(true);
  };

  if (globalLoading || localLoading) {
    return (
      <div className="loader-container">
        <p>Loading Pizzas...</p>
      </div>
    );
  }

  if (error) {
    return <p>Error fetching data</p>;
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
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </Modal>
    </div>
  );
};

export default PizzaMenu;
