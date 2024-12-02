import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AddRecipePage from './AddRecipePage';
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

  
  const addRecipe = (newRecipe) => {
    setRecipes((prevRecipes) => {
      
      const updatedRecipes = [...prevRecipes, newRecipe];
      setFilteredRecipes(updatedRecipes); 
      return updatedRecipes; 
    });
  };

  return (
    <div className="homepage-container">
      <div className="filter-buttons">
        <button onClick={() => setSelectedCategory('')}>All</button>
        <button onClick={() => setSelectedCategory('Breakfast')}>Breakfast</button>
        <button onClick={() => setSelectedCategory('Lunch')}>Lunch</button>
        <button onClick={() => setSelectedCategory('Dinner/Supper')}>Dinner/Supper</button>
        <button onClick={() => setSelectedCategory('Dessert')}>Dessert</button>
        <button onClick={() => setSelectedCategory('Sunday Lunch')}>Sunday Lunch</button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a recipe..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      <div>
        <AddRecipePage addRecipe={addRecipe} />
      </div>

      {filteredRecipes.length === 0 ? (
        <p>No recipes found</p>
      ) : (
        <div className="recipe-grid">
          {filteredRecipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img src={recipe.image} alt={recipe.name} className="recipe-image" />
              <h3>{recipe.name}</h3>
              <div><Link to={`/recipes/${recipe.id}`} className="view-recipe-button">Display Recipe</Link></div>
              <button className="delete-button" onClick={() => handleDelete(recipe.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;