import PropTypes from 'prop-types';

export default function Page({ children }) {
  return (
    <div>
      <p>I am the page component</p>
      {children}
    </div>
  );
}

Page.propTypes = {
  // any because children could be whatever
  children: PropTypes.any,
};
