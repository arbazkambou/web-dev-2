export default function Pizza(props) {
  const { ing, img, name, price, soldOut } = props;

  // if (soldOut) return null;

  return (
    <li className={`pizza ${soldOut ? "sold-out" : ""}`}>
      <img src={img} alt="pizza img" />
      <div>
        <h3>{name}</h3>
        <p>{ing}</p>
        <span>{soldOut ? "Sold Out" : price}</span>
      </div>
    </li>
  );
}
