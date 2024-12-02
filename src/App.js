import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import RecipeDetailPage from "./DB components/RecipeDetailPage";
import AddRecipePage from "./DB components/AddRecipePage";
import EditRecipe from "./DB components/EditRecipe";
import HomePage from "./DB components/HomePage";
import RegisterPage from "./DB components/RegisterPage";
import LoginPage from "./DB components/LoginPage";
import EditProfilePage from "./DB components/EditProfilePage";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);


  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedLoginStatus === "true" && storedUser) {
      setIsLoggedIn(true);
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:3006/recipes")
      .then((response) => response.json())
      .then((data) => setRecipes(data || []))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    window.location.href = "/login"; 
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const addRecipe = (newRecipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
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
          element={
            isLoggedIn ? <AddRecipePage addRecipe={addRecipe} /> : <Navigate to="/login" />
          }
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
          element={
            isLoggedIn ? (
              <EditProfilePage user={user} updateUser={updateUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
