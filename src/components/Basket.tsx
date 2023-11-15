
import { BasketItem, ToppingType } from "./SharedTypes";

interface BasketProps {
  basket: BasketItem[];
  increaseQuantity: (item: BasketItem) => void;
  decreaseQuantity: (item: BasketItem) => void;
  calculateTotalPrice: () => number;
  selectedToppings: ToppingType[];
  toppingsTotal: number;
}

function Basket({
  basket,
  increaseQuantity,
  decreaseQuantity,
  calculateTotalPrice,
  selectedToppings,
  toppingsTotal,
}: BasketProps) {
  return (
    <div>
      <h1>Basket</h1>

      {selectedToppings.length > 0 && (
        <div>
          {/* <h2>Extra Toppings:</h2> */}
          <p>Extra Toppping: £{toppingsTotal}</p>
          {/* <ul>
            {selectedToppings.map((topping, index) => (
              <li key={index}>
                {topping.name}: Quantity: {topping.quantity} - £{topping.price}
              </li>
            ))}
          </ul> */}
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
                {item.toppings && item.toppings.length > 0 && (
                  <div>
                    <h3>Toppings:</h3>
                    <ul>
                      {item.toppings.map((topping, index) => (
                        <li key={index}>
                          {topping.name}: Quantity: {topping.quantity} - £{topping.price}
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
    </div>
  );
}

export default Basket;
