import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
                "id": 1,
                "name": "Breakfast Burrito",
                "image": "https://example.com/breakfast-burrito.jpg",
                "ingredients": ["2 large eggs", "1/2 cup shredded cheese"],
                "instructions": "1. Scramble eggs and add cheese...",
                "category": "Breakfast"
              },
              // Lunch Recipes
              {
                "id": 2,
                "name": "Madombi (Dumplings)",
                "image": "https://www.thespruceeats.com/thmb/V1-lA9Vc1b7jo8zSQtdD0sCoumI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/madombi-dumplings-recipe-5071291-hero-01-f1c69d246588483cbee4d9e0ef38d8f5.jpg",
                "ingredients": ["3 cups (425 grams) all-purpose flour"],
                "instructions": "1. Mix flour, baking powder, salt, yeast, and sugar...",
                "category": "Lunch"
              },
              {
                "id": 3,
                "name": "Chicken and Pea Curry",
                "image": "https://www.whatsfordinner.co.za/recipe/poultry/252776-chicken-and-pea-curry/",
                "ingredients": ["2 tablespoons vegetable oil"],
                "instructions": "1. Heat oil in a large pot...",
                "category": "Lunch"
              },
              {
                "id": 4,
                "name": "Speedy Chicken Curry with Flatbreads and Cucumber Raita",
                "image": "https://www.whatsfordinner.co.za/recipe/poultry/253065-speedy-chicken-curry-with-flatbreads-and-cucumber-raita/",
                "ingredients": ["2 tablespoons vegetable oil"],
                "instructions": "1. Heat oil in a large pan...",
                "category": "Lunch"
              },
              // Dinner/Supper Recipes
              {
                "id": 5,
                "name": "Beef Bobotie",
                "image": "https://www.thespruceeats.com/thmb/StIKrJfCk19Nuxbvrq7zXYGtjZQ=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/beef-bobotie-recipe-39440-hero-01-1233369c77c849bb8b8367b47b984cf2.jpg",
                "ingredients": ["2 tablespoons butter", "2 medium onions, finely chopped"],
                "instructions": "1. Preheat oven to 180°C...",
                "category": "Dinner/Supper"
              },
              {
                "id": 6,
                "name": "Chicken Curry",
                "image": "https://www.thespruceeats.com/thmb/cMyv1JrrHj6fEA3vv8VMB9PatP4=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/durban-chicken-curry-recipe-39451-hero-01-1924bfb1eeaa403c8d26a3bca9f68884.jpg",
                "ingredients": ["2 tablespoons ghee"],
                "instructions": "1. Heat ghee and oil in a large pot...",
                "category": "Dinner/Supper"
              },
              {
                "id": 7,
                "name": "Everyday Chicken Curry",
                "image": "https://www.whatsfordinner.co.za/recipe/poultry/252778-everyday-chicken-curry/",
                "ingredients": ["2 tablespoons vegetable oil"],
                "instructions": "1. Heat oil in a large pot...",
                "category": "Dinner/Supper"
              },
              {
                "id": 8,
                "name": "Chicken Karai",
                "image": "https://www.whatsfordinner.co.za/recipe/poultry/253401-chicken-karai//",
                "ingredients": ["2 tablespoons vegetable oil"],
                "instructions": "1. Heat oil in a large pot...",
                "category": "Dinner/Supper"
              },
              // Dessert Recipes
              {
                "id": 9,
                "name": "Chocolate Lava Cake",
                "image": "https://example.com/chocolate-lava-cake.jpg",
                "ingredients": ["1/2 cup unsalted butter", "1 cup chocolate chips"],
                "instructions": "1. Melt butter and chocolate together...",
                "category": "Dessert"
              },
              // Sunday Lunch Recipes
              {
                "id": 10,
                "name": "Shank and Shin Potjie",
                "image": "https://www.paarman.co.za/all-recipes/shank-and-shin-potjie/",
                "ingredients": ["1 kg meaty beef shin"],
                "instructions": "1. Coat beef and lamb with flour and seasonings...",
                "category": "Sunday Lunch"
              }
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
