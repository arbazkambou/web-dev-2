import { useState } from "react";
import { Item } from "./Item";

export function PackingList({ items, handleDelete, handleStatus, setItems }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") {
    sortedItems = items;
  }

  if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

    console.log(sortedItems);
  }

  if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.isPacked) - Number(b.isPacked));
  }

  function handleSortBy(e) {
    setSortBy(e.target.value);
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item, index) => (
          <Item
            key={index}
            item={item}
            handleDelete={handleDelete}
            handleStatus={handleStatus}
          />
        ))}
      </ul>

      <select className="actions" value={sortBy} onChange={handleSortBy}>
        <option value="input">By Input</option>
        <option value="description">By Description</option>
        <option value="packed">By Packed Status</option>
      </select>

      <button onClick={() => setItems([])}>Clear All</button>
    </div>
  );
}
