import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function ResetPage({ query }) {
  // if there's no query or query.token then...
  // meaning if there is no token in the URL
  // show the message and the RequestReset form
  if (!query?.token) {
    return (
      <div>
        <p>Sorry you must supply a token</p>
        <RequestReset />
      </div>
    );
  }

  // else you've got a token in the URL so render the Reset Form

  return (
    <div>
      <p>RESET YOUR PASSWORD {query.token}</p>
      <Reset token={query.token} />
    </div>
  );
}
