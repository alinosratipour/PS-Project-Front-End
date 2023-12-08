import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import Modal from "../UI-Liberary/Modal/Modal";
import Basket from "../Basket/Basket";
import AddPizzaModal from "../AddPizza/AddPizzaModal";
import PizzaItem from "../PizzaItems/PizzaItem";
import { Pizza } from "../SharedTypes";
import { GET_ALL_PIZZAS_LIST } from "../../queries/queries";
import useAddToBasket from "../hooks/useAddToBasketHook";
import { useLoadingContext } from "../Context/LoadingContext";

import "./PizzaMenu.scss";
import useSize from "../hooks/StateHooks/useSize";
import { useToppingsStore } from "../store/SelectedToppingsStore";
import { useToppings } from "../Context/selectedTopping";

const PizzaMenu = () => {
  const [localLoading, setLocalLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);
  const { loading: globalLoading, setLoading } = useLoadingContext();
  const { toppingsTotal } = useToppingsStore();
  const { selectedToppings, setSelectedToppings, setToppingsTotal } =
    useToppings();
  const { selectedSize, setSelectedSize } = useSize();

  useEffect(() => {
    setSelectedToppings([]);
    setToppingsTotal(0);
  }, [selectedSize]);

  const {
    addToBasket,
    calculateTotalPrice,
    setRemovedToppings,
    removedToppings,
    basket,
    setBasket,
    setSelectedBasePrice,
    setSelectedSizePrice,
  } = useAddToBasket({
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
            setSelectedBasePrice={setSelectedBasePrice}
            addToBasket={addToBasket}
            selectedSize={selectedSize}
            setIsModalOpen={setIsModalOpen}
            removedToppings={removedToppings}
            setRemovedToppings={setRemovedToppings}
          />
        )}
      </Modal>
    </div>
  );
};

export default PizzaMenu;
