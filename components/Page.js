import PropTypes from 'prop-types';
import Header from './Header';

export default function Page({ children }) {
  return (
    <div>
      <Header />
      <p>I am the page component</p>
      {children}
    </div>
  );
}

Page.propTypes = {
  // any because children could be whatever
  children: PropTypes.any,
};
