import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
} from "@mui/material";
import { RestaurantCard, SearchBar } from "../components/index";
import CategoryCard from "../components/CategoryCard";
import ShowAllCategoriesDialog from "../components/ShowAllCategoriesDialog";

const RestaurantPage = () => {
  // Mock data for restaurants
  const restaurants = [
    {
      id: 1,
      name: "Italian Bistro",
      cuisine: ["Italian"],
      image: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      name: "Sushi Place",
      cuisine: ["Japanese"],
      image: "https://via.placeholder.com/300",
    },
    {
      id: 3,
      name: "Burger Joint",
      cuisine: ["American", "Chinese", "Italian"],
      image: "https://via.placeholder.com/300",
    },
  ];

  const categories = [
    { id: 1, name: "Italian", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Japanese", image: "https://via.placeholder.com/150" },
    { id: 3, name: "American", image: "https://via.placeholder.com/150" },
  ];

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleOpenShowAllDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  /*const handleCategoryToggle = (categoryId) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(categoryId)) {
        return prevSelected.filter((id) => id !== categoryId);
      } else {
        return [...prevSelected, categoryId];
      }
    });
  };*/

  return (
    <div>
      <section className="py-16">
        <div className="container mx-auto px-4 py-4">
          <SearchBar title={"Vyhladaj restauraciu"} />
          <div className="flex flex-row gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                image={category.image}
                title={category.name}
              />
            ))}
            <button
              className="p-3 rounded-lg border-2 border-stone-800 "
              onClick={handleOpenShowAllDialog}
            >
              Show All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                id={restaurant.id}
                image={restaurant.image}
                name={restaurant.name}
                cuisine={restaurant.cuisine}
              />
            ))}
          </div>
        </div>
      </section>

      <ShowAllCategoriesDialog
        isOpen={dialogOpen}
        handleClose={handleCloseDialog}
        categories={categories}
      />
    </div>
  );
};

export default RestaurantPage;
