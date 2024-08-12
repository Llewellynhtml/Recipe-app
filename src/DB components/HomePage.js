import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock data instead of fetching from db.json
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

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory ? recipe.category === selectedCategory : true)
  );

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
      </div>
      <input
        type="text"
        placeholder="Search for a recipe..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <div className="recipe-list">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.name} className="recipe-image" />
            <h2>{recipe.name}</h2>
            <p>{recipe.ingredients.join(', ').slice(0, 100)}...</p>
            <Link to={`/recipe/${recipe.id}`} className="view-recipe-button">View Recipe</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
