import React, { useState } from "react";
import EditPizzaModal from "./EditPizzaModal";
import { BasketItem, ToppingType } from "./SharedTypes";

interface BasketProps {
  basket: BasketItem[];
  setBasket: React.Dispatch<React.SetStateAction<BasketItem[]>>;
  increaseQuantity: (item: BasketItem) => void;
  decreaseQuantity: (item: BasketItem) => void;
  calculateTotalPrice: () => number;
  selectedToppings: ToppingType[];
  toppingsTotal: number;
  onSizeChange?: (newSize: number) => void;
  onBaseChange?: (newBase: string) => void; // Add this prop
}

function Basket({
  basket,
  setBasket,
  increaseQuantity,
  decreaseQuantity,
  calculateTotalPrice,
  selectedToppings,
  toppingsTotal,
  onSizeChange,
  onBaseChange,
}: BasketProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBasketItem, setSelectedBasketItem] =
    useState<BasketItem | null>(null);

  const handlePizzaClick = (pizza: BasketItem) => {
    setSelectedBasketItem(pizza);
    setIsEditModalOpen(true);
  };
  const handleSaveChanges = (updatedItem: BasketItem) => {
    // Logic to update the basket with the edited item
    const updatedBasket = basket.map((item) => {
      if (item.id_pizza === updatedItem.id_pizza) {
        // Ensure that the size is updated (if defined)
        return {
          ...updatedItem,
          size: updatedItem.size?.toString(),
          base: updatedItem.base,
        };
      }
      return item;
    });

    // Update the basket state with the edited item
    setBasket(updatedBasket);

    // Close the edit modal
    setIsEditModalOpen(false);
    setSelectedBasketItem(null);
  };

  return (
    <div>
      <h1>Basket</h1>

      {selectedToppings.length > 0 && (
        <div>
          <h2>Selected Toppings:</h2>
          <p>Total Price: £{toppingsTotal}</p>
          <ul>
            {selectedToppings.map((topping, index) => (
              <li key={index}>
                {topping.name}: Quantity: {topping.quantity} - £{topping.price}
              </li>
            ))}
          </ul>
        </div>
      )}

      {basket.length === 0 ? (
        <p>Your basket is empty.</p>
      ) : (
        <>
          <ul>
            {basket.map((item) => (
              <li key={item.id_pizza}>
                <span
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                  onClick={() => handlePizzaClick(item)}
                >
                  {item.name}
                </span>{" "}
                (Size: {item.size} Base: {item.base}) - Quantity:{" "}
                {item.quantity} - £{(item.price || 0) * item.quantity}
                <button onClick={() => increaseQuantity(item)}>+</button>
                <button onClick={() => decreaseQuantity(item)}>-</button>
                {item.toppings && item.toppings.length > 0 && (
                  <div>
                    <h3>Toppings:</h3>
                    <ul>
                      {item.toppings.map((topping, index) => (
                        <li key={index}>
                          {topping.name}: Quantity: {topping.quantity} - £
                          {topping.price}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <p>Total Price: £{calculateTotalPrice()}</p>
        </>
      )}

      {/* Render the EditPizzaModal */}
      {isEditModalOpen && (
        <EditPizzaModal
          item={selectedBasketItem}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveChanges}
          onSizeChange={onSizeChange}
          onBaseChange={onBaseChange}
        />
      )}
    </div>
  );
}

export default Basket;
