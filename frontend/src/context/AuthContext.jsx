import { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //////////////////////////////////////////////////
  // LOAD USER (FIXED 🔥)
  //////////////////////////////////////////////////
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else if (token) {
  setUser(null);

    }
  }, []);

  //////////////////////////////////////////////////
  // LOGIN
  //////////////////////////////////////////////////
  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);

      if (data.success && data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        setUser(data.user);
      }

      return data;
    } catch {
      return { success: false, message: "Login error" };
    }
  };

  //////////////////////////////////////////////////
  // LOGOUT (FIXED 🔥)
  //////////////////////////////////////////////////
  const logout = () => {
    localStorage.clear(); // ✅ remove everything
    setUser(null);

    // 👉 force redirect (VERY IMPORTANT)
    window.location.href = "/login";
  };

  //////////////////////////////////////////////////
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!localStorage.getItem("token"), // ✅ KEY FIX
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);