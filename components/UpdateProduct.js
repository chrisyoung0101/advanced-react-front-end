import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import DisplayError from './ErrorMessage';
import useForm from '../lib/useForm';
import Form from './styles/Form';
// Note : some of the code from hear we just copied and edited over from CreateProduct.js being :
// The useForm() hook although we are using a different way of accessing the data with data.Product instead of an object we create ???
// The form we copied over and edited

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
      # here we do not want to pass the id as "id: $id" because we can't use ID here for some reason.
      data: { name: $name, description: $description, price: $price }
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
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  // 2.5 - Create some state for the form inputs
  // using curly braces because we are returning an object from useForm() custom hook
  const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Product); // if there is data... then pass the Product
  console.log(inputs);
  // without this data? conditional above, you get "TypeError: Cannot read properties of undefined (reading 'Product')" because we might be in a loading state and the data just not available yet?
  if (loading) return <p>loading...</p>;

  // 3. We need the form to handle updates

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        // variables below : graphql is strict.  We wrote it like this to give it only what is expected.
        const res = await updateProduct({
          variables: {
            id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price,
          },
        }).catch(console.error);
        console.log(res);
        // Submit the input fields to the backend:
        // createProduct() function has already been loaded with our user data from variables: inputs,
        // so... you can pass them like above (for when you already know the values at the time of submission) or
        // directly in the createProduct() function when you don't know the values ahead of time.
        // const res = await createProduct();
        // console.log(res);
        // clearForm();
        // Go to the product's page
        // Router.push({
        //   pathname: `/product/${res.data.createProduct.id}`, // or we coulda used the `data` object returned from useMutation()
        // });
      }}
    >
      {/* see the actual ErrorMessage.js component which is named  DisplayError here because that is how we exported it. */}
      {/* error is from graphql and updateError is from this update whatever all that means */}
      <DisplayError error={error || updateError} />
      {/* if in loading state, disable the form with disabled={loading} */}
      {/*  when in a loading state this shows the progress bar : aria-busy={loading} */}
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Price
          <textarea
            type="text"
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
      </fieldset>

      <button type="submit">Update Product</button>
    </Form>
  );
}
