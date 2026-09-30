import React, { useState } from "react";
import { RestaurantCard, SearchBar } from "../components/index";
import CategoryCard from "../components/CategoryCard";
import ShowAllCategoriesDialog from "../components/ShowAllCategoriesDialog";
import { useRestaurants, useRestaurantSearch } from "../hooks";
import { mockCategories } from "../data/mockData";

const RestaurantPage = () => {
  const { restaurants, isLoading } = useRestaurants(true);
  const {
    search,
    results: searchResults,
    isLoading: isSearching,
  } = useRestaurantSearch();
  const categories = mockCategories;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleOpenShowAllDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSearch = async (query) => {
    await search({ name: query });
  };

  const handleCategoryFilter = (categoryName) => {
    setSelectedCategory(categoryName);
    search({ category: categoryName });
  };

  const displayRestaurants = selectedCategory ? searchResults : restaurants;

  const getRestaurantCuisine = (restaurant) => {
    if (restaurant.categories && restaurant.categories.length > 0) {
      return restaurant.categories.map((c) => c.category?.name).filter(Boolean);
    }
    return restaurant.cuisine || [];
  };

  return (
    <div>
      <section className="py-16">
        <div className="container mx-auto px-4 py-4">
          <SearchBar title={"Vyhladaj restauraciu"} onSearch={handleSearch} />
          <div className="flex flex-row gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                image={category.image}
                title={category.name}
                onClick={() => handleCategoryFilter(category.name)}
              />
            ))}
            <button
              className="p-3 rounded-lg border-2 border-stone-800 "
              onClick={handleOpenShowAllDialog}
            >
              Show All
            </button>
          </div>
          {isLoading || isSearching ? (
            <div className="text-center text-gray-600 mt-5">
              Loading restaurants...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
              {displayRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.restaurantId || restaurant.id}
                  id={restaurant.restaurantId || restaurant.id}
                  image={restaurant.image || "https://via.placeholder.com/300"}
                  name={restaurant.name}
                  cuisine={getRestaurantCuisine(restaurant)}
                />
              ))}
            </div>
          )}
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
