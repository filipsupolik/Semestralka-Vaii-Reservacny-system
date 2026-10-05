import React, { useState } from "react";
import { RestaurantCard, SearchBar } from "../components/index";
import CategoryCard from "../components/CategoryCard";
import ShowAllCategoriesDialog from "../components/ShowAllCategoriesDialog";
import { useRestaurants, useCategories } from "../hooks";
import { API_BASE_URL } from "../services/api";

const PAGE_SIZE = 9;

const RestaurantPage = () => {
  const [page, setPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const debounceRef = React.useRef(null);

  const { restaurants, totalPages, isLoading } = useRestaurants({
    page,
    pageSize: PAGE_SIZE,
    name: searchName,
    category: selectedCategory,
  });
  const { categories } = useCategories();

  const handleOpenShowAllDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleSearch = (query) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      setSearchName(query);
      setPage(1);
    }, 300);
  };

  const handleCategoryFilter = (categoryName) => {
    setSelectedCategory((current) =>
      current === categoryName ? null : categoryName,
    );
    setPage(1);
  };

  const getRestaurantCuisine = (restaurant) => {
    if (restaurant.categories && restaurant.categories.length > 0) {
      return restaurant.categories.map((c) => c.category?.name).filter(Boolean);
    }
    return restaurant.cuisine || [];
  };

  const getRestaurantImage = (restaurant) => {
    if (restaurant.imageUrl) {
      return `${API_BASE_URL}${restaurant.imageUrl}`;
    }
    return restaurant.image || "https://via.placeholder.com/300";
  };

  return (
    <div>
      <section className="py-16">
        <div className="container mx-auto px-4 py-4">
          <SearchBar title={"Vyhladaj restauraciu"} onSearch={handleSearch} />
          <div className="flex flex-row gap-4 flex-wrap">
            {categories.map((category) => (
              <CategoryCard
                key={category.categoryId}
                image={
                  category.imageUrl
                    ? `${API_BASE_URL}${category.imageUrl}`
                    : undefined
                }
                title={category.name}
                selected={selectedCategory === category.name}
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
          {isLoading ? (
            <div className="text-center text-gray-600 mt-5">
              Loading restaurants...
            </div>
          ) : restaurants.length === 0 ? (
            <div className="text-center text-gray-600 mt-5">
              No restaurants found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
              {restaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.restaurantId || restaurant.id}
                  id={restaurant.restaurantId || restaurant.id}
                  image={getRestaurantImage(restaurant)}
                  name={restaurant.name}
                  cuisine={getRestaurantCuisine(restaurant)}
                />
              ))}
            </div>
          )}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                className="cursor-pointer rounded-lg border border-stone-800 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    className={`cursor-pointer rounded-lg border px-3 py-1 ${
                      pageNumber === page
                        ? "border-[#00b7ff] bg-[#00b7ff] text-white"
                        : "border-stone-800"
                    }`}
                    onClick={() => setPage(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                ),
              )}
              <button
                className="cursor-pointer rounded-lg border border-stone-800 px-3 py-1 disabled:cursor-not-allowed disabled:opacity-40"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
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
