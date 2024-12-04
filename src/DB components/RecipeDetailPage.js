import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './RecipeDetailPage.css'

function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get('http://localhost:3006/recipes');
        const foundRecipe = response.data.find(recipe => recipe.id === Number(id)); 
        if (foundRecipe) {
          if (typeof foundRecipe.ingredients === 'string') {
            foundRecipe.ingredients = foundRecipe.ingredients.split(' ▢');
          }
          setRecipe(foundRecipe);
        } else {
          setError('Recipe not found');
        }
      } catch (error) {
        setError('Error fetching recipe');
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <div className="loading-message">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="recipe-detail-page">
      <h2 className="recipe-title">{recipe.name}</h2>
      <div className="recipe-image-container">
        <img src={recipe.image} alt={recipe.name} className="recipe-detail-image" />
      </div>
      <div className="recipe-details">
        <h3 className="recipe-category">Category: {recipe.category}</h3>
        <h3 className="section-title">Ingredients:</h3>
        <ul className="ingredients-list">
          {Array.isArray(recipe.ingredients) ? (
            recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="ingredient-item">{ingredient}</li>
            ))
          ) : (
            <li>No ingredients available</li>
          )}
        </ul>
        <h3 className="section-title">Instructions:</h3>
        <p className="recipe-instructions">{recipe.instructions}</p>
        <div className="edit-recipe-button">
          <Link to={`/edit/${recipe.id}`} className="btn-edit-recipe">Edit Recipe</Link>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetailPage;
