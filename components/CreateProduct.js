import { useState } from 'react';
import useForm from '../lib/useForm';

export default function CreateProduct() {
  // using curly braces because we are returning an object from useForm() custom hook
  const { inputs, handleChange } = useForm();

  return (
    <form>
      <label htmlFor="name">
        Name
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            console.log(e.target.value);
            // needed to sync the state which will allow you to type and type over the placeholder
            setName(e.target.value);
          }}
        />
      </label>
      <label htmlFor="price">
        Price
        <input
          type="text"
          id="price"
          name="price"
          placeholder="Price"
          value={price}
          onChange={(e) => {
            console.log(e.target.value);
            // needed to sync the state which will allow you to type and type over the placeholder
            setName(e.target.value);
          }}
        />
      </label>
    </form>
  );
}
