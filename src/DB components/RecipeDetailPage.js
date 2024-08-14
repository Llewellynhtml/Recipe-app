import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function RecipeDetailPage() {
  const { id } = useParams();  // Extract the recipe ID from the URL
  const [recipe, setRecipe] = useState(null);  // State to hold the recipe data
  const [loading, setLoading] = useState(true);  // State to handle loading status
  const [error, setError] = useState(null);  // State to handle errors

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get('./db.json');  // Fetch the recipes from db.json
        const foundRecipe = response.data.recipes.find(recipe => recipe.id === parseInt(id));
        if (foundRecipe) {
          setRecipe(foundRecipe);  // Set the found recipe to the state
        } else {
          setError('Recipe not found');  // Handle case where recipe is not found
        }
      } catch (error) {
        setError('Error fetching recipe');  // Handle fetch error
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false);  // Stop loading regardless of success or failure
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <div>Loading...</div>;  // Loading state while fetching data
  if (error) return <div>{error}</div>;  // Display error if any

  return (
    <div className="recipe-detail">
      <h2>{recipe.name}</h2>
      <img src={recipe.image} alt={recipe.name} className="recipe-image" />
      <h3>Ingredients:</h3>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      <p>{recipe.instructions}</p>
      <div>
        <Link to={`/edit/${recipe.id}`} className="btn">Edit Recipe</Link>
      </div>
    </div>
  );
}

export default RecipeDetailPage;
