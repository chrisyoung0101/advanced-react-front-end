import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { perPage } from '../config';
import Product from './Product';

// you write a query in the playground, probably make sure it works, then save it as a gql (a proper graphql query?)
// this is what apollo needs or something
export const ALL_PRODUCTS_QUERY = gql`
  # skip value : if we have 10 products & are doing two products per page, when we are on page two (products 3 & 4) we need to calculate a value to skip products 1 & 2 and just show 3 & 4.
  # first : how many per page we need to pass??? No default set as we are importing it.
  query ALL_PRODUCTS_QUERY($skip: Int = 0, $first: Int) {
    allProducts(first: $first, skip: $skip) {
      id
      name
      price
      description
      photo {
        id
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

// making a grid for our list of products
const ProductsListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
`;

export default function Products({ page }) {
  // this hook will return data, an errors, and if it is loading
  // it goes from either loading to data state or loading to error state
  // somehow the vars that we are destructuring below don't need a callback to be updated, they are reactive and update themselves somehow?
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY, {
    variables: {
      skip: page * perPage - perPage,
      first: perPage,
    },
  });
  console.log(data, error, loading);
  // to test : nav to another page, refresh, go to Products page, Loading... should flash
  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <ProductsListStyles>
        {/* data.allProducts because it can query all the orders, all the users and for some reason
      that makes us go one level deeper with data.allProducts  */}
        {data.allProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ProductsListStyles>
    </div>
  );
}
