import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import RecipeDetailPage from "./DB components/RecipeDetailPage";
import AddRecipePage from "./DB components/AddRecipePage";
import EditRecipe from "./DB components/EditRecipe";
import HomePage from "./DB components/HomePage";
import RegisterPage from "./DB components/RegisterPage";
import LoginPage from "./DB components/LoginPage";
import UserProfilePage from "./DB components/UserProfilePage";
import EditProfilePage from "./DB components/EditProfilePage";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3006/recipes")
      .then((response) => response.json())
      .then((data) => setRecipes(data || []))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = "/login";
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const addRecipe = (newRecipe) => {
    fetch("http://localhost:3006/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Network response was not ok: " + response.statusText
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log("Recipe added:", data);
        setRecipes((prevRecipes) => [...prevRecipes, data]);
      })
      .catch((error) => console.error("Error adding recipe:", error));
  };

  return (
    <Router>
      <nav className="navbar">
        <Link to="/">Home</Link>
        {isLoggedIn ? (
          <>
            <Link to="/add">Add Recipe</Link>
            <Link to="/profile">Profile</Link>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
      <div className="app-container">
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/login"
            element={<LoginPage handleLogin={handleLogin} />}
          />
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <HomePage recipes={recipes} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/add"
            element={
              isLoggedIn ? (
                <AddRecipePage addRecipe={addRecipe} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/edit/:id"
            element={isLoggedIn ? <EditRecipe /> : <Navigate to="/login" />}
          />
          <Route
            path="/recipes/:id"
            element={
              isLoggedIn ? <RecipeDetailPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/profile"
            element={
              isLoggedIn ? (
                <UserProfilePage user={user} />
              ) : (
                <Navigate to="/login" />
              )
            }
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
    </Router>
  );
}

export default App;
