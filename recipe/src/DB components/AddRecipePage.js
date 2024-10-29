import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddRecipePage.css';

function AddRecipePage({ addRecipe }) {
  const [newRecipe, setNewRecipe] = useState({
    id: '',
    name: '',
    ingredients: '',
    instructions: '',
    image: '', 
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  };

  const handleAddRecipe = (e) => {
    e.preventDefault();
    const newRecipeWithId = { ...newRecipe, id: Date.now() }; 
    addRecipe(newRecipeWithId); // Ensure this function updates the recipe list
    navigate('/');
  };

  return (
    <div className="add-recipe-page">
      <h1>Add a New Recipe</h1>
      <form onSubmit={handleAddRecipe}>
        <input
          type="text"
          name="name"
          placeholder="Recipe Name"
          value={newRecipe.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="ingredients"
          placeholder="Ingredients"
          value={newRecipe.ingredients}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="instructions"
          placeholder="Instructions"
          value={newRecipe.instructions}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newRecipe.image}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}

export default AddRecipePage;
