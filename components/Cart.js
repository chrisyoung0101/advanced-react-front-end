import styled from 'styled-components';
import CartStyles from './styles/CartStyles';
import { useUser } from './User';
import Supreme from './styles/Supreme';
import formatMoney from '../lib/formatMoney';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

// A case where we add another component within a component - if this were used by other components then we should put it in it's own file
function CartItem({ cartItem }) {
  const { product } = cartItem;

  if (!product) return null;

  return (
    <CartItemStyles>
      {/* photo is the field and image is the linked value */}
      <img
        width="100"
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
      />
      <div>
        <h3>{product.name}</h3>
        <p>
          {formatMoney(product.price * cartItem.quantity)}-
          <em>
            {cartItem.quantity} &times; {formatMoney(product.price)}
          </em>
        </p>
      </div>
    </CartItemStyles>
  );
}

// obviously this is the main component in this file
export default function Cart() {
  const me = useUser();
  // if there is no me then return null
  if (!me) return null;

  // shows the cart value with the items in the cart
  console.log(me);

  // open={true} gets saved to open.
  // so defaults to true which is the cart is open
  // open is a prop we are passing to CartStyles -> see cart styles
  return (
    <CartStyles open>
      <header>
        <Supreme>{me.name}'s Cart</Supreme>
      </header>
      <ul>
        {me.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatMoney(calcTotalprice(me.cart))}</p>
      </footer>
    </CartStyles>
  );
}

// We don't need to check for an empty cart -> it will deafult to an empty Array from the graphql API
