// EditPizzaModal.tsx
import React, { useState, useEffect } from "react";
import Modal from "../components/UI-Liberary/Modal";
import { BasketItem } from "./SharedTypes";
import SizeRadioButtons from "./UI-Liberary/SizeRadioButton/SizeRadioButtons";
import { useSizeContext } from "../components/Context/SizeContext";
import { useBaseContext } from "../components/Context/BaseContext";
import BaseRadioButtons from "./BaseRadioButtons";

interface EditPizzaModalProps {
  item: BasketItem | null;
  onClose: () => void;
  onSave: (updatedItem: BasketItem) => void;
  onSizeChange?: (newSize: number, sizeName: string) => void;
  //onBaseChange?: (base: string, price: number) => void;
  onBaseChange?: (newBase: string, price: number) => void; // Add this prop
}

const EditPizzaModal: React.FC<EditPizzaModalProps> = ({
  item,
  onClose,
  onSave,
  onSizeChange,
  onBaseChange,
}) => {
  const { availableSizes } = useSizeContext();
  const { availableBases } = useBaseContext(); // Use the new context

  const [editedPizza, setEditedPizza] = useState<BasketItem | null>(item);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    editedPizza?.size
  );

  const [selectedBase, setSelectedBase] = useState<string | undefined>(
    editedPizza?.base
  );

  useEffect(() => {
    setEditedPizza(item);
    setSelectedSize(item?.size);
  }, [item]);

  const handleSizeChange = (newSize: number, sizeName: string) => {
    // setSelectedSizeNumber(newSize);
    setSelectedSize(sizeName); // Set selectedSize to the size name
    if (onSizeChange && editedPizza) {
      onSizeChange(newSize, sizeName);
    }
  };

  const handleSave = () => {
    if (editedPizza) {
      const updatedItem = {
        ...editedPizza,
        size: selectedSize,
        base: selectedBase,
      };
      onSave(updatedItem);
      onClose();
    }
  };
  // const handleBaseChange = (newBase: string, price: number) => {
  //   if (onBaseChange && editedPizza) {
  //     setSelectedBase(newBase);
  //     onBaseChange(newBase, price);
  //   }
  // };
  const handleBaseChange = (newBase: string, price: number) => {
    setSelectedBase(newBase);
    if (onBaseChange && editedPizza) {
      onBaseChange(newBase, price);
    }
  };
  
  return (
    <Modal isOpen={true} onClose={onClose}>
      <div>
        <h2>Edit Pizza: {editedPizza?.name}</h2>
        <SizeRadioButtons
          sizes={availableSizes}
          onSizeChange={handleSizeChange}
          initialCheckedSize={selectedSize}
        />
        <BaseRadioButtons
          bases={availableBases}
          onBaseChange={handleBaseChange}
          initialCheckedBase={selectedBase}
        />
        <button onClick={handleSave}>Save Changes</button>
      </div>
    </Modal>
  );
};

export default EditPizzaModal;
