import React from "react";
import { Pizza } from "../SharedTypes";
import "./PizzaItem.scss";

interface PizzaItemProps {
  pizza: Pizza;
  onCustomize: (pizza: Pizza) => void;
}

const PizzaItem: React.FC<PizzaItemProps> = ({ pizza, onCustomize }) => (
  <div className="wrapper">
    <div className="container">
      <div className="contentWrapper">
        
      <div className="img-container">
        {pizza.image ? (
          <img src={pizza.image} alt={pizza.name} />
        ) : (
          <div className="placeholder-image"></div>
        )}
      </div>
      <div className="text-container">
        <h2>{pizza.name}</h2>
        <p>{pizza.description}</p>
        <button onClick={() => onCustomize(pizza)} className="addPizza">Add Pizza</button>
        </div>
      </div>
    </div>
  </div>
);

export default PizzaItem;
