import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import { ALL_PRODUCTS_QUERY } from './Products';
import DisplayError from './ErrorMessage';

// We take the user form input data, add them to the vars below and then create it in the BE in keystone
// aka take the data from the user form and create a new product in keystone.
export const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    # which variables are getting passed in?  And what are their types?
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
    }
  }
`;

export default function CreateProduct() {
  // using curly braces because we are returning an object from useForm() custom hook
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    image: '',
    name: 'Nice Hat',
    price: 23424,
    description: 'This is so fabulous!',
  });

  const [createProduct, { loading, error, data }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs, // this is passing in values from $name, $description, $price, $image
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }], // when we fire off the mutation request and it comes back refetch the data so produts page has the latest data.  Also, can pass vars in at this point as well but we ain't got none in this course
    }
  );

  console.log(createProduct);

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        // console.log(inputs);
        // Submit the input fields to the backend:
        // createProduct() function has already been loaded with our user data from variables: inputs,
        // so... you can pass them like above (for when you already know the values at the time of submission) or
        // directly in the createProduct() function when you don't know the values ahead of time.
        const res = await createProduct();
        console.log(res);
        clearForm();
        // Go to the product's page
        Router.push({
          pathname: `/product/${res.data.createProduct.id}`, // or we coulda used the `data` object returned from useMutation()
        });
      }}
    >
      {/* see the actual ErrorMessage.js component which is named  DisplayError here because that is how we exported it. */}
      <DisplayError error={error} />
      {/* if in loading state, disable the form with disabled={loading} */}
      {/*  when in a loading state this shows the progress bar : aria-busy={loading} */}
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input
            required
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </label>
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

      <button type="submit">+ Add Product</button>
    </Form>
  );
}
