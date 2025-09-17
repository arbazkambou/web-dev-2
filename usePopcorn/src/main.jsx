import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import RatingStar from "./components/RatingStar.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <RatingStar numberOfStars={10} color={"#FFD700"} size={40} />
    <RatingStar numberOfStars={5} color={"red"} /> */}
    <App />
  </StrictMode>
);
