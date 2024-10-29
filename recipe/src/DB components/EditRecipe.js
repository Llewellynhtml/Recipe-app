import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './EditRecipe.css';

function EditRecipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3006/recipes/${id}`);
        setRecipe(response.data);
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
      console.log('Updated recipe data:', recipe);
      await axios.put(`http://localhost:3006/recipes/${id}`, recipe);
      console.log('Recipe updated successfully:', recipe);
      navigate(`/recipes/${id}`);
    } catch (error) {
      console.error('Error updating recipe:', error.response || error.message);
    }
  };

  if (!recipe) {
    return <p>Loading...</p>;
  }

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
        <button type="submit" className="btn">Update Recipe</button>
      </form>
    </div>
  );
}

export default EditRecipe;
