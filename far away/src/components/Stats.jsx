export function Stats({ items }) {
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
