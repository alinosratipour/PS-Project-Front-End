interface ToppingType {
    name: string;
    price: number;
  }
  
  interface ToppingsListProps {
    toppingData: ToppingType[] | undefined;
  }
  
  function ToppingsList({ toppingData }: ToppingsListProps) {
    return (
      <ul>
        {toppingData &&
          toppingData.map((topping, index) => (
            <li key={index}>
              {topping.name}: £{topping.price}
            </li>
          ))}
      </ul>
    );
  }
  
  export default ToppingsList;
  