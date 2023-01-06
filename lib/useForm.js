import { useState, useEffect } from 'react';

// Custom hook to take our form state, put it in an object, and when the useForm function is run it will set state only
//  for the input actively being updated aka user is typing.  This works because of [e.target.name]: e.target.value is dynamic, because [e.target.name] is the
//  variable for the name of the input we are wanting to update.

// Note : if you want to surface data or functionality from a custom hook you must return it

export default function useForm(initial = {}) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    // This function runs when the things we are watching change
    setInputs(initial);
  }, [initialValues]);

  // {
  //     name: 'filbert',
  //     description: 'Gonna get cold!',
  //     price: 1550
  // }

  function handleChange(e) {
    let { name, type, value } = e.target; // e.target is the input
    // make sure we send an actual number and not a String to our graphql
    if (type === 'number') {
      value = parseInt(value);
    }
    if (type === 'file') {
      // take the 1st file (image) that is in the e.target.files array and assign as the value of 'value'
      [value] = e.target.files;
    }
    setInputs({
      // copy the existing state with ...inputs
      ...inputs,
      // update the separate pieces of state
      // below allows us to dynamically run the function specifically for whichever input needs to be updated
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    // The object we are clearing : Turn it into an array with Object.entries, map over it,
    // set each value to "", turn it back to an object with Object.fromEntries
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }

  // return the things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
