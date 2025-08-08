export default function Footer({ openHour, closeHour }) {
  const currentHour = new Date().getHours();
  const isOpen = currentHour >= openHour && currentHour <= closeHour;

  return (
    <footer className="footer">
      <div className="order">
        {isOpen ? (
          <p>We're open from 12:00 to 22:00. Come visit us or order online.</p>
        ) : (
          <p>We are closed now</p>
        )}

        {isOpen && <button className="btn">Order</button>}
      </div>
    </footer>
  );
}
