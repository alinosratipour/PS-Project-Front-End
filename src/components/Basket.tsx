import { BasketItem } from "./SharedTypes";

interface BasketProps {
  basket: BasketItem[];
  increaseQuantity: (item: BasketItem) => void;
  decreaseQuantity: (item: BasketItem) => void;
  calculateTotalPrice: () => number;
  selectedToppings: any[]; // Assuming selectedToppings is an array of toppings
}

function Basket({
  basket,
  increaseQuantity,
  decreaseQuantity,
  calculateTotalPrice,
  selectedToppings,
}: BasketProps) {

  return (
    <div>
      <h1>Basket</h1>

      {selectedToppings.length > 0 && (
        <div>
          <h2>Selected Toppings:</h2>
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
                {item.name} (Size: {item.size} Base: {item.base}) - Quantity:{" "}
                {item.quantity} - £{(item.price || 0) * item.quantity}
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
