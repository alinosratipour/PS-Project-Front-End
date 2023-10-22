// PizzaList.tsx
import { useState } from "react";
import { useQuery } from "@apollo/client";
import ListAllPizzas from "./ListAllPizzas";
import ListToppingAndPrices from "./ListToppingAndPrices";

import Modal from "./UI-Liberary/Modal";
import { GET_ALL_PIZZAS_LIST } from "../queries/queries";

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
      <ul>
        {data.getAllPizzasList.map((pizza: any) => (
          
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
            {/* <ListAllPizzas /> */}
            <ListToppingAndPrices pizzaId={selectedPizza.id_pizza}  />
          </>
        )}
      </Modal>
    </div>
  );
}

export default PizzaList;
