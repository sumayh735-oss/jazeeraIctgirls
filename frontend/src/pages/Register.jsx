import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import heroImage from "../assets/images/waa1.jpg";

const Register = () => {
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "student",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(formData);

    if (res.success) {
      await login(formData.email, formData.password);
      navigate("/");
    } else {
      setError(res.message);
    }
  };

  return (
      <div className="flex min-h-screen w-full">
      {/* Left image */}
      <div className="hidden md:block md:w-1/2">
        <img src={heroImage} alt="ICT Girls" className="h-full w-full object-cover" />
      </div>

      {/* RIGHT FORM */}
      <div className="auth-right">
        <h1>Join ICT Girls</h1>

        <div className="role-switch">
          <button
            className={formData.role === "student" ? "active" : ""}
            onClick={() => setFormData({ ...formData, role: "student" })}
          >
            Student
          </button>
          <button
            className={formData.role === "mentor" ? "active" : ""}
            onClick={() => setFormData({ ...formData, role: "mentor" })}
          >
            Mentor
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
<input
  name="fullName"
  placeholder="Your full name"
  onChange={handleChange}
  className="w-full p-3 mb-3 border rounded-full outline-none 
  transition duration-300 hover:shadow-md hover:border-blue-400 focus:ring-2 focus:ring-blue-500"
/>

<input
  name="email"
  placeholder="Email"
  onChange={handleChange}
  className="w-full p-3 mb-3 border rounded-full outline-none 
  transition duration-300 hover:shadow-md hover:border-blue-400 focus:ring-2 focus:ring-blue-500"
/>

<input
  type="password"
  name="password"
  placeholder="Password"
  onChange={handleChange}
  className="w-full p-3 mb-3 border rounded-full outline-none 
  transition duration-300 hover:shadow-md hover:border-blue-400 focus:ring-2 focus:ring-blue-500"
/>

          <button type="submit" className="submit-btn">
            Join Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;