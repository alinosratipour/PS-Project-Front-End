import React, { useState, useEffect } from "react";
import Modal from "../UI-Liberary/Modal/Modal";
import SizeRadioButtons from "../UI-Liberary/SizeRadioButton/SizeRadioButtons";
import { useSizeContext } from "../Context/SizeContext";
import { useBaseContext } from "../Context/BaseContext";
import { useToppingContext } from "../Context/ToppingContaxt";
import BaseRadioButtons from "../UI-Liberary/BaseRadioButton/BaseRadioButtons";
import SizePrice from "../PizzaList/SizePrice";
import { BasketItem, SizeType, ToppingType } from "../SharedTypes";
import ToppingsList from "../PizzaList/ToppingsList";
import { calculateToppingsTotal } from "../utils";

interface EditBasketModalProps {
  item: BasketItem | null;
  onClose: () => void;
  onSave: (updatedItem: BasketItem) => void;
  onSizeChange?: (newSize: number, sizeName: string) => void;
  onBaseChange?: (newBase: string, price: number) => void;
  onToppingsChange: (toppings: ToppingType[]) => void;
  onToppingsTotalChange: (total: number) => void;
}

const EditBasketModal: React.FC<EditBasketModalProps> = ({
  item,
  onClose,
  onSave,
  onSizeChange,
  onBaseChange,
  onToppingsChange,
  onToppingsTotalChange,
}) => {
  const { availableSizes } = useSizeContext();
  const { availableBases, refetchBases } = useBaseContext();
  const { availableToppings, refetchToppings } = useToppingContext();

  const [editedPizza, setEditedPizza] = useState<BasketItem | null>(item);
  const [selectedSize, setSelectedSize] = useState<SizeType | undefined>(
    availableSizes.find((size) => size.p_size === item?.size)
  );
  const [selectedBase, setSelectedBase] = useState<string | undefined>(
    editedPizza?.base
  );

  const [selectedBasePrice, setSelectedBasePrice] = useState<
    number | undefined
  >(item?.basePrice || 0);

  const [selectedToppings, setSelectedToppings] = useState<ToppingType[]>(
    item?.toppings || []
  );

  useEffect(() => {
    setEditedPizza(item);
    setSelectedSize(availableSizes.find((size) => size.p_size === item?.size));
    setSelectedToppings(item?.toppings || []);
  }, [item, availableSizes]);

  const handleSizeChange = (newSize: number, sizeName: string) => {
    refetchBases(newSize);
    setSelectedBasePrice(newSize);
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

  const handleAddTopping = (topping: ToppingType) => {
    const existingToppingIndex = selectedToppings.findIndex(
      (t) => t.name === topping.name
    );

    if (existingToppingIndex !== -1) {
      // Topping already exists, update its quantity
      const updatedToppings = [...selectedToppings];
      if (updatedToppings[existingToppingIndex].quantity < 10) {
        updatedToppings[existingToppingIndex].quantity += 1;
        setSelectedToppings(updatedToppings);

        // Update toppingsTotal directly
        const total = calculateToppingsTotal(updatedToppings);
        onToppingsChange(updatedToppings);
        onToppingsTotalChange(total);
      }
    } else {
      // Topping doesn't exist, add it with quantity 1
      const newToppings = [...selectedToppings, { ...topping, quantity: 1 }];
      setSelectedToppings(newToppings);

      // Update toppingsTotal directly
      const total = calculateToppingsTotal(newToppings);
      // onToppingsChange(newToppings);
      onToppingsTotalChange(total);
    }
  };

  const handleRemoveTopping = (topping: ToppingType) => {
    setSelectedToppings((prevToppings) => {
      const updatedToppings = prevToppings
        .map((t: ToppingType) =>
          t.name === topping.name
            ? { ...t, quantity: t.quantity - 1 } // Decrease quantity for the matching topping
            : t
        )
        .filter((t: ToppingType) => t.quantity > 0); // Remove toppings with quantity 0

      // Update toppingsTotal directly
      const total = calculateToppingsTotal(updatedToppings);
      // onToppingsChange(updatedToppings);
      onToppingsTotalChange(total);

      return updatedToppings;
    });
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <h2>Edit Pizza</h2>
      <div>
        <h3>Size:</h3>
        <SizeRadioButtons
          sizes={availableSizes}
          onSizeChange={handleSizeChange}
          initialCheckedSize={selectedSize?.p_size || ""}
        />
      </div>
      <div>
        <h3>Base:</h3>
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
      <ToppingsList
        availableToppings={availableToppings}
        refetchToppings={refetchToppings}
        onAddTopping={handleAddTopping}
        onRemoveTopping={handleRemoveTopping}
        selectedToppings={selectedToppings}
      />
      <button onClick={handleSave}>Save Changes</button>
    </Modal>
  );
};

export default EditBasketModal;
