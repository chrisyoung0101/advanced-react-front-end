import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React from 'react';
import styled from 'styled-components';
import Product from './Product';

// you write a query in the playground, probably make sure it works, then save it as a gql (a proper graphql query?)
// this is what apollo needs or something
export const ALL_PRODUCTS_QUERY = gql`
  query ALL_PRODUCTS_QUERY {
    allProducts {
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

export default function Products() {
  // this hook will return data, an errors, and if it is loading
  // it goes from either loading to data state or loading to error state
  // somehow the vars that we are destructuring below don't need a callback to be updated, they are reactive and update themselves somehow?
  const { data, error, loading } = useQuery(ALL_PRODUCTS_QUERY);
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
