// PizzaList.tsx

import { useState } from "react";
import { useQuery } from "@apollo/client";
import Modal from "../components/UI-Liberary/Modal";
import { GET_ALL_PIZZAS_LIST } from "../queries/queries";
import ListToppingAndPrices from "./ListToppingAndPrices";

interface Pizza {
  id_pizza: number;
  name: string;
  description: string;
  image: string;
}

function PizzaList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);

  const { loading, error, data } = useQuery<{ getAllPizzasList: Pizza[] }>(
    GET_ALL_PIZZAS_LIST
  );

  const openModal = (pizza: Pizza) => {
    setSelectedPizza(pizza);
    setIsModalOpen(true);
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
            <ListToppingAndPrices pizzaId={selectedPizza.id_pizza} />
          </>
        )}
      </Modal>
    </div>
  );
}

export default PizzaList;
