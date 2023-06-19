import PropTypes from 'prop-types';
import { useUser } from './User';
import SignIn from './SignIn';

// gated sign in component
// render out the sign in component if the user is not signed in

export default function PleaseSignIn({ children }) {
  const me = useUser();
  if (!me) return <SignIn />;
  return children;
}

PleaseSignIn.displayName = 'PleaseSignIn';

PleaseSignIn.propTypes = {
  children: PropTypes.node.isRequired,
};
