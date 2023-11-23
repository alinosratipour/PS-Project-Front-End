// PizzaItem.tsx
import React from "react";
import { Pizza } from "./SharedTypes";

interface PizzaItemProps {
  pizza: Pizza;
  onCustomize: (pizza: Pizza) => void;
}

const PizzaItem: React.FC<PizzaItemProps> = ({ pizza, onCustomize }) => (
  <li>
    <img src={pizza.image} alt={pizza.name} width="250px" height="250px" />
    <h1>{pizza.name}</h1>
    <p>{pizza.description}</p>
    <button onClick={() => onCustomize(pizza)}>Customize</button>
  </li>
);

export default PizzaItem;
