import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddRecipePage({ addRecipe }) {
  const [newRecipe, setNewRecipe] = useState({
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

  const handleAddRecipe = () => {
    addRecipe(newRecipe);
    console.log(newRecipe); 
    navigate('/'); 
  };


  return (
    <div className="add-recipe-page">
      <h1>Add a New Recipe</h1>
      <input
        type="text"
        name="name"
        placeholder="Recipe Name"
        value={newRecipe.name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="ingredients"
        placeholder="Ingredients"
        value={newRecipe.ingredients}
        onChange={handleInputChange}
      />
      <textarea
        name="instructions"
        placeholder="Instructions"
        value={newRecipe.instructions}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={newRecipe.image}
        onChange={handleInputChange}
      />
      <button onClick={handleAddRecipe}>Add Recipe</button>
    </div>
  );
}

export default AddRecipePage;
