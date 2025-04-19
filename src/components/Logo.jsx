import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
  return (
    <Link to="/">
      <div className={styles.container}>
        <img src="/icon.png" alt="TravelTales logo" className={styles.logo} />
        <div className={styles.name}>TravelTales</div>
      </div>
    </Link>
  );
}

export default Logo;
