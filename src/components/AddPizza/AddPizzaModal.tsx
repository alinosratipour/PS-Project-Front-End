import React from "react";
import PizzaOptionsContainer from "./PizzaOptionsContainer";
import { Pizza, ToppingType } from "../SharedTypes";
import useBaseState from "../hooks/StateHooks/useBase";
import useAddToppings from "../hooks/useAddToppingsHook";

interface AddPizzaModalProps {
  selectedPizza: Pizza;
  setSelectedSize: (size: string | undefined) => void;
  setSelectedSizePrice: (price: number | undefined) => void;
  setSelectedBasePrice: (basePrice: number | undefined) => void;
  addToBasket: (pizza: Pizza, size: string, base: string) => void;
  selectedSize: string | undefined;
  setIsModalOpen: (isOpen: boolean) => void;
  removedToppings: ToppingType[];
  setRemovedToppings: React.Dispatch<React.SetStateAction<ToppingType[]>>;
}

const AddPizzaModal: React.FC<AddPizzaModalProps> = ({
  selectedPizza,
  setSelectedSize,
  setSelectedSizePrice,
  setSelectedBasePrice,
  addToBasket,
  selectedSize,
  setIsModalOpen,
  removedToppings: updatedRemovedToppings,
  setRemovedToppings,
}) => {
  const { selectedBase, setSelectedBase } = useBaseState();

  const { addToppingToBasket, removeToppingFromBasket } = useAddToppings();

  React.useEffect(() => {
    setRemovedToppings(updatedRemovedToppings);
  }, [updatedRemovedToppings]);
  return (
    <>
      <div className="addPizzaContainer">
        <h2>{selectedPizza.name}</h2>
        <p>{selectedPizza.description}</p>
        <div className="img-container">
          <img src={selectedPizza.image} alt={selectedPizza.name} />
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
        onClick={() => {
          addToBasket(selectedPizza, selectedSize || "", selectedBase || "");
          setIsModalOpen(false);
        }}
        disabled={selectedSize === undefined || selectedBase === undefined}
      >
        Add to Basket
      </button>
    </>
  );
};

export default AddPizzaModal;
