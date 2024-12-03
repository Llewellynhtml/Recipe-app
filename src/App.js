import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import RecipeDetailPage from "./DB components/RecipeDetailPage";
import AddRecipePage from "./DB components/AddRecipePage";
import EditRecipe from "./DB components/EditRecipe";
import HomePage from "./DB components/HomePage";
import RegisterPage from "./DB components/RegisterPage";
import LoginPage from "./DB components/LoginPage";
import EditProfilePage from "./DB components/EditProfilePage";
import Swal from "sweetalert2"; // Import SweetAlert2
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Load the login status and user info from localStorage when the app starts
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedLoginStatus === "true" && storedUser) {
      setIsLoggedIn(true);
      setUser(storedUser);
    }
  }, []); // Empty dependency array to run this effect only on mount

  useEffect(() => {
    fetch("http://localhost:3006/recipes")
      .then((response) => response.json())
      .then((data) => setRecipes(data || []))
      .catch((error) => {
        console.error("Error fetching recipes:", error);
        Swal.fire({
          title: "Error!",
          text: "There was an error fetching the recipes. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  }, []); // Only fetch recipes once when the component mounts

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(userData));

    // SweetAlert for successful login
    Swal.fire({
      title: "Welcome!",
      text: `Hello, ${userData.username}!`,
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
        window.location.href = "/login"; // Redirect to login page
      }
    });
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // SweetAlert for profile update success
    Swal.fire({
      title: "Profile Updated!",
      text: "Your profile has been updated successfully.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const addRecipe = (newRecipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);

    // SweetAlert for recipe addition success
    Swal.fire({
      title: "Recipe Added!",
      text: "Your new recipe has been added.",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        {isLoggedIn ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/add">Add Recipe</Link>
            <Link to="/profile">Profile</Link>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : null}
      </nav>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/login"
          element={<LoginPage handleLogin={handleLogin} />}
        />
        <Route
          path="/"
          element={isLoggedIn ? <HomePage recipes={recipes} /> : <Navigate to="/login" />}
        />
        <Route
          path="/add"
          element={isLoggedIn ? <AddRecipePage addRecipe={addRecipe} /> : <Navigate to="/" />}
        />
        <Route
          path="/edit/:id"
          element={isLoggedIn ? <EditRecipe /> : <Navigate to="/login" />}
        />
        <Route
          path="/recipes/:id"
          element={isLoggedIn ? <RecipeDetailPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit-profile"
          element={isLoggedIn ? (
            <EditProfilePage user={user} updateUser={updateUser} />
          ) : (
            <Navigate to="/login" />
          )}
        />
      </Routes>
    </div>
  );
}

export default App;
