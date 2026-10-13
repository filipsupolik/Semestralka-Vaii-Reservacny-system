import React, { useState } from "react";
import { RestaurantCard, SearchBar } from "../components/index";
import CategoryCard from "../components/CategoryCard";
import ShowAllCategoriesDialog from "../components/ShowAllCategoriesDialog";
import Pagination from "../components/Pagination";
import { useRestaurants, useCategories } from "../hooks";
import { getImageUrl } from "../services/api";
import { getRestaurantCuisine, getRestaurantImage } from "../utils/restaurant";

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

  return (
    <div>
      <section className="py-8 sm:py-16">
        <div className="container mx-auto px-4 py-4">
          <SearchBar title={"Vyhladaj restauraciu"} onSearch={handleSearch} />
          <div className="flex items-center gap-4">
            <div className="flex h-[120px] flex-1 min-w-0 flex-row flex-wrap content-start gap-4 overflow-hidden">
              {categories.map((category) => (
                <CategoryCard
                  key={category.categoryId}
                  image={getImageUrl(category.imageUrl) ?? undefined}
                  title={category.name}
                  selected={selectedCategory === category.name}
                  onClick={() => handleCategoryFilter(category.name)}
                />
              ))}
            </div>
            <button
              className="shrink-0 self-start p-3 rounded-lg border-2 border-stone-800"
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
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
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </section>

      <ShowAllCategoriesDialog
        isOpen={dialogOpen}
        handleClose={handleCloseDialog}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={handleCategoryFilter}
      />
    </div>
  );
};

export default RestaurantPage;
