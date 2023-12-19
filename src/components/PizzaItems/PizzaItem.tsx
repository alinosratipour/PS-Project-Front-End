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
      <Card title={pizza.name} imageSrc={pizza.image}>
        <p className="ContainerText">{pizza.description}</p>
        <div className="ButtonContainer">
          <Button
            size="lg"
            onClick={() => onAddPizza(pizza)}
            fontSize="1.2"
            colorscheme="primary"
          >
            Add Pizza
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default PizzaItem;
