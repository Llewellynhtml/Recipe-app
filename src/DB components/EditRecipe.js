import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

function EditRecipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    nutrition: '',
    category: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get('/db.json');
        const foundRecipe = response.data.recipes.find(recipe => recipe.id === parseInt(id));
        if (foundRecipe) {
          setRecipe(foundRecipe);
        } else {
          console.error('Recipe not found');
        }
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Recipe updated:', recipe);
      navigate('/'); 
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Ingredients (one per line):</label>
          <textarea
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Instructions:</label>
          <textarea
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Nutrition:</label>
          <textarea
            name="nutrition"
            value={recipe.nutrition}
            onChange={handleChange}
            required
          />
        </div>
        
      
        <select
          name="category"
          value={recipe.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner/Supper">Dinner/Supper</option>
          <option value="Dessert">Dessert</option>
          <option value="Sunday Lunch">Sunday Lunch</option>
        </select>

        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
}

export default EditRecipe;
