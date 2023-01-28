import { useContext, createContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  // This is our custome Provider.  We will store data (state) & functionality (updates) in here & anyone can access it via the Consumer.

  const [cartOpen, setCartOpen] = useState(true);

  function toggleCart() {
    // set to the opposite it currently is
    setCartOpen(!cartOpen);
  }

  function closeCart() {
    setCartOpen(false);
  }

  function openCart() {
    setCartOpen(true);
  }

  // Anything passed to value prop will be accessible through the application
  return (
    <LocalStateProvider
      value={{
        cartOpen,
        setCartOpen,
        toggleCart,
        closeCart,
        openCart,
      }}
    >
      {children}
    </LocalStateProvider>
  );
}

// make a custom hook for accessing local state
// with this hook, no need to import all over the place.  Just import the hook or whatever and get access to the functionality therein
function useCart() {
  // useContext is the consumer end of the react context situation
  // we use a consumer here to access the local state
  const all = useContext(LocalStateContext);
  return all;
}

export { CartStateProvider, useCart };

// React Context : The why & the what :

// Local State : In React, this is state that just exists in the browser. For example, when we use our forms like input boxes and such - this state is only there (really?) until we submit that form data to the backend.

// Another type of local state we need, & particulary for this cart, we need state that will handle if it is closed or open.  This state will need to be reflected in several places.  We want the function that handles open/close to be available anywhere in our application.  For this we use React Context : allows us to define data aka local state or really anything (?) & also to define functionality we get from our helper functions. We define this Context at a high level then share it down to any components needing that data.

// Provider : lives at a high level.  Stores state and updater/helper functions.
// Consumer : This will access (consume) the stored state and helper functions in the Provider anywhere in the application.

// We typically stick the Provider at a top level file like _app.js or a page.js (like a Next.js page I assume).

// Note that we are currently using Apollo's Provider.  We will use our own custom one as well.
