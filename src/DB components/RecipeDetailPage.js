import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function RecipeDetailPage() {
  const { id } = useParams();  
  const [recipe, setRecipe] = useState(null);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);  

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get('/db.json');
        const foundRecipe = response.data.recipes.find(recipe => recipe.id === parseInt(id));
        if (foundRecipe) {
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

  if (loading) return <div>Loading...</div>; 
  if (error) return <div>{error}</div>;  

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
