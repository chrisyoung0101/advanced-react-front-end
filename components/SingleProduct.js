import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import DisplayError from './ErrorMessage';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
    }
  }
`;

export default function SingleProduct({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      // 2nd arg is variables.  Here we are saying variables.id will be equal to whatever got passed in as a prop.  Confusion alert : the prop of "id" and the "id" property on "variables" use the same name so id: id, becomes just id.
      id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  const { Product } = data;

  // else...
  return (
    <div>
      <h2>{data.Product.name}</h2>
    </div>
  );
}
