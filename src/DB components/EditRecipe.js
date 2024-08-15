import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // useNavigate instead of useHistory
import axios from 'axios';


function EditRecipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: '',
    instructions: '',
    nutrition:'',
  });
  const navigate = useNavigate(); // useNavigate instead of useHistory

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get('/db.json');
        const foundRecipe = response.data.recipes.find(recipe => recipe.id === parseInt(id));
        setRecipe(foundRecipe);
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
      // Here we would normally send a PUT request to a server to update the recipe.
      console.log('Recipe updated:', recipe);
      navigate('/'); // use navigate to redirect
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
        <label>nutrition</label>
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
