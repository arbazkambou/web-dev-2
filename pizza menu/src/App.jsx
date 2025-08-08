import Footer from "./components/Footer";
import Header from "./components/Header";
import Menu from "./components/Menu";

export function App() {
  return (
    <>
      <Header />
      <Menu />
      <Footer openHour={22} closeHour={10} />
    </>
  );
}
