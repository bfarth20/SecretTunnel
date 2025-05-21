import { createContext, useContext, useState, useEffect } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setLocation("TABLET");
    }
  }, []);

  async function signup(username, password) {
    try {
      setError(null);
      const response = await fetch(`${API}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (result.success) {
        setToken(result.token);
        sessionStorage.setItem("token", result.token); //Extension
        setLocation("TABLET");
      } else {
        setError(result.message || "Signup failed");
      }
    } catch (err) {
      setError("Signup error: " + err.message);
    }
  }

  async function authenticate() {
    if (!token) {
      throw new Error("No token available for authentication.");
    }

    try {
      setError(null);
      const response = await fetch(`${API}/authenticate`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (result.success) {
        setLocation("Tunnel");
      } else {
        setError(result.message || "Authentication failed");
      }
    } catch (err) {
      setError("Authentication error: " + err.message);
    }
  }

  const value = { location, signup, authenticate, error };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
