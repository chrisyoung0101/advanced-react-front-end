import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';

const SIGN_OUT_MUTATION = gql`
  #not naming the mutation as we are not passing any args
  mutation {
    endSession #this is a mutation in the keystone BE that has no () cause it takes no args
  }
`;

export default function SignOut() {
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    // args for when they sign out

    refetchQueries: [{ query: CURRENT_USER_QUERY }], // refetch current user so it will rerender
  });

  return (
    <button type="button" onClick={signout}>
      {' '}
      Sign Out{' '}
    </button>
  );
}

// if you wanted to debug the onClick :
// onClick={() => {
//     console.log('Signing out')
//     signout();
// }}
