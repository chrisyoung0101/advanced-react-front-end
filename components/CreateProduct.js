import useForm from '../lib/useForm';

export default function CreateProduct() {
  // using curly braces because we are returning an object from useForm() custom hook
  const { inputs, handleChange } = useForm({
    name: 'Nice Hat',
    price: 23424,
    description: 'This is so fabulous!',
  });

  return (
    <form>
      <label htmlFor="name">
        Name
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          defaultValue={inputs.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="price">
        Price
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Price"
          defaultValue={inputs.price}
          onChange={handleChange}
        />
      </label>
    </form>
  );
}
