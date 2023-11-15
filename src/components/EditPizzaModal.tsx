// EditPizzaModal.tsx
import React, { useState, useEffect } from "react";
import ListToppingAndPrices from "./ListToppingAndPrices";
import { Pizza, ToppingType, BasketItem } from "./SharedTypes";
import Modal from "../components/UI-Liberary/Modal";

interface EditPizzaModalProps {
  item: BasketItem;
  onClose: () => void;
  onSave: (updatedItem: BasketItem) => void;
}

const EditPizzaModal: React.FC<EditPizzaModalProps> = ({ item, onClose, onSave }) => {
  // State for managing edited pizza details
  const [editedPizza, setEditedPizza] = useState<BasketItem>(item);

  // Handle saving the updated pizza to the basket
  const handleSave = () => {
    onSave(editedPizza);
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <div>
        <h2>Edit Pizza: {editedPizza.name}</h2>
        <ListToppingAndPrices
          pizzaId={editedPizza.id_pizza}
          onSizePriceChange={(price, size) => {
            // Update the edited pizza's size and price
            setEditedPizza((prev) => ({ ...prev, size, price }));
          }}
          onBaseChange={(base, basePrice) => {
            // Update the edited pizza's base and base price
            setEditedPizza((prev) => ({ ...prev, base, basePrice }));
          }}
          onAddTopping={(topping) => {
            // Add a topping to the edited pizza
            setEditedPizza((prev) => ({
              ...prev,
              toppings: [...(prev.toppings || []), topping],
            }));
          }}
          onRemoveTopping={(topping) => {
            // Remove a topping from the edited pizza
            setEditedPizza((prev) => ({
              ...prev,
              toppings: (prev.toppings || []).filter((t) => t.name !== topping.name),
            }));
          }}
        />

        <button onClick={handleSave}>Save Changes</button>
      </div>
    </Modal>
  );
};

export default EditPizzaModal;
