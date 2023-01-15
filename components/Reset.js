import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import Form from './styles/Form';
import useForm from '../lib/useForm';
import { CURRENT_USER_QUERY } from './User';
import Error from './ErrorMessage';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    # from keystone
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      # you get back either a code &/Or a message and nothing if successful
      code
      message
    }
  }
`;

export default function Reset({ token }) {
  // syncing the form data to state
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    // token: token,
    // when the form submits, pass along the token via variables: inputs
    token,
  });

  // call the mutation -> note : look at data by either destructuring from useMutation or below with signin()
  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });

  // if the data?.redeemUserPasswordResetToken has a code, then the error will be data?.redeemUserPasswordResetToken otherwise undefined : there is no error
  const successfulError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;

  async function handleSubmit(e) {
    e.preventDefault(); // stop form from submitting
    console.log(inputs);
    const res = await reset().catch(console.error); // catching the error here just stops an annoying Uncaught error.  We are already handling errors by destructuring error in useMutation
    console.log(res);
    console.log({ data, loading, error });
    // clear form after submitting
    resetForm();
    // Send email & password to the graphql API
  }

  return (
    // POST method will not put the PW in the URL.  Also don't log out the body of the request because it will send it over to the server.
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset Your Password</h2>
      {/* Error component only renders if all are true */}
      <Error error={error || successfulError} />
      <fieldset>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! You can now sign in</p>
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
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Request Reset!</button>
      </fieldset>
    </Form>
  );
}
