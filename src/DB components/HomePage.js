import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import axios from 'axios';

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3006/recipes');
        console.log('Fetched Recipes:', response.data);
        setRecipes(response.data);
        setFilteredRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
    setRecipes(updatedRecipes);
    setFilteredRecipes(updatedRecipes);
  };

  const handleSearch = () => {
    const filtered = recipes.filter(recipe =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory ? recipe.category === selectedCategory : true)
    );
    setFilteredRecipes(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm, selectedCategory, recipes]);

  return (
    <div className="homepage-wrapper">
      <div className="filter-options">
        <button onClick={() => setSelectedCategory('')}>All</button>
        <button onClick={() => setSelectedCategory('Breakfast')}>Breakfast</button>
        <button onClick={() => setSelectedCategory('Lunch')}>Lunch</button>
        <button onClick={() => setSelectedCategory('Dinner/Supper')}>Dinner/Supper</button>
        <button onClick={() => setSelectedCategory('Dessert')}>Dessert</button>
        <button onClick={() => setSelectedCategory('Sunday Lunch')}>Sunday Lunch</button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a recipe..."
          className="search-input-field"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      <div className="recipe-card-container">
        {filteredRecipes.length === 0 ? (
          <p className="no-recipes-message">No recipes found</p>
        ) : (
          filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.image} alt={recipe.name} className="recipe-card-image" />
              <h3 className="recipe-title">{recipe.name}</h3>
              <div><Link to={`/recipes/${recipe.id}`} className="view-recipe-btn">Display Recipe</Link></div>
              <button className="delete-recipe-btn" onClick={() => handleDelete(recipe.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;
