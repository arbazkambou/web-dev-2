import { useState } from "react";

export function Form({ handleAddItem }) {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");

  // console.log(items);

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = { quantity, description, isPacked: false, id: Date.now() };

    handleAddItem(newItem);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function hanldeQuantity(e) {
    setQuantity(e.target.value);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>x
      <select onChange={hanldeQuantity} value={quantity}>
        {Array.from({ length: 20 }, (_, index) => index + 1).map(
          (el, index) => (
            <option value={el} key={index}>
              {el}
            </option>
          )
        )}
      </select>
      <input
        type="text"
        placeholder="Item..."
        onChange={handleDescription}
        value={description}
      />
      <button>Add</button>
    </form>
  );
}
