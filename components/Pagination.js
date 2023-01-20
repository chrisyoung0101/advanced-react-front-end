import Head from 'next/head';
import Link from 'next/link';
import { gql } from 'graphql-tag';
import { useQuery } from '@apollo/client';
import PaginationStyles from './styles/PaginationStyles';
import DisplayError from './ErrorMessage';
import { perPage } from '../config';

export const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allProductsMeta {
      count
    }
  }
`;

// takes in the page we are currently on
export default function Pagination({ page }) {
  // run the query and use the data
  const { error, loading, data } = useQuery(PAGINATION_QUERY);
  if (loading) return 'Loading...';
  if (error) return <DisplayError error={error} />;

  // get the count off data
  const { count } = data._allProductsMeta;

  // calc the # of pages
  // Use Math.ceil() cause for example we have 3.25 pages.  The .25 means there is like 1 item on that page where a page can be up to 4 items.  We round up because we need a page for that item.
  const pageCount = Math.ceil(count / perPage);

  // Link tags : page (whatever page you are on) - 1 = previous page

  return (
    <PaginationStyles>
      <Head>
        <title>
          Sick Fits - Page {page} of {pageCount}
        </title>
      </Head>
      {/* aria-disabled because we want to disable Prev when on page 1 */}
      <Link href={`/products/${page - 1}`}>
        <a aria-disabled={page <= 1}>◀️ Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Items Total</p>
      <Link href={`/products/${page + 1}`}>
        <a aria-disabled={page >= pageCount}>Next ▶️</a>
      </Link>
    </PaginationStyles>
  );
}
