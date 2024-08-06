import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeDetailPage from './DB components/RecipeDetailPage';
import AddRecipe from './DB components/AddRecipe';
import EditRecipe from './DB components/EditRecipe';
import HomePage from './DB components/HomePage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <h1>Ukutya</h1>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddRecipe />} />
          <Route path="/edit/:id" element={<EditRecipe />} />
          <Route path="/recipes/:id" element={<RecipeDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
