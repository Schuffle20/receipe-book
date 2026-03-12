// import { Button } from "@/components/ui/button"

import { SearchIcon } from "lucide-react";
import { useState } from "react";

export function App() {
  const recipes = [
    { id: 1, title: "Spaghetti Carbonara", ingredients: "Pasta, eggs, pancetta, pecorino", category: "Dinner", color: "bg-blue-500" },
    { id: 2, title: "Avocado Toast", ingredients: "Bread, avocado, lemon, salt", category: "Breakfast", color: "bg-green-500" },
    { id: 3, title: "Chicken Stir Fry", ingredients: "Chicken, vegetables, soy sauce, rice", category: "Dinner", color: "bg-amber-500" },
    { id: 4, title: "Chocolate Brownies", ingredients: "Flour, cocoa, butter, sugar", category: "Dessert", color: "bg-amber-700" },
    { id: 5, title: "Beef Stew", ingredients: "Beef, vegetables, potatoes, carrots", category: "Dinner", color: "bg-red-500" },
    { id: 6, title: "Salad", ingredients: "Lettuce, tomatoes, cucumbers, dressing", category: "Lunch", color: "bg-yellow-500" },
    { id: 7, title: "Pizza", ingredients: "Dough, cheese, tomatoes, pepperoni", category: "Lunch", color: "bg-purple-500" },
    { id: 8, title: "Sushi", ingredients: "Rice, fish, seaweed, soy sauce", category: "Lunch", color: "bg-pink-500" },
    { id: 9, title: "Salad", ingredients: "Lettuce, tomatoes, cucumbers, dressing", category: "Lunch", color: "bg-yellow-500" },
    { id: 10, title: "Pizza", ingredients: "Dough, cheese, tomatoes, pepperoni", category: "Lunch", color: "bg-purple-500" },
    { id: 11, title: "Sushi", ingredients: "Rice, fish, seaweed, soy sauce", category: "Lunch", color: "bg-pink-500" },
  ];

  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory = selectedCategory === "All" || recipe.category === selectedCategory;
    const matchesSearch = recipe.title.toLowerCase().includes(search.toLowerCase()) || recipe.ingredients.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4 text-gray-900">
      <div className="mt-8 w-full max-w-md flex items-center rounded-md border border-gray-300 bg-white focus-within:outline-none focus-within:ring-2 focus-within:ring-gray-400 focus-within:ring-offset-0 mb-2">
        <SearchIcon className="w-4 h-4 text-gray-500 shrink-0 ml-3" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search recipes" className="w-full min-w-0 py-2 px-3 rounded-md border-0 bg-transparent text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-0" />
      </div>
      <div className="mt-8 w-full max-w-md">
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full p-2 rounded-md border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 mb-2">
          <option value="All">All</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Dessert">Dessert</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-xl shadow-md p-6 border-t-4 border-t-slate-800 text-gray-900">
            <h1 className="text-xl font-bold text-gray-900">{recipe.title}</h1>
            <p className="text-gray-600">{recipe.ingredients}</p>
          </div>
        ))}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="text-center mt-10 text-gray-600 text-xl">No recipes found</div>
      )}
    </div>
  )
}

export default App
