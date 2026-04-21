import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/images/waa1.jpg";
import { FaGoogle, FaEye } from "react-icons/fa";
import api from "../services/api";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //////////////////////////////////////////////////
  // ✅ NORMAL LOGIN
  //////////////////////////////////////////////////
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await login(formData.email, formData.password);

    if (res.success) {
      navigate("/");
    } else {
      setError(res.message || "Login failed");
    }
  };

  //////////////////////////////////////////////////
  // ✅ GOOGLE LOGIN (WORKING)
  //////////////////////////////////////////////////
  const handleGoogleLogin = () => {
    const BASE =
      import.meta.env.VITE_API_URL?.replace("/api", "") ||
      "http://localhost:5000";

    window.location.href = `${BASE}/api/auth/google`;
  };

  //////////////////////////////////////////////////
  // ✅ FORGOT PASSWORD (FIXED 🔥)
  //////////////////////////////////////////////////
  const handleForgotPassword = async () => {
    if (!formData.email) {
      alert("Please enter your email first");
      return;
    }

    try {
     const res = await api.post("/auth/forgot-password", {
  email: formData.email,
});

      alert(res.data.message || "Password reset link sent!");
    } catch (err) {
      console.log(err);
      alert(
        err.response?.data?.message || "Error sending reset link"
      );
    }
  };

  return (
    <div className="flex min-h-screen">

      {/* LEFT IMAGE */}
      <div className="hidden md:block md:w-1/2">
        <img
          src={heroImage}
          alt="ICT Girls"
          className="h-full w-full object-cover"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="flex flex-col justify-center w-full md:w-1/2 px-10">

        <h1 className="text-3xl font-bold mb-6 text-blue-900">
          Sign In to ICT Girls
        </h1>

        {/* GOOGLE BUTTON */}
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 border rounded-full p-3 mb-5 hover:bg-gray-50"
        >
          <FaGoogle />
          <span>Sign in with Google</span>
        </button>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm text-gray-500">
            or sign in with email
          </span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* EMAIL */}
          <div>
            <label className="text-sm">Email</label>
            <input
              name="email"
              placeholder="student@aljazeera.edu"
              onChange={handleChange}
              className="w-full p-3 mt-1 border rounded-full outline-none 
              transition duration-300 focus:ring-2 focus:ring-blue-500 hover:shadow-md"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <div className="flex justify-between text-sm">
              <label>Password</label>
              <span
                onClick={handleForgotPassword}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Forgot password?
              </span>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                className="w-full p-3 mt-1 border rounded-full outline-none pr-10 
                transition duration-300 focus:ring-2 focus:ring-blue-500 hover:shadow-md"
              />

              <FaEye
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 cursor-pointer text-gray-500 hover:text-blue-600"
              />
            </div>
          </div>

          {/* ✅ REMEMBER ME RIGHT SIDE */}
          <div className="flex justify-end items-center gap-2 text-sm">
            <span>Remember me</span>
            <input type="checkbox" />
          </div>

          {/* BUTTON */}
          <button
            className="w-full bg-gradient-to-r from-blue-500 to-blue-900 text-white p-3 rounded-full mt-3 
            transition duration-300 hover:opacity-90 hover:shadow-lg"
          >
            Sign In
          </button>
        </form>

        {/* CREATE ACCOUNT */}
        <p className="text-sm text-center mt-5">
          New to ICT Girls?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Create an account
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;