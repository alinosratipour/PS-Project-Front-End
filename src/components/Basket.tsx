import { BasketItem } from "./SharedTypes";

interface BasketProps {

  basket: BasketItem[];
  increaseQuantity: (item: BasketItem) => void;
  decreaseQuantity: (item: BasketItem) => void;
  calculateTotalPrice: () => number;
}

function Basket({ basket, increaseQuantity, decreaseQuantity }: BasketProps) {
  const calculateTotalPrice = () => {
    return basket.reduce(
      (total, item) => (item.price || 0) * item.quantity + total,
      0
    );
  };

  return (
    <div>
      <h1>Basket</h1>
      {basket.length === 0 ? (
        <p>Your basket is empty.</p>
      ) : (
        <>
          <ul>
            {basket.map((item) => (
              <li key={item.id_pizza}>
                {item.name} (Size: {item.size} Base: {item.base})    - Quantity: {item.quantity} - £
                {(item.price || 0) * item.quantity}
                <button onClick={() => increaseQuantity(item)}>+</button>
                <button onClick={() => decreaseQuantity(item)}>-</button>
              </li>
            ))}
          </ul>
          <p>Total Price: £{calculateTotalPrice()}</p>
        </>
      )}
    </div>
  );
}

export default Basket;
