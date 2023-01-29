import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';

// signing up will not log the user in but will create a user on the BE so we 'need to ask the user'???

// when requesting a link, the request object will get logged in the CLI :
// {
//   itemId: '63c2bf89FAKE0984309284',
//   identity: 'notmyrealEmailAddress',
//   token: 'nottherealtoken'
// }

// when the form is sumbitted, create a user
const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    # from keystone
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  // syncing the form data to state
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
  });

  // call the mutation -> note : look at data by either destructuring from useMutation or below with signin()
  const [signup, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
      // refetch the currently logged in user
      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  async function handleSubmit(e) {
    e.preventDefault(); // stop form from submitting
    // console.log(inputs);
    const res = await signup().catch(console.error); // catching the error here just stops an annoying Uncaught error.  We are already handling errors by destructuring error in useMutation
    // console.log(res);
    // console.log({ data, loading, error });
    // clear form after submitting
    resetForm();
    // Send email & password to the graphql API
  }

  // return the response data?.authenticateUserWithPassword or nothing
  // const error =
  //   data?.authenticateUserWithPassword.__typename ===
  //   'UserAuthenticationWithPasswordFailure'
  //     ? data?.authenticateUserWithPassword
  //     : undefined;

  return (
    // POST method will not put the PW in the URL.  Also don't log out the body of the request because it will send it over to the server.
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Request a Password Reset</h2>
      {/* Error component only renders if all are true */}
      <Error error={error} />
      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check your email for a link</p>
        )}
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            autoComplete="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Request Reset!</button>
      </fieldset>
    </Form>
  );
}
