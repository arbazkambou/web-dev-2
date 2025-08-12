import { useState } from "react";

function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}

function Form() {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const [items, setItems] = useState([]);

  // console.log(items);

  function handleSubmit(e) {
    e.preventDefault();

    const newItem = { quantity, description };

    setItems((items) => [...items, newItem]);
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

function PackingList() {
  return (
    <div className="list">
      <ul>
        <li>
          <input type="checkbox" />
          <span>1 Socks</span>
          <button>❌</button>
        </li>
      </ul>
    </div>
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
