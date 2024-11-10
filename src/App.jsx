import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Login from "./components/Login";
import Registration from "./components/Registration";
import CreateBlog from "./components/Createblog";
import Blog from "./components/Blog";
import BlogProfilePage from "./components/Blogprofile";
import EditBlog from "./components/EditBlog";
import Alert from "./components/Alert";
import { AnimatePresence, motion } from "framer-motion";
import Footer from "./components/Footer";

// Main App Component
export default function App() {
  const [blogs, setBlogs] = useState([]);
  const [alert, setAlert] = useState({ visible: false, message: "", type: "" });

  // Function to fetch all blogs
  const fetchBlogs = async () => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    try {
      const response = await fetch(`${apiUrl}/blogs`);
      if (response.ok) {
        const data = await response.json();
        setBlogs(data);
      } else {
        console.error("Failed to fetch blogs");
      }
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Function to show alert with custom message and type
  const showAlert = (message, type = "success") => {
    setAlert({ visible: true, message, type });
    setTimeout(() => setAlert({ visible: false, message: "", type: "" }), 3000); // Auto-close after 3 seconds
  };

  return (
    <Router>
      <LocationWrapper
        showAlert={showAlert}
        blogs={blogs}
        setBlogs={setBlogs}
        fetchBlogs={fetchBlogs}
      />
    </Router>
  );
}

// Helper component to use location inside Router
function LocationWrapper({ showAlert, blogs, setBlogs, fetchBlogs }) {
  const location = useLocation();

  return (
    <>
      {/* Display the Alert component when `alert.visible` is true */}
      {alert.visible && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ visible: false, message: "", type: "" })}
        />
      )}

      {/* AnimatePresence for smooth route transitions */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/dashboard"
            element={
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
              >
                <Hero />
                <Blog blogs={blogs} />
                <Footer />
              </motion.div>
            }
          />
          <Route
            path="/login"
            element={
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
              >
                <Login showAlert={showAlert} />
              </motion.div>
            }
          />
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
              >
                <Registration showAlert={showAlert} />
              </motion.div>
            }
          />
          <Route
            path="/create"
            element={
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
              >
                <CreateBlog onSubmit={fetchBlogs} showAlert={showAlert} />
              </motion.div>
            }
          />
          <Route
            path="/profile"
            element={
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
              >
                <BlogProfilePage showAlert={showAlert} />
              </motion.div>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
              >
                <EditBlog
                  blogs={blogs}
                  setBlogs={setBlogs}
                  showAlert={showAlert}
                />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}
