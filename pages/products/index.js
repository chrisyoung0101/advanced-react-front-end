import { useRouter } from 'next/dist/client/router';
import Products from '../../components/Products';
import Pagination from '../../components/Pagination';

// Note : there is more than one way of doing this but here is what we are doing :
// Here how we get "page" out of "useRouter()" we are getting the current page at "page level ??? "
// with useRouter(), we get the current page once -> we pull page from query
/// from useRouter() once so we don't need keep calling useRouter()??? Not 100% sure.

export default function OrderPage() {
  // look at query in the log. query is on the router object
  // const router = useRouter();
  // console.log('router Log :');
  // console.log(router);

  const { query } = useRouter();

  // because page is coming in as a String and we need to add two #s so parse that shit...
  const page = parseInt(query.page);

  return (
    <div>
      {/* conditional : if no page passed to the query, default to page 1 */}
      <Pagination page={page || 1} />
      <Products page={page || 1} />
      <Pagination page={page || 1} />
    </div>
  );
}
