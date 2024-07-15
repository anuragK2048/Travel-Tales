import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/">
      <img src="/icon.png" alt="TravelTales logo" className={styles.logo} />
      <img
        src="public/output-onlinepngtools.png"
        width={"200px"}
        height={"50px"}
        alt="logo"
        className={styles.logoName}
      />
    </Link>
  );
}

export default Logo;
