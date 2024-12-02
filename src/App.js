import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import RecipeDetailPage from './DB components/RecipeDetailPage';
import AddRecipePage from './DB components/AddRecipePage';
import EditRecipe from './DB components/EditRecipe';
import HomePage from './DB components/HomePage';
import RegisterPage from './DB components/RegisterPage';
import LoginPage from './DB components/LoginPage';
import UserProfilePage from './DB components/UserProfilePage';
import EditProfilePage from './DB components/EditProfilePage';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [user, setUser] = useState({
    username: 'Lesego',
    email: 'Llewellyn.ml.info@gmail.com',
  });

  const navigate = useNavigate(); 

  const handleLogout = () => {
    setIsLoggedIn(false); 
    navigate('/login'); 
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login'); 
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="app-container">
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
      <Routes>
        
        <Route path="/" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/add" element={isLoggedIn ? <AddRecipePage /> : <Navigate to="/login" />} />
        <Route path="/edit/:id" element={isLoggedIn ? <EditRecipe /> : <Navigate to="/login" />} />
        <Route path="/recipes/:id" element={<RecipeDetailPage />} />

      
        <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <RegisterPage />} />
        
        
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />} />

        <Route path="/profile" element={isLoggedIn ? <UserProfilePage user={user} /> : <Navigate to="/login" />} />
        <Route path="/edit-profile" element={isLoggedIn ? <EditProfilePage user={user} updateUser={updateUser} /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
