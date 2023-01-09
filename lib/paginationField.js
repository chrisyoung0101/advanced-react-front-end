import { PAGINATION_QUERY } from '../components/Pagination';

// if we do a successful read the first time we return the items.  If we had to use merge then we would do a read() first then a merge() then another read() to return the items.

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
      // note for if statement that handles issue with last page : if there are items AND there aren't enough items to satisfy how many were requested AND we are on the last page THEN just send it.
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
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

    // merge() runs when we come back with our items from the network... assuming we had to go out an get the items from the network.
    // existing = existing cache
    // incoming = the incoming new items
    // args = destructuring this off of query object coming in
    merge(existing, incoming, { args }) {
      const { skip, first } = args;

      console.log(`Merging ${incoming.length} items from the network `);
      // console.log(incoming);  //at this point they are just refs where the values are in the apollo cache

      // if there are existing items in the cache take a copy otherwise give us an empty Array.  slice(0) takes all as 2nd arg not given so takes last item.
      const merged = existing ? existing.slice(0) : [];

      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }

      console.log(merged);

      // Finally we return the merged items from the cache
      return merged;
    },
  };
}
