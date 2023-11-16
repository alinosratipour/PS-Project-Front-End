// EditPizzaModal.tsx
import React, { useState, useEffect } from "react";
import Modal from "../components/UI-Liberary/Modal";
import { BasketItem } from "./SharedTypes";
import SizeRadioButtons from "./UI-Liberary/SizeRadioButton/SizeRadioButtons";
import { useSizeContext } from '../components/Context/SizeContext';
import { useAvailableBases } from '../components/Context/AvailableBasesContext';

interface EditPizzaModalProps {
  item: BasketItem | null;
  onClose: () => void;
  onSave: (updatedItem: BasketItem) => void;
  onSizeChange?: (newSize: number, sizeName: string) => void;
}

const EditPizzaModal: React.FC<EditPizzaModalProps> = ({
  item,
  onClose,
  onSave,
  onSizeChange,
}) => {
  const { availableBases } = useAvailableBases(); // Use the context hook
  console.log("AAA",availableBases);
  
  const { availableSizes } = useSizeContext();
  const [editedPizza, setEditedPizza] = useState<BasketItem | null>(item);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(editedPizza?.size);

  useEffect(() => {
    setEditedPizza(item);
    setSelectedSize(item?.size);
  }, [item]);

  const handleSizeChange = (newSize: number, sizeName: string) => {
    setSelectedSize(sizeName); // Set selectedSize to the size name
    if (onSizeChange && editedPizza) {
      onSizeChange(newSize, sizeName);
    }
  };

  const handleSave = () => {
    if (editedPizza) {
      const updatedItem = { ...editedPizza, size: selectedSize };
      onSave(updatedItem);
      onClose();
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
        <h4>{editedPizza?.base}</h4>
        <button onClick={handleSave}>Save Changes</button>
      </div>
    </Modal>
  );
};

export default EditPizzaModal;
