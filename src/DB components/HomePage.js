import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newRecipe, setNewRecipe] =useState({name:'', ingredients:'', instructions:'', image:'',});
  const [editRecipe, setEditRecipe] = useState(null);
  const [filteredRecipes, setFilteredRecipes] = useState(recipes)

  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const response = {
          data: {
            recipes: [
              // Breakfast Recipes
              {
                id: 1,
                name: "Waffles",
                image: "http://surl.li/kzxova",
                ingredients: ["1 1/2 cups flour", "1 tbsp sugar", "2 tsp baking powder"],
                instructions: "1. Mix dry ingredients...",
                category: "Breakfast"
              },
              {
                id: 2,
                name: "Pancakes – Fluffy, Quick, No-Fail",
                image: "http://surl.li/fxjlbj",
                ingredients: ["1 cup flour", "1 tbsp sugar", "1 egg"],
                instructions: "1. Mix dry ingredients...",
                category: "Breakfast"
              },
              {
                id: 3,
                name: "Homemade Pork Sausage Patties",
                image: "http://surl.li/rbaokm",
                ingredients: ["500g pork mince", "1 tbsp sage", "1 tsp thyme"],
                instructions: "1. Mix all ingredients...",
                category: "Breakfast"
              },
              // Lunch Recipes
              {
                id: 4,
                name: "Cheesy Zucchini and Pasta Slice",
                image: "http://surl.li/pwnsro",
                ingredients: ["2 cups cooked pasta", "1 cup grated zucchini"],
                instructions: "1. Mix ingredients...",
                category: "Lunch"
              },
              {
                id: 5,
                name: "Spaghetti Bolognese Cups",
                image: "http://surl.li/wxjbwi",
                ingredients: ["200g spaghetti", "1 cup Bolognese sauce"],
                instructions: "1. Cook spaghetti...",
                category: "Lunch"
              },
              // Dinner/Supper Recipes
              {
                id: 6,
                name: "Lamb Chops with Rosemary Gravy (loin chops, forequarter, cutlets)",
                image: "http://surl.li/qcmkmd",
                ingredients: ["4 lamb chops", "1 can tomato puree"],
                instructions: "1. Sear lamb chops...",
                category: "Dinner/Supper"
              },
              {
                id: 7,
                name: "Asparagus and Ham Filo Pie with Salsa Verde",
                image: "http://surl.li/pqwaxv",
                ingredients: ["4 sheets filo pastry", "100g ham"],
                instructions: "1. Preheat oven...",
                category: "Dinner/Supper"
              },
              {
                id: 8,
                name: "Brown Rice and Salmon Patties",
                image: "http://surl.li/ivdwjm",
                ingredients: ["1/2 cup brown rice", "415g can red salmon"],
                instructions: "1. Cook rice...",
                category: "Dinner/Supper"
              },
              {
                id: 9,
                name: "Best-Ever Homemade Sausage Rolls",
                image: "http://surl.li/bpyjqt",
                ingredients: ["4 sheets puff pastry", "500g veal mince"],
                instructions: "1. Preheat oven...",
                category: "Dinner/Supper"
              },
              {
                id: 10,
                name: "Italian Lamb Stew",
                image: "http://surl.li/gcrdws",
                ingredients: ["600g diced lamb", "1 large zucchini"],
                instructions: "1. Combine flour and paprika...",
                category: "Dinner/Supper"
              },
              {
                id: 11,
                name: "Braised Beef Short Ribs",
                image: "http://surl.li/mmwurb",
                ingredients: ["1 kg beef short ribs", "2 cups beef stock"],
                instructions: "1. Sear the ribs...",
                category: "Dinner/Supper"
              },
              // Dessert Recipes
              {
                id: 12,
                name: "Classic Chewy Brownie",
                image: "http://surl.li/xfvvpc",
                ingredients: ["1 cup flour", "1/2 cup cocoa powder"],
                instructions: "1. Preheat oven...",
                category: "Dessert"
              },
              {
                id: 13,
                name: "Easy Banana Cake",
                image: "http://surl.li/gwqmzs",
                ingredients: ["2 ripe bananas", "1 cup flour"],
                instructions: "1. Preheat oven...",
                category: "Dessert"
              },
              // Sunday Lunch Recipes
              {
                id: 14,
                name: "Seven Colours Factory",
                image: "http://surl.li/xvptxe",
                ingredients: ["2 cups rice", "500g beef stew"],
                instructions: "1. Cook rice...",
                category: "Sunday Lunch"
              },
            ]
          }
        };

        setRecipes(response.data.recipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchData();
  }, []);

