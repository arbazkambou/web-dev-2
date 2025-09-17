import Logo from "./Logo";
import Search from "./Search";
import SearchResult from "./SearchResult";

function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

export default Navbar;
