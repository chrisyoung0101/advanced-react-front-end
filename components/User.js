import { gql, useQuery } from '@apollo/client';
import PriceTag from './styles/PriceTag';

// Custom Hook

export const CURRENT_USER_QUERY = gql`
  query {
    authenticatedItem {
      # when the authenticated item returns a User, then on that User we will return the User data "& then it will run ???"
      ... on User {
        id
        email
        name
        cart {
          id
          quantity
          product {
            id
            price
            name
            description
            photo {
              image {
                publicUrlTransformed
              }
            }
          }
        }
      }
    }
  }
`;

export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);
  return data?.authenticatedItem;
}
