import { useLazyQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { resetIdCounter, useCombobox } from 'downshift';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_PRODUCTS_QUERY = gql`
  query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
    searchTerms: allProducts(
      where: {
        OR: [
          { name_contains_i: $searchTerm }
          { description_contains_i: $searchTerm }
        ]
      }
    ) {
      id
      name
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function Search() {
  const [findItems, { loading, data, error }] = useLazyQuery(
    SEARCH_PRODUCTS_QUERY,
    {
      fetchPolicy: 'no-cache',
    }
  );
  console.log(data);
  // run the search every 350ms, not each time a char is typed
  const findItemsButChill = debounce(findItems, 350);

  resetIdCounter();

  const {
    isOpen,
    inputValue,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    highLightedIndex,
  } = useCombobox({
    items: [],
    onInputValueChange() {
      console.log('Input changed!');
      findItemsButChill({
        variables: {
          searchTerm: inputValue,
        },
      });
    },
    onSelectedItemChange() {
      console.log('Selected Item changed!');
    },
  });

  return (
    <SearchStyles>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps({
            type: 'search',
            placeholder: 'Search for an Item',
            id: 'search',
            className: 'loading',
          })}
        />
      </div>
      <DropDown {...getMenuProps()}>
        <DropDownItem>Hey</DropDownItem>
        <DropDownItem>Hey</DropDownItem>
        <DropDownItem>Hey</DropDownItem>
        <DropDownItem>Hey</DropDownItem>
      </DropDown>
    </SearchStyles>
  );
}
