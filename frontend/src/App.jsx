import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from "./context/AuthContext";


import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import Community from "./pages/Community";
import GoogleSuccess from "./pages/GoogleSuccess";
import BlogDetails from "./pages/BlogDetails";
import Shop from "./pages/Shop";
import Categories from "./pages/Categories";
import Events from "./pages/Events";
import Innovators from "./pages/Innovators";
import EventDetails from "./pages/eventDetails";
import Contact from "./pages/Contact";

//////////////////////////////////////////////////
// 🔒 Protected Route
//////////////////////////////////////////////////
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

//////////////////////////////////////////////////
// 🚀 APP
//////////////////////////////////////////////////
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>

            {/* GOOGLE LOGIN */}
            <Route path="/google-success" element={<GoogleSuccess />} />

            {/* MAIN LAYOUT */}
            <Route path="/" element={<Layout />}>

              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="community" element={<Community />} />

              {/* BLOG */}
              <Route path="blog" element={<Blog />} />
             <Route path="/innovators/:id" element={<BlogDetails />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/category/:name" element={<Categories/>} />
              <Route path="/events" element={<Events />} />
              <Route path="/innovators" element={<Innovators />} />
              <Route path="/events/:id" element={<EventDetails />} />
             <Route path="/contact" element={<Contact />} />

              {/* PROTECTED */}
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <div>Dashboard</div>
                  </ProtectedRoute>
                }
              />

            </Route>

          </Routes>
        </AuthProvider>
      </Router>

      <Toaster />
    </>
  );
}

export default App;