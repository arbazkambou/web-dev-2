import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  console.log("items", items);

  function handleAddItem(newItem) {
    setItems((items) => [...items, newItem]);
  }

  function handleDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleStatus(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, isPacked: !item.isPacked } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form handleAddItem={handleAddItem} />
      <PackingList
        items={items}
        handleDelete={handleDelete}
        handleStatus={handleStatus}
      />
      <Stats items={items} />
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

function PackingList({ items, handleDelete, handleStatus }) {
  return (
    <div className="list">
      <ul>
        {items.map((item, index) => (
          <Item
            key={index}
            item={item}
            handleDelete={handleDelete}
            handleStatus={handleStatus}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, handleDelete, handleStatus }) {
  const { quantity, description, id, isPacked } = item;
  return (
    <li>
      <input
        type="checkbox"
        onChange={() => handleStatus(id)}
        checked={isPacked}
      />
      <span style={{ textDecoration: isPacked ? "line-through" : "none" }}>
        {quantity} {description}
      </span>
      <button onClick={() => handleDelete(id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  const numOfItems = items.length;
  const numOfPackedItems = items.filter(
    (item) => item.isPacked === true
  ).length;

  const percentage = Math.round((numOfPackedItems / numOfItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100 && "You have everything to go"}
        {numOfItems === 0 && "Please start adding items in your list"}
        {numOfItems > 0 &&
          `💼 You have ${numOfItems} items on your list, and you already packed
        ${numOfPackedItems} (${percentage}%)`}
      </em>
    </footer>
  );
}
export default App;