const handleAddRecipe = () => {
const newId = recipes.length ?[ recipes.length - 1].id + 1: 1;
const updatedRecipes = [...recipes, {id: newId, ...newRecipe}];
setRecipes(updatedRecipes);
setFilteredRecipes(updatedRecipes)
setNewRecipe({name:'', ingredients:'', instructions:'', image:'' });
};

const handleDelete = (id) => {
const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
setRecipes(updatedRecipes)
setFilteredRecipes(updatedRecipes);
};

const handleupdateRecipe = () => {
const updatedRecipes = recipes.map(recipe => recipe.id === editRecipe.id ? editRecipe : recipe);
setRecipes(updatedRecipes);
setFilteredRecipes(updatedRecipes);
setEditRecipe(null);
};

  const handleSearch = () => {
  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory ? recipe.category === selectedCategory : true)
  );setFilteredRecipes(recipes)
  
};
  return (
    <div className="home-page">
      <h1>Recipe App</h1>
      <div className="category-buttons">
        <button onClick={() => setSelectedCategory('')}>All</button>
        <button onClick={() => setSelectedCategory('Breakfast')}>Breakfast</button>
        <button onClick={() => setSelectedCategory('Lunch')}>Lunch</button>
        <button onClick={() => setSelectedCategory('Dinner/Supper')}>Dinner/Supper</button>
        <button onClick={() => setSelectedCategory('Dessert')}>Dessert</button>
        <button onClick={() => setSelectedCategory('Sunday Lunch')}>Sunday Lunch</button>
        <button onClick={() => setSelectedCategory('Add recipe')}>Add Recipe</button>
      </div>
      <div className="homepage_search" >
      <input
        type="text"
        placeholder="Search for a recipe..."
        className="homepage_search-input"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}  
      />
      <button className='homepage_search-button' onClick={handleSearch}>Search</button>
      </div>

      <div className="homepage__add-recipe">
        <h2>Add a New Recipe</h2>
        <input
          type="text"
          placeholder="Recipe Name"
          className="homepage__add-input"
          value={newRecipe.name}
          onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Ingredients"
          className="homepage__add-input"
          value={newRecipe.ingredients}
          onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
        />
        <textarea
          placeholder="Instructions"
          className="homepage__add-textarea"
          value={newRecipe.instructions}
          onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
        />
      </div>
      <button className="homepage__add-button" onClick={handleAddRecipe}>Add Recipe</button>


      {editRecipe && (
        <div className="homepage__edit-recipe">
          <h2>Edit Recipe</h2>
          <input
            type="text"
            placeholder="Recipe Name"
            className="homepage__edit-input"
            value={editRecipe.name}
            onChange={(e) => setEditRecipe({ ...editRecipe, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Ingredients"
            className="homepage__edit-input"
            value={editRecipe.ingredients}
            onChange={(e) => setEditRecipe({ ...editRecipe, ingredients: e.target.value })}
          />
          <textarea
            placeholder="Instructions"
            className="homepage__edit-textarea"
            value={editRecipe.instructions}
            onChange={(e) => setEditRecipe({ ...editRecipe, instructions: e.target.value })}
          />
          <button className="homepage__update-button" onClick={handleupdateRecipe}>Update Recipe</button>
        </div>
      )}

      <div className="recipe-list">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.name} className="recipe-image" />
            <h2>{recipe.name}</h2>
            <button className="homepage__delete-button" onClick={() => handleDelete(recipe.id)}>Delete</button>
            <button className="homepage__edit-button" onClick={() => setEditRecipe(recipe)}>Edit</button>
            <div><Link to={`/recipe/${recipe.id}`} className="view-recipe-button">View Recipe</Link></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
