// Define a new type for items in the basket
interface BasketItem {
  id_pizza: number; // Add id_pizza property
  name: string;
  price: number | undefined;
  quantity: number; // Add a quantity property
}

interface BasketProps {
  basket: BasketItem[]; // Update the type to BasketItem
  selectedSizePrice: number | undefined;
  // removeFromBasket: (item: BasketItem) => void; // Update the type here as well
  increaseQuantity: (item: BasketItem) => void;
  decreaseQuantity: (item: BasketItem) => void;
  
}

function Basket({
  basket,
  selectedSizePrice,
  increaseQuantity,
  decreaseQuantity,
}: BasketProps) {
  console.log(selectedSizePrice);

  const calculateTotalPrice = () => {
    return basket.reduce((total, item) => total + (item.price || 0) * item.quantity, 0);
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
                {item.name} (Quantity: {item.quantity}) - £{(item.price as number || 0) * item.quantity} 
                
                <button onClick={() => increaseQuantity(item)}>Increase</button>
                <button onClick={() => decreaseQuantity(item)}>Decrease</button>
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






