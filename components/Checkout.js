import { useState } from 'react';
import styled from 'styled-components';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import nProgress from 'nprogress';
import SickButton from './styles/SickButton';

const CheckoutFormStyles = styled.form`
  box-shadow: 0 1px 2px 2px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 5px;
  padding: 1rem;
  display: grid;
  grid-gap: 1rem;
`;

const stripeLib = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

// note : these all come from Stipe as well -> Elements,

function CheckoutForm() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  async function handleSubmit(e) {
    // 1. Stop the form from submitting and turn the loader on.

    e.preventDefault();
    setLoading(true);
    console.log('we gotta do some work folks...');
    // 2. Start the page transition
    nProgress.start();
    // 3. Create the payment method via strip (On success, Token comes back here)
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    console.log(paymentMethod);
    console.log(`error : ${error}`);
    // 4. Handle any errors from stripe
    if (error) {
      setError(error);
    }
    // 5. Send the token from step 3 to our keystone server, via a custom mutation
    // 6. Change the page to view the order
    // 7. Close the cart
    // 8. Turn the loader off.
  }

  return (
    <CheckoutFormStyles onSubmit={handleSubmit}>
      {error && <p style={{ fontSize: 12 }}>{error}</p>}
      <CardElement />
      <SickButton>Check Out Now</SickButton>
    </CheckoutFormStyles>
  );
}

function Checkout() {
  return (
    <Elements stripe={stripeLib}>
      <CheckoutForm />
    </Elements>
  );
}

export { Checkout };

/* 
https://stripe.com/docs/testing  -> and there's a ton lot more option 
Stripe test data : 
4242 4242 4242 4242
a vaild future exp date like 12/34
any 3 digit CVC (4 for Amex)
use any value for the other form fields 

Card that fails with an error : 
4000 0084 0000 1280 
4000 0000 0000 0259
*/

// Looking for the token? :  with this : console.log(paymentMethod); you get lots of stuff but grab this from 'card' which is also the token from stripe :
// id :  "pm_1MbA8zEdNpIcJZOE6rL4zcU7"

// ignore this error? Can only create one Element of type card
