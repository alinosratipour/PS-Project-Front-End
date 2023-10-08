import { useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import ListSizeWithBase from './ListSizeWithBase';

const GET_PIZZAS = gql`
  query GetPizzas {
    pizzas {
      id_pizza
      name
      top_quantity
      description
      image
    }
  }
`;

function PizzaList() {
  const { loading, error, data } = useQuery(GET_PIZZAS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Pizza List</h2>
      <ul>
        {data.pizzas.map((pizza: any) => (
          <li key={pizza.id_pizza}>
            <h3>{pizza.name}</h3>
            <img src={pizza.image} alt={pizza.name}  width="250px" height="250px"/> {/* Render pizza image */}
            <p>{pizza.description}</p>
            <ListSizeWithBase />
            <button>Add To Card</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PizzaList;
