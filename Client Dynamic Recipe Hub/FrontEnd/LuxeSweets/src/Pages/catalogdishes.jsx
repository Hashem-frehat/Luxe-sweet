import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import Swal from "sweetalert2";

// Utility functions to manage the cart in local storage
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const getCartFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : null;
};

const Catalogdishes = () => {
  const [desserts, setDesserts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);
  const chefname = sessionStorage.getItem("selectedChefName");

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:1001/api/records");
      const data = response.data;

      // Get chefId from sessionStorage
      const chefId = sessionStorage.getItem("selectedChefId");
      // Filter dishes based on chef's id
      const filteredDesserts = data.filter(
        (dessert) => dessert.chef === chefId
      );

      setDesserts(filteredDesserts);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCardClick = (dessert) => {
    sessionStorage.setItem("selectedDessert", JSON.stringify(dessert));
    navigate(`/DishDetail`);
  };

  // Function to add a dish to the cart
  const addToCart = (dessert) => {
    let cart = getCartFromLocalStorage();

    if (!cart) {
      cart = {
        items: [],
        chef: dessert.chef,
        total: 0,
      };
    }

    // Check if the dish is from the same chef
    if (cart.chef !== dessert.chef) {
      Swal.fire({
        icon: "error",
        title: "Invalid Action",
        text: "You can only add items from the same chef.",
      });
      return;
    }

    // Add or update the item in the cart
    const existingItem = cart.items.find(
      (item) => item.dish._id === dessert._id
    );
    if (existingItem) {
      // Check if adding one more would exceed the available quantity
      if (existingItem.quantity + 1 > dessert.availableQuantity) {
        Swal.fire({
          icon: "error",
          title: "Quantity Exceeded",
          text: "Cannot add more items. Exceeds available quantity.",
        });
        return;
      }
      existingItem.quantity += 1;
    } else {
      // Check if adding this item would exceed the available quantity
      if (1 > dessert.availableQuantity) {
        Swal.fire({
          icon: "error",
          title: "Quantity Exceeded",
          text: "Cannot add more items. Exceeds available quantity.",
        });
        return;
      }
      cart.items.push({ dish: dessert, quantity: 1 });
    }

    // Update total price
    cart.total = cart.items.reduce(
      (acc, item) => acc + item.dish.price * item.quantity,
      0
    );

    saveCartToLocalStorage(cart);
    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: "Dish added to cart!",
    });
  };

  return (
    <>
      <Header />
      <div className="bg-amber-50 min-h-screen">
        <header className="bg-gradient-to-r from-[#A0785D] to-[#d3966d] text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold text-center">Luxe Sweets</h1>
            <p className="text-center mt-3 text-amber-200 text-xl italic">
              Chef's Section {chefname}
            </p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-16">
          <div className="mb-12">
            <h2 className="text-4xl font-serif font-bold text-amber-900 mb-4">
              Our Signature Collection
            </h2>
            <p className="text-amber-700 text-lg">
              {desserts.length} Decadent Creations
            </p>
            <select className="mt-4 w-full md:w-64 bg-amber-100 border-2 border-amber-300 text-amber-900 py-3 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-lg">
              {desserts.map((dessert, index) => (
                <option key={index}>{dessert.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {desserts.map((dessert, index) => (
              <div
                key={index}
                className="relative group bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-300 hover:scale-105"
              >
                <div className="relative cursor-pointer">
                  <img
                    src={dessert.images[0]}
                    alt={dessert.name}
                    className="w-full h-64 object-cover transition-transform duration-300   "
                    onClick={() => handleCardClick(dessert)}
                  />
                  <div
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the click event from triggering on the image
                      handleCardClick(dessert); // Add your handler for showing details here
                    }}
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <button className="text-white font-bold py-2 px-4 rounded-full bg-[#ad856b] hover:bg-[#cf9c7b] transition duration-300 ease-in-out">
                      Show details
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-serif font-semibold text-amber-900 mb-3">
                    {dessert.name}
                  </h3>
                  <button
                    onClick={() => addToCart(dessert)}
                    className="w-full bg-[#ad856b] hover:bg-[#cf9c7b] text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out text-lg"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default Catalogdishes;
