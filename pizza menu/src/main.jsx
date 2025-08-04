import { createRoot } from "react-dom/client";
import "./index.css";

function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

function Pizza() {
  return (
    <li className="pizza">
      <img src="pizzas/funghi.jpg" alt="pizza img" />
      <div>
        <h3>Focaccia</h3>
        <p>Bread with italian olive oil and rosemary</p>
        <span>6</span>
      </div>
    </li>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="order">
        <p>We're open from 12:00 to 22:00. Come visit us or order online.</p>
        <button className="btn">Order</button>
      </div>
    </footer>
  );
}

function Menu() {
  return (
    <main className="menu">
      <h2>Our menu</h2>
      <p>
        Authentic Italian cuisine. 6 creative dishes to choose from. All from
        our stone oven, all organic, all delicious.
      </p>
      <ul className="pizzas">
        <Pizza />
        <Pizza />
        <Pizza />
        <Pizza />
        <Pizza />
      </ul>
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <div className="container">
    <Header />
    <Menu />
    <Footer />
  </div>
);
