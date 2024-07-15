import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";
import { useCities } from "../contexts/CitiesContext";

function AppNav() {
  const { setMapSearchInputValue } = useCities();
  function handleClick() {
    const url = new URL(window.location.href);
    if (url.pathname === "/app/form") setMapSearchInputValue("");
  }
  return (
    <div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to="cities" onClick={handleClick}>
              Cities
            </NavLink>
          </li>
          <li>
            <NavLink to="countries" onClick={handleClick}>
              Countries
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AppNav;
