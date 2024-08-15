import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RecipeDetailPage from './DB components/RecipeDetailPage';
import AddRecipePage from './DB components/AddRecipePage';
import EditRecipe from './DB components/EditRecipe';
import HomePage from './DB components/HomePage';
import RegisterPage from './DB components/RegisterPage';
import LoginPage from './DB components/LoginPage';
import UserProfilePage from './DB components/UserProfilePage';
import EditProfilePage from './DB components/EditProfilePage';
import kitchen from './kitchen.logo.svg.png.png';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({
    username: 'Lesego',
    email: 'Llewellyn.ml.info@gmail.com',
  });

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.location.href = '/login'; 
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <Router>
      <nav className="navbar">
        <Link to="/">Home</Link>
        {isLoggedIn ? (
          <>
            <Link to="/add">Add Recipe</Link>
            <Link to="/profile">Profile</Link>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </nav>
      <div className="app-container">
        <img src={kitchen} className="kitchen" alt="Kitchen Logo" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddRecipePage />} />
          <Route path="/edit/:id" element={<EditRecipe />} />
          <Route path="/recipes/:id" element={<RecipeDetailPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<UserProfilePage user={user} />} />
          <Route path="/edit-profile" element={<EditProfilePage user={user} updateUser={updateUser} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
