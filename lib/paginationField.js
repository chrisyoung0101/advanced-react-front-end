import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells Apollo we will handle everything so don't do your default
    // stuff.

    // existing = the existing items in the cache as an Array.
    // object :
    //          args = first & skip values
    //          cache = Apollo cache
    read(existing = [], { args, cache }) {
      console.log({ existing, args, cache });
      const { skip, first } = args;

      console.log('isNaN? ------------------------');
      console.log(Number.isNaN(skip));

      // read the # of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      console.log(data);

      // attempt to get back allProducts

      // If the items are already in the cache, just return them
      // If there are no items in the cache, return false and then Apollo go out to the network instead and try to get the items.
    },
    merge() {
      // runs when Apollo client comes back from the network with our product should it need to.
    },
  };
}
