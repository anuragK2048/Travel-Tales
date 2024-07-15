import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  function reducer(state, action) {
    switch (action.type) {
      case "login":
        return { ...state, user: action.payload, isAuthenticated: true };
      case "logout":
        return { ...state, user: null, isAuthenticated: false };
      default:
        console.err("action type not available in reducer function");
    }
  }
  const initialState = {
    user: null,
    isAuthenticated: false,
  };
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const FAKE_USER = {
    name: "A",
    email: "test@example.com",
    password: "1q2w3e4",
    avatar: "https://d22e6o9mp4t2lx.cloudfront.net/cms/pfp3_d7855f9562.webp",
  };
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    console.log("AuthContext was used outside of its scope");
  return context;
}

export { AuthProvider, useAuth };
