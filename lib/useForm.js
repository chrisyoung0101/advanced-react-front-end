import { useState } from 'react';

// Custom hook to take our form state, put it in an object, and when the useForm function is run it will set state only
//  for the input actively being updated aka user is typing.  This works because of [e.target.name]: e.target.value is dynamic, because [e.target.name] is the
//  variable for the name of the input we are wanting to update.

// Note : if you want to surface data or functionality from a custom hook you must return it

export default function useForm(initial = {}) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);

  // {
  //     name: 'filbert',
  //     description: 'Gonna get cold!',
  //     price: 1550
  // }

  function hanndleChange(e) {
    setInputs({
      // copy the existing state with ...inputs
      ...inputs,
      // update the separate pieces of state
      // below allows us to dynamically run the function specifically for whichever input needs to be updated
      [e.target.name]: e.target.value,
    });
  }

  // return the things we want to surface from this custom hook
  return {
    inputs,
    hanndleChange,
  };
}
