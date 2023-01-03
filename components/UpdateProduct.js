import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

// understanding this mutation : updateProduct(), which is from our graphql, is
// called with all the data we gave it. The last set of {} with just id, name, etc is the return
//
const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    udpateProduct(
      id: $id
      data: { id: $id, name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  // 1. Get existing product
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });
  // console.log(data);

  // 2. Get the mutation to update the product
  // note : we had to rename the vars below as they are already used above
  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION, {
    variables: {
      id,
      // TODO: Pass in updates to product here!
    },
  });

  // 3. We need the form to handle updates

  return <p>Update {id}!</p>;
}
