import React, { useState, useEffect } from "react";
import Modal from "../../UI-Liberary/Modal/Modal";
import SizeRadioButtons from "../../UI-Liberary/SizeRadioButton/SizeRadioButtons";
import { useSizeContext } from "../../Context/SizeContext";
import { useBaseContext } from "../../Context/BaseContext";
import { useAllAvailableToppingsStore } from "../../store/AllAvailableToppingsStore";
import BaseRadioButtons from "../../UI-Liberary/BaseRadioButton/BaseRadioButtons";
import SizePrice from "../../AddPizza/SizePrice";
import { BasketItem, SizeWithPrice, ToppingType } from "../../SharedTypes";
import ToppingsList from "../../AddPizza/ToppingsList/ToppingsList";
import useAddToppings from "../../Hooks/useAddToppingsHook";
import "./EditBasketModal.scss";
import Button from "../../UI-Liberary/Button/Button";
import PizzaToppings from "../../AddPizza/PizzaToppings/PizzaToppings";
import useAddToBasket from "../../Hooks/useAddToBasketHook";


interface EditBasketModalProps {
  item: BasketItem | null;
  onClose: () => void;
  onSave: (updatedItem: BasketItem) => void;
  onSizeChange?: (newSize: number, sizeName: string) => void;
  onBaseChange?: (newBase: string, price: number) => void;
  onToppingsChange: (toppings: ToppingType[]) => void;
  onToppingsTotalChange:
    | React.Dispatch<React.SetStateAction<number>>
    | ((prevTotal: number) => number)
    | undefined;
}

const EditBasketModal: React.FC<EditBasketModalProps> = ({
  item,
  onClose,
  onSave,
  onSizeChange,
  onBaseChange,
}) => {
  const { availableSizes, setSizes, sizesData } = useSizeContext();
  const { availableBases, refetchBases } = useBaseContext();
  const { availableToppings, refetchToppings } = useAllAvailableToppingsStore();

  const [editedPizza, setEditedPizza] = useState<BasketItem | null>(item);
  const [selectedSize, setSelectedSize] = useState<SizeWithPrice | undefined>();
  availableSizes.find((size) => size.p_size === item?.size);
  const [selectedBase, setSelectedBase] = useState<string | undefined>(
    editedPizza?.base
  );
  const isButtonDisabled = !selectedBase;
  const [selectedBasePrice, setSelectedBasePrice] = useState<
    number | undefined
  >(item?.basePrice || 0);

  const {
    addToppingToBasket,
    removeToppingFromBasket,
    selectedToppings,
    setSelectedToppings,
  } = useAddToppings();

  const { removedToppings: updatedRemovedToppings, setRemovedToppings,calculateExtraToppingsCost } =
    useAddToBasket({
      selectedToppings,
    });

  

  useEffect(() => {
    const fetchData = async () => {
      setEditedPizza(item);

      // Assuming the data structure in your response
      const pizzaSizesData = sizesData?.getpizzasWithSizesAndPrices.find(
        (pizza: any) => pizza.id_pizza === item?.id_pizza
      );
      const sizes = pizzaSizesData?.sizesWithPrices || [];

      // Update the state with the fetched sizes
      setSizes(sizes);
      const selectedSizeFromAvailable = sizes.find(
        (size) => size.p_size === item?.size
      );
      setSelectedSize(selectedSizeFromAvailable);
      setSelectedToppings(item?.toppings || []);
      if (selectedSize) {
        await refetchToppings(selectedSize.id_size);
      }
    };

    fetchData();
  }, [item, sizesData, setSizes]);

  const handleSizeChange = (newSize: number, sizeName: string) => {
    refetchBases(newSize);
    refetchToppings(newSize);
    setSelectedToppings([]);
    setSelectedBasePrice(newSize);
    setRemovedToppings([]);
    setSelectedBase(undefined);
    const selectedSize = availableSizes.find(
      (size) => size.p_size === sizeName
    );

    if (selectedSize) {
      setSelectedSize(selectedSize);

      if (onSizeChange && editedPizza) {
        onSizeChange(newSize, sizeName);
        setEditedPizza((prevPizza) => ({
          ...(prevPizza as BasketItem),
          price: selectedSize.price,
        }));
      }
    }
  };

const extraToppingsCost =calculateExtraToppingsCost();

  const handleSave = () => {
    if (editedPizza) {
      const updatedItem = {
        ...editedPizza,
        size: selectedSize?.p_size || "",
        base: selectedBase,
        basePrice:
          selectedBasePrice !== undefined
            ? selectedBasePrice
            : editedPizza.basePrice,
        price: selectedSize?.price || 0,
        toppings: selectedToppings, // Include selected toppings
        removedToppings: updatedRemovedToppings,
        extraToppingsCost:extraToppingsCost

        
      };
      onSave(updatedItem);
      onClose();
    }
  };

  const handleBaseChange = (newBase: string, price: number) => {
    setSelectedBase(newBase);
    setSelectedBasePrice(price);

    if (onBaseChange && editedPizza) {
      onBaseChange(newBase, price);
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div className="container">
        <h1 className="PizzaName">{item?.name}</h1>
        <div className="SizeContainer">
          <h3 className="sizeTitle">Size: {item?.size}</h3>

          <SizeRadioButtons
            sizes={availableSizes}
            onSizeChange={handleSizeChange}
            initialCheckedSize={selectedSize?.p_size || ""}
          />
        </div>
        <div>
          <h3 className="BaseTitle">Base: {item?.base}</h3>
          <BaseRadioButtons
            bases={availableBases}
            onBaseChange={handleBaseChange}
            initialCheckedBase={selectedBase}
          />
        </div>
        <SizePrice
          selectedSizePrice={selectedSize?.price || 0}
          size={selectedSize?.p_size || ""}
        />

        <div className="AccordionMenu-Wrapper">
          <div className="PizzaToppings">
            <h3 className="PizzaToppingTitle">Your Toppings</h3>

            <PizzaToppings pizzaId={item?.id_pizza} />
          </div>
        </div>
        <ToppingsList
          availableToppings={availableToppings}
          refetchToppings={refetchToppings}
          onAddTopping={addToppingToBasket}
          onRemoveTopping={removeToppingFromBasket}
          selectedToppings={selectedToppings}
        />
        <div className="ButtonContainer1">
          <Button
            size="md"
            colorscheme="primary"
            onClick={handleSave}
            disabled={isButtonDisabled}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditBasketModal;
