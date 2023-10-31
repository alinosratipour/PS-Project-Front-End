// Define a new type for items in the basket
interface BasketItem {
  id_pizza: number; // Add id_pizza property
  name: string;
  price: number | undefined;
}

interface BasketProps {
  basket: BasketItem[]; // Update the type to BasketItem
  selectedSizePrice: number | undefined;
  removeFromBasket: (item: BasketItem) => void; // Update the type here as well
}

function Basket({ basket, selectedSizePrice, removeFromBasket}: BasketProps) {
  console.log(selectedSizePrice);

  const calculateTotalPrice = () => {
    if (selectedSizePrice !== undefined) {
      return basket.reduce((total, item) => total + (item.price || 0), 0);
    }
    return 0;
  };

  return (
    <div>
      <h1>Basket</h1>
      <ul>
        {basket.map((item, index) => (
          <li key={index}>
            {item.name}: £{item.price}
            <button onClick={() => removeFromBasket(item)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total Price: £{calculateTotalPrice()}</p>
    </div>
  );
}

export default Basket;
