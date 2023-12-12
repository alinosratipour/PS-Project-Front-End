import React from "react";
import { Pizza } from "../SharedTypes";
import "./PizzaItem.scss";
import Button from "../UI-Liberary/Button/Button";
import Card from "../UI-Liberary/Card/Card";

interface PizzaItemProps {
  pizza: Pizza;
  onAddPizza: (pizza: Pizza) => void;
}

const PizzaItem: React.FC<PizzaItemProps> = ({ pizza, onAddPizza }) => {
  return (
     <div className="container">
      <Card title={pizza.name} imageSrc={pizza.image} imageHeight={300} imageWidth={300} >
        <p className="container__text">{pizza.description}</p>
        <div className="button-Container">
            <Button size="lg" onClick={() => onAddPizza(pizza)} fontSize="1.2">
          Add Pizza
        </Button>
        </div>
      
      </Card>
     </div>
      
    
  );
};

export default PizzaItem;
