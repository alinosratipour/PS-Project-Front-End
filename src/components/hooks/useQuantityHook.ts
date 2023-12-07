
import { Dispatch, SetStateAction } from "react";
import { BasketItem } from "../SharedTypes";

interface UseQuantity {
  increaseQuantity: (basketItem: BasketItem) => void;
  decreaseQuantity: (basketItem: BasketItem) => void;
}

const useQuantity = (
  basket: BasketItem[],
  setBasket: Dispatch<SetStateAction<BasketItem[]>>
): UseQuantity => {
  const increaseQuantity = (basketItem: BasketItem) => {
    const updatedBasket = basket.map((item) => {
      if (
        item.id_pizza === basketItem.id_pizza &&
        item.price === basketItem.price
      ) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setBasket(updatedBasket);
  };

  const decreaseQuantity = (basketItem: BasketItem) => {
    const updatedBasket = basket.map((item) => {
      if (
        item.id_pizza === basketItem.id_pizza &&
        item.price === basketItem.price
      ) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return null as unknown as BasketItem;
      }
      return item;
    });

    setBasket(updatedBasket.filter((item) => item !== null) as BasketItem[]);
  };

  return {
    increaseQuantity,
    decreaseQuantity,
  };
};

export default useQuantity;
