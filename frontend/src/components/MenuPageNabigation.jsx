import React, { useState } from "react";

function MenuPageNavigation({ menuCategories }) {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;

  const handleScrollLeft = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  const handleScrollRight = () => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerPage, menuCategories.length),
    );
  };

  const visibleCategories = menuCategories.slice(
    startIndex,
    Math.min(startIndex + itemsPerPage, menuCategories.length),
  );

  return (
    <div className="max-w-80 m-4">
      <div className="flex flex-row gap-4 mb-8 items-center">
        {startIndex > 0 && (
          <button
            onClick={handleScrollLeft}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
          >
            &lt;
          </button>
        )}
        {visibleCategories.map((category) => (
          <div
            key={category.id}
            className="text-lg font-medium text-gray-700 hover:bg-white px-6 py-4 rounded-lg hover:shadow cursor-pointer whitespace-nowrap"
          >
            <a href={`#${category.id}`}>{category.name}</a>
          </div>
        ))}
        {startIndex + itemsPerPage < menuCategories.length && (
          <button
            onClick={handleScrollRight}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
}

export default MenuPageNavigation;
