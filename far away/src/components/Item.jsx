export function Item({ item, handleDelete, handleStatus }) {
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
