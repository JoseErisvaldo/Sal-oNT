import React, { createContext, useState, useEffect } from "react";
import supabase from "../../supabase";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("access_token");

    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  async function login(email, password) {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) throw error;

      if (data) {
        console.log(data.user);
        
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("access_token", data.session.access_token);
        
        setUser(data.user);
        setToken(data.session.access_token);

        navigate("/home");
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      setLoading(false);
    }
  }

  const logout = () => {
    // Clear user data and token from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");

    // Clear context state
    setUser(null);
    setToken(null);

    // Optionally, redirect to login page or show a message
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ login, logout, user, token, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
