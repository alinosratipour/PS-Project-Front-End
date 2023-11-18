import React, { useState, useEffect } from "react";
import Modal from "../components/UI-Liberary/Modal";
import SizeRadioButtons from "./UI-Liberary/SizeRadioButton/SizeRadioButtons";
import { useSizeContext } from "../components/Context/SizeContext";
import { useBaseContext } from "../components/Context/BaseContext";
import BaseRadioButtons from "./BaseRadioButtons";
import SizePrice from "./SizePrice";
import { BaseWithPrice, BasketItem, SizeType } from "./SharedTypes";

interface EditPizzaModalProps {
  item: BasketItem | null;
  onClose: () => void;
  onSave: (updatedItem: BasketItem) => void;
  onSizeChange?: (newSize: number, sizeName: string) => void;
  onBaseChange?: (newBase: string, price: number) => void;
}

const EditPizzaModal: React.FC<EditPizzaModalProps> = ({
  item,
  onClose,
  onSave,
  onSizeChange,
  onBaseChange,
}) => {
  const { availableSizes } = useSizeContext();
  const { availableBases, refetchBases } = useBaseContext();

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

  useEffect(() => {
    setEditedPizza(item);
    setSelectedSize(availableSizes.find((size) => size.p_size === item?.size));
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
      <div>
        <h2>Edit Pizza: {editedPizza?.name}</h2>
        <SizeRadioButtons
          sizes={availableSizes}
          onSizeChange={handleSizeChange}
          initialCheckedSize={selectedSize?.p_size}
        />
        <BaseRadioButtons
          bases={availableBases}
          onBaseChange={handleBaseChange}
          initialCheckedBase={selectedBase}
        />
        <SizePrice
          selectedSizePrice={selectedSize?.price || 0}
          size={selectedSize?.p_size || ""}
        />
        <button onClick={handleSave}>Save Changes</button>
      </div>
    </Modal>
  );
};

export default EditPizzaModal;
