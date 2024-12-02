import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddRecipePage.css";

function AddRecipePage({ addRecipe }) {
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    image: "",
    category: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  };

  const handleAddRecipe = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3006/recipes",
        newRecipe
      );

      addRecipe(response.data);

      navigate("/");
    } catch (error) {
      console.error("There was an error adding the recipe:", error);
    }
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

        <select
          name="category"
          value={newRecipe.category}
          onChange={handleInputChange}
        >
          <option value="">Select Category</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner/Supper">Dinner/Supper</option>
          <option value="Dessert">Dessert</option>
          <option value="Sunday Lunch">Sunday Lunch</option>
        </select>

        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
}

export default AddRecipePage;
