import React from "react";
import PizzaOptionsContainer from "./PizzaOptionsContainer";
import { Pizza } from "../SharedTypes";
import useBaseState from "../hooks/StateHooks/useBase";
import useAddToppings from "../hooks/useAddToppingsHook";
import useAddToBasket from "../hooks/useAddToBasketHook";
import Button from "../UI-Liberary/Button/Button";
import "./AddPizzaModal.scss";
import Tooltip from "../UI-Liberary/ToolTip/ToolTip";
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
  const isButtonDisabled =
    selectedSize === undefined || selectedBase === undefined;
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
        <h2 className="PizzaTitle">{selectedPizza.name}</h2>
        <p className="PizzaDescription">{selectedPizza.description}</p>
        <div className="ImageContainer">
          <img src={selectedPizza.image} alt={selectedPizza.name} />
        </div>
      </div>
      <div className="PizzaObtions-Container">
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
      </div>
      <div className="Button-container">
        <Tooltip
          content="Choose Pizza Size & Base!"
          conditionToShowTooltip={isButtonDisabled}
        >
          <Button
            onClick={() => {
              addToBasket(
                selectedPizza,
                selectedSize || "",
                selectedBase || ""
              );
              setIsModalOpen(false);
            }}
            disabled={isButtonDisabled}
            size="md"
            colorscheme="primary"
          >
            Add to Basket
          </Button>
        </Tooltip>
      </div>
    </>
  );
};

export default AddPizzaModal;
