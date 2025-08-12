import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(newItem) {
    setItems((items) => [...items, newItem]);
  }

  function handleDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  return (
    <div className="app">
      <Logo />
      <Form handleAddItem={handleAddItem} />
      <PackingList items={items} handleDelete={handleDelete} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}

function Form({ handleAddItem }) {
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

function PackingList({ items, handleDelete }) {
  return (
    <div className="list">
      <ul>
        {items.map((item, index) => (
          <Item key={index} item={item} handleDelete={handleDelete} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, handleDelete }) {
  const { quantity, description, id } = item;
  return (
    <li>
      <input type="checkbox" />
      <span>
        {quantity} {description}
      </span>
      <button onClick={() => handleDelete(id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>
        💼 You have $NumOfItems items on your list, and you already packed $
        $NumOfItemsPacked $percentage
      </em>
    </footer>
  );
}
export default App;
