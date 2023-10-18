// PizzaList.tsx
import { useState } from "react";
import { useQuery } from "@apollo/client";
import ListAllPizzas from "./ListAllPizzas";
import Modal from "./UI-Liberary/Modal";
import {
  GET_ALL_PIZZAS_LIST,
  GET_PIZZAS_WITH_SIZES_AND_PRICES,
} from "../queries/queries";

function PizzaList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState<any>(null); // Use 'any' type for now
  const { loading, error, data } = useQuery(GET_ALL_PIZZAS_LIST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const openModal = (pizza: any) => {
    setSelectedPizza(pizza);
    setIsModalOpen(true);
  };

  return (
    <div>
      <h2>Pizza List</h2>
      <ul>
        {data.getAllPizzasList.map((pizza: any) => (
          <li key={pizza.id_pizza}>
            <h3>{pizza.name}</h3>
            <img
              src={pizza.image}
              alt={pizza.name}
              width="250px"
              height="250px"
            />
            <p>{pizza.description}</p>
            <ListAllPizzas />
            <button onClick={() => openModal(pizza)}>Customize</button>
          </li>
        ))}
      </ul>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedPizza && (
          <>
            <h2>Customize Your Pizza</h2>
            <p>Name: {selectedPizza.name}</p>
            <img
              src={selectedPizza.image}
              alt={selectedPizza.name}
              width="250px"
              height="250px"
            />
            <ListAllPizzas />
          </>
        )}
      </Modal>
    </div>
  );
}

export default PizzaList;
