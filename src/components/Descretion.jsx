import styles from "./Descretion.module.css";
import { useNavigate } from "react-router-dom";

function Descretion() {
  const navigate = useNavigate();
  return (
    <>
      (
      <div className={styles.user}>
        <span>Random images are displayed right now!</span>
      </div>
      )
    </>
  );
}

export default Descretion;
