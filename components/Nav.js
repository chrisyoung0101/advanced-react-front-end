import Link from 'next/link';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

export default function Nav() {
  const user = useUser();
  // console.log(user);
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {/* only show this content when user is logged in */}
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
        </>
      )}
      {/* if no user signed in, send to sign in page */}
      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
        </>
      )}
    </NavStyles>
  );
}
