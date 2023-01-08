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

      // read the # of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      // console.log(data);

      // check if _allProductsMeta and if so then grab count
      const count = data?._allProductsMeta?.count;

      // calc page we are currently on
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);
      // end read the # of items on the page from the cache

      // Check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);
      if (items.length !== first) {
        // We don't have any items, we must go to the network to fetch them
        return false;
      }

      // attempt to get back allProducts

      // If the items are already in the cache, just return them
      if (items.length) {
        console.log(
          `There are ${items.length} items in the cache!  Gonna send them to Apollo.`
        );
      }

      // If there are no items in the cache, return false and then Apollo go out to the network instead and try to get the items.

      return items;
    },
    merge() {
      // runs when Apollo client comes back from the network with our product should it need to.
    },
  };
}
