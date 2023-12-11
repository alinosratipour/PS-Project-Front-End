import React from "react";
import PizzaOptionsContainer from "./PizzaOptionsContainer";
import { Pizza } from "../SharedTypes";
import useBaseState from "../hooks/StateHooks/useBase";
import useAddToppings from "../hooks/useAddToppingsHook";
import useAddToBasket from "../hooks/useAddToBasketHook";
import Button from "../UI-Liberary/Button/Button";

interface AddPizzaModalProps {
  selectedPizza: Pizza;
  setSelectedSize: (size: string | undefined) => void;
  selectedSize: string | undefined;
  setIsModalOpen: (isOpen: boolean) => void;
}

const AddPizzaModal: React.FC<AddPizzaModalProps> = ({
  selectedPizza,
  setSelectedSize,
  selectedSize,
  setIsModalOpen,
}) => {
  const { selectedBase, setSelectedBase } = useBaseState();

  const { addToppingToBasket, removeToppingFromBasket, selectedToppings } =
    useAddToppings();

  const {
    addToBasket,
    setRemovedToppings,
    removedToppings: updatedRemovedToppings,
    setSelectedBasePrice,
    setSelectedSizePrice,
  } = useAddToBasket({
    selectedToppings,
  });

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
        {/* <button
          onClick={() => {
            addToBasket(selectedPizza, selectedSize || "", selectedBase || "");
            setIsModalOpen(false);
          }}
          disabled={selectedSize === undefined || selectedBase === undefined}
        >
          Add to Basket
        </button>    */}
        <Button
        onClick={() => {
          addToBasket(selectedPizza, selectedSize || "", selectedBase || "");
          setIsModalOpen(false);
        }}
        disabled={selectedSize === undefined || selectedBase === undefined}
        size="lg"
      >
        Add to Basket
      </Button>
  
    </>
  );
};

export default AddPizzaModal;
