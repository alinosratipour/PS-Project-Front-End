import React from "react";
import { Pizza } from "../SharedTypes";
import "./PizzaItem.scss";
import Button from "../UI-Liberary/Button/Button";

interface PizzaItemProps {
  pizza: Pizza;
  onAddPizza: (pizza: Pizza) => void;
}

const PizzaItem: React.FC<PizzaItemProps> = ({ pizza, onAddPizza }) => {
  return (
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

            <div className="addPizza">
              <Button size="lg" onClick={() => onAddPizza(pizza)} fontSize="1.2">
                Add Pizza
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaItem;
