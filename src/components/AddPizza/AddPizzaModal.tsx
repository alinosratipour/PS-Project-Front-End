// PizzaModalContent.js
import React from "react";
import PizzaOptionsContainer from "./PizzaOptionsContainer";
import { Pizza, ToppingType } from "../SharedTypes";

interface AddPizzaModalProps {
  selectedPizza: Pizza;
  setSelectedSize: (size: string | undefined) => void;
  setSelectedSizePrice: (price: number | undefined) => void;
  setSelectedBase: (base: string | undefined) => void;
  setSelectedBasePrice: (basePrice: number | undefined) => void;
  addToppingToBasket: (topping: ToppingType) => void;
  removeToppingFromBasket: (topping: ToppingType) => void;
  addToBasket: (pizza: Pizza, size: string, base: string) => void;
  selectedSize: string | undefined;
  selectedBase: string | undefined;
}

const AddPizzaModal: React.FC<AddPizzaModalProps> = ({
  selectedPizza,
  setSelectedSize,
  setSelectedSizePrice,
  setSelectedBase,
  setSelectedBasePrice,
  addToppingToBasket,
  removeToppingFromBasket,
  addToBasket,
  selectedSize,
  selectedBase,
}) => (
  <>
  <div className="addPizzaContainer">
    <h2>{selectedPizza.name}</h2>
    <p>{selectedPizza.description}</p>
    <div className="img-container">
       <img
      src={selectedPizza.image}
      alt={selectedPizza.name}
    
    />
    </div>
   
    </div>
    <PizzaOptionsContainer
      pizzaId={selectedPizza.id_pizza}
      onSizePriceChange={(price, size) => {
        setSelectedSize(size);
        setSelectedSizePrice(price);
      }}
      onBaseChange={(base, basePrice) => {
        setSelectedBase(base);
        setSelectedBasePrice(basePrice);
      }}
      onAddTopping={addToppingToBasket}
      onRemoveTopping={removeToppingFromBasket}
    />
    <button
      onClick={() =>
        addToBasket(selectedPizza, selectedSize || "", selectedBase || "")
      }
      disabled={selectedSize === undefined || selectedBase === undefined}
    >
      Add to Basket
    </button>
  </>
);

export default AddPizzaModal;
