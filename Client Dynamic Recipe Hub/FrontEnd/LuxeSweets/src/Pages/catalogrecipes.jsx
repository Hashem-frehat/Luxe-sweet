import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from 'lucide-react';
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
const Catalogrecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    try {
      const response = await axios.get("http://localhost:1001/api/recipe");
      const data = response.data;
      console.log(data);
      setRecipes(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCardClick = (recipe) => {
    sessionStorage.setItem("selectedRecipe", JSON.stringify(recipe));
    navigate(`/Recipesdetail`);
  };

  return (
    <>
    <Header/>
    <div className="bg-gradient-to-b from-[#F4EAD2] to-[#E6D5B8] min-h-screen">
    <div className="container mx-auto ">
      {/* Header and Filters */}
      <header className="bg-gradient-to-r from-[#A0785D] to-[#d3966d] text-white py-8">
    <div className="container mx-auto px-4">
      <h1 className="text-5xl font-bold text-center">Luxe Sweets</h1>
      <p className="text-center mt-3 text-amber-200 text-xl italic">
        Chef's Section 
      </p>
    </div>
  </header>

  <main className="container mx-auto px-4 py-16">
    <div className="mb-12 text-center">
      <h2 className="text-5xl font-serif font-extrabold mb-6 text-amber-900">Exquisite Dessert Creations</h2>
      <p className="text-2xl text-amber-700 mb-8 italic">{recipes.length} Delightful Recipes to Indulge In</p>
      
      <div className="relative inline-block">
        <select className="appearance-none bg-amber-100 text-amber-900 font-semibold py-3 px-8 pr-12 border-2 border-amber-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg">
          <option value="">Select a Category</option>
          {recipes.map((recipe, index) => (
            <option key={index}>{recipe.categories[0]}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-amber-700" size={24} />
      </div>
    </div>
  </main>
      {/* Recipe Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 px-8">
        {recipes.map((recipe, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            onClick={() => handleCardClick(recipe)}
          >
            <div className="relative">
              <img
                src={recipe.images[0]}
                alt={recipe.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 transition duration-300 opacity-0 hover:opacity-100 flex items-center justify-center">
                <span className="text-white text-lg font-semibold px-4 py-2 bg-[#8C6D46] bg-opacity-75 rounded-full">
                  View Recipe
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-serif font-bold text-[#8C6D46] mb-2">{recipe.title}</h3>
              <p className="text-[#B0956E] text-sm italic">Click to learn more</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Placeholder */}
      <div className="mt-16 flex justify-center">
        {/* You can add pagination or "Load More" button here if needed */}
      </div>
    </div>
  </div>
  <Footer/>
  </>
  );
};

export default Catalogrecipes;