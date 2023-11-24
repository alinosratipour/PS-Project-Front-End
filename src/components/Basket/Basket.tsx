import React, { useEffect } from "react";
import EditBasketModal from "./EditBasketModal";
import { BasketItem, ToppingType } from "../SharedTypes";
import "./Basket.scss";
interface BasketProps {
  basket: BasketItem[];
  setBasket: React.Dispatch<React.SetStateAction<BasketItem[]>>;
  increaseQuantity: (item: BasketItem) => void;
  decreaseQuantity: (item: BasketItem) => void;
  calculateTotalPrice: () => number;
  selectedToppings: ToppingType[];
  toppingsTotal: number;
  onSizeChange?: (newSize: number) => void;
  onBaseChange?: (newBase: string) => void;
  onBasketToppingsChange: (updatedToppings: ToppingType[]) => void;
  onBasketToppingsTotalChange: (total: number) => void;
}
const BASKET_STORAGE_KEY = "basket";
function Basket({
  basket,
  setBasket,
  increaseQuantity,
  decreaseQuantity,
  calculateTotalPrice,
  onSizeChange,
  onBaseChange,
  onBasketToppingsChange,
  onBasketToppingsTotalChange,
}: BasketProps) {
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [selectedBasketItem, setSelectedBasketItem] =
    React.useState<BasketItem | null>(null);

  const handlePizzaClick = (pizza: BasketItem) => {
    setSelectedBasketItem(pizza);
    setIsEditModalOpen(true);
  };
  useEffect(() => {
    // Load basket from local storage on component mount
    const storedBasket = localStorage.getItem(BASKET_STORAGE_KEY);
    if (storedBasket) {
      setBasket(JSON.parse(storedBasket));
    }
  }, []);

  useEffect(() => {
    // Save basket to local storage whenever it changes
    localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify(basket));
  }, [basket]);
  
  const handleSaveChanges = (updatedItem: BasketItem) => {
    const toppingsTotal = updatedItem.toppings
      ? updatedItem.toppings.reduce((total, topping) => {
          const toppingTotal = (topping.price || 0) * (topping.quantity || 1);
          return total + toppingTotal;
        }, 0)
      : 0;

    const updatedBasket = basket.map((item) =>
      item.id_pizza === updatedItem.id_pizza
        ? {
            ...updatedItem,
            size: updatedItem.size?.toString(),
            base: updatedItem.base,
            price: updatedItem.price,
            basePrice: updatedItem.basePrice,
            toppingsTotal: toppingsTotal,
          }
        : item
    );

    setBasket(updatedBasket);
    setIsEditModalOpen(false);
    setSelectedBasketItem(null);
  };

  return (
    <div className="BasketContainer">
      <h1>Basket</h1>

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
                  
                    <strong>Extra Toppings : £{item.toppingsTotal}</strong>
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

      {isEditModalOpen && (
        <EditBasketModal
          item={selectedBasketItem}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveChanges}
          onSizeChange={onSizeChange}
          onBaseChange={onBaseChange}
          onToppingsTotalChange={onBasketToppingsTotalChange}
          onToppingsChange={onBasketToppingsChange}
        />
      )}
    </div>
  );
}

export default Basket;
