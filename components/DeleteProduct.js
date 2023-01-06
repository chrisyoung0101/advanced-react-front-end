import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

const DELETE_PRODUCT_MUTATION = gql`
  mutation DELETE_PRODUCT_MUTATION($id: ID!) {
    deleteProduct(id: $id) {
      # when deleted, give me these fields back
      id
      name
    }
  }
`;
// this function will run once that mutation comes back
// cache : Apollo Cache that we are trying to remove an item from
// payload : what gets returned from the update of the mutation
function update(cache, payload) {
  console.log(`cache ${cache}`);
  console.log(`Payload ${payload}`);
  console.log('running the udpate func after delete');

  // find the item to be deleted in Apollo cache then pass it to evict()
  // this is Apollo API
  cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct({ id, children }) {
  // call DELETE_PRODUCT_MUTATION mutation
  const [deleteProduct, { loading }] = useMutation(DELETE_PRODUCT_MUTATION, {
    variables: { id },
    update,
  });

  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        if (confirm('Are you sure you want to delete this item?')) {
          // go ahead and delete it
          // console.log('Deleted');
          deleteProduct().catch((err) => alert(err.message));
        }
      }}
    >
      {/* anything you wrap in the component tag is a child - here we are just using text */}
      {children}
    </button>
  );
}
