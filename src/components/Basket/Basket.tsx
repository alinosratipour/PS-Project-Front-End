import React, { useEffect } from "react";
import EditBasketModal from "./EditBasketModal/EditBasketModal";
import { BasketItem, ToppingType } from "../SharedTypes";
import "./Basket.scss";
import useQuantity from "../Hooks/useQuantityHook";
import Button from "../UI-Liberary/Button/Button";
import { IoMdAddCircleOutline } from "react-icons/io";
import { GrSubtractCircle } from "react-icons/gr";
interface BasketProps {
  basket: BasketItem[];
  setBasket: React.Dispatch<React.SetStateAction<BasketItem[]>>;
  calculateTotalPrice: () => number;
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
  const { increaseQuantity, decreaseQuantity } = useQuantity(basket, setBasket);
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
    // const toppingsTotal = updatedItem.toppings
    //   ? updatedItem.toppings.reduce((total, topping) => {
    //       const toppingTotal = (topping.price || 0) * (topping.quantity || 1);
    //       return total + toppingTotal;
    //     }, 0)
    //   : 0;

    const updatedBasket = basket.map((item) =>
      item.id_pizza === updatedItem.id_pizza
        ? {
            ...updatedItem,
            size: updatedItem.size?.toString(),
            base: updatedItem.base,
            price: updatedItem.price,
            basePrice: updatedItem.basePrice,
            toppingsTotal: updatedItem.extraToppingsCost,
          }
        : item
    );

    setBasket(updatedBasket);
    setIsEditModalOpen(false);
    setSelectedBasketItem(null);
  };

  return (
    <div className="BasketContainer">
      <h1 className="title">Basket</h1>

      {basket.length === 0 ? (
        <p>Your basket is empty.</p>
      ) : (
        <>
          <ul>
            {basket.map((item) => (
              <li key={item.id_pizza}>
                <div className="pizzaNameContainer">
                  <span
                    className="pizzaTitle"
                    onClick={() => handlePizzaClick(item)}
                  >
                    {item.name}
                    <span>{item.size}</span>
                    <span>{item.base}</span>
                  </span>
                  <span>£{(item.price || 0) * item.quantity}</span>
                </div>

                <div className="buttonContainer">
                  <Button
                    onClick={() => increaseQuantity(item)}
                    icon={<IoMdAddCircleOutline style={{ fontSize: "25px" }} />}
                    colorscheme="gost-primary"
                    size="sm"
                    iconPosition="right"
                  ></Button>
                  <span>{item.quantity}</span>

                  <Button
                    onClick={() => decreaseQuantity(item)}
                    icon={<GrSubtractCircle style={{ fontSize: "22px" }} />}
                    colorscheme="gost-primary"
                    size="sm"
                    iconPosition="right"
                  ></Button>
                </div>
                <div className="ex">
                  {item.toppings && item.toppings.length > 0 && (
                    <div>
                      <div className="extraToppingTotal">Extra Toppings : £{item.toppingsTotal}</div>
                      <ul>
                        {item.toppings.map((topping, index) => (
                          <li key={index} className="topping">
                            <span className="qty">{topping.name} </span>
                            <span className="qty"> {topping.quantity} </span>
                            {/* {topping.price} */}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {item.removedToppings && item.removedToppings.length > 0 && (
                    <div className="removedTopping">
                      <ul>
                        {item.removedToppings.map((removedTopping, index) => (
                          <li key={index}>
                            No--{" "}
                            <span className="NoTopping">
                              {removedTopping.name}
                            </span>{" "}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <hr></hr>
              </li>
            ))}
          </ul>
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
