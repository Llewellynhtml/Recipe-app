import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import './AddRecipePage.css';

function AddRecipePage({ addRecipe }) {
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    image: '',
    category: '',
    id: null,  // Initialize as null, will be updated after fetching the max id
  });

  const navigate = useNavigate();

  // Fetch max id when component mounts to ensure a unique id is set for new recipe
  useEffect(() => {
    const fetchMaxId = async () => {
      try {
        const response = await axios.get('http://localhost:3006/recipes');
        const maxId = response.data.reduce(
          (max, recipe) => Math.max(max, recipe.id),
          0
        );
        // Set the id for the new recipe (maxId + 1)
        setNewRecipe((prevRecipe) => ({
          ...prevRecipe,
          id: maxId + 1, // Increment by 1 from the highest existing id
        }));
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchMaxId();
  }, []);

  // Handle input changes to update state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe({ ...newRecipe, [name]: value });
  };

  // Handle form submission to add a new recipe
  const handleAddRecipe = async (e) => {
    e.preventDefault();

    try {
      // Ensure id is a number before posting the recipe
      const recipeWithValidId = { ...newRecipe, id: Number(newRecipe.id) };

      const response = await axios.post(
        'http://localhost:3006/recipes',
        recipeWithValidId
      );

      // Add the new recipe to the parent component (or update the state)
      addRecipe(response.data);

      // SweetAlert for success
      Swal.fire({
        title: 'Success!',
        text: 'Recipe has been added successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        // Redirect after adding a recipe (optional)
        navigate('/recipes'); // Redirect to the recipes list page after success
      });

      // Reset the form state after success
      setNewRecipe({
        name: '',
        ingredients: '',
        instructions: '',
        image: '',
        category: '',
        id: null,
      });
    } catch (error) {
      console.error('There was an error adding the recipe:', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an error adding your recipe. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
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
          required
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
