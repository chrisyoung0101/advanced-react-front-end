import { useRouter } from 'next/dist/client/router';
import Products from '../../components/Products';
import Pagination from '../../components/Pagination';

export default function OrderPage() {
  // look at query in the log. query is on the router object
  // const router = useRouter();
  // console.log('router Log :');
  // console.log(router);

  const { query } = useRouter();

  // because page is coming in as a String and we need to add to #s so parse that shit...
  const page = parseInt(query.page);
  console.log(typeof page);

  return (
    <div>
      {/* conditional : if no page passed to the query, default to page 1 */}
      <Pagination page={page || 1} />
      <Products />
      <Pagination page={page || 1} />
    </div>
  );
}
