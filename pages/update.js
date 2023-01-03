import UpdateProduct from '../components/UpdateProduct';

// To get a product we need something about it in this case an id.
// We have to go to UpdatePage (it's a page) to get info from the URL.
// This data is passed in with props.query

export default function UpdatePage({ query }) {
  // console.log(query);
  return (
    <div>
      <UpdateProduct id={query.id} />
    </div>
  );
}
