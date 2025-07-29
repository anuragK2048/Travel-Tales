import { useAuth } from "../contexts/FakeAuthContext";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import Button from "../components/Button";

export default function Login() {
  const navigate = useNavigate();
  const { login, user, isAuthenticated } = useAuth();
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("1q2w3e4");

  const handleAuthSubmit = useCallback(
    (e) => {
      // e.preventDefault();
      if (email && password) login(email, password);
    },
    [email, login, password]
  );

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  useEffect(() => {
    setTimeout(() => {
      handleAuthSubmit();
    }, 500);
  }, [handleAuthSubmit]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleAuthSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
