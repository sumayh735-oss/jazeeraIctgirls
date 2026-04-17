import { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ LOGIN
  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);

      if (data.success && data.user) {
        // ✅ FIX HERE
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        setUser(data.user);
      }

      return data;
    } catch (err) {
      return { success: false, message: "Login error" };
    }
  };

  // REGISTER
  const register = async (formData) => {
    try {
      const data = await authService.register(formData);
      return data;
    } catch (err) {
      return { success: false, message: "Register error" };
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // ✅ important
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);