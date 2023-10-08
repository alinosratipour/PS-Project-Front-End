
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const GET_ALL_SIZES_WITH_RELATED_BASES = gql`
  query {
    getAllSizesWithRelatedBases {
      size
      bases
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_ALL_SIZES_WITH_RELATED_BASES);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
     
      <ul>
        {data.getAllSizesWithRelatedBases.map((sizeData) => (
          <li key={sizeData.size}>
            <strong>{sizeData.size}</strong> - Bases: {sizeData.bases.join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
