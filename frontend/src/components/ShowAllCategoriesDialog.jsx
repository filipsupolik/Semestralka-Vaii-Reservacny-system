import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import SearchBar from "./SearchBar";
import CategoryCard from "./CategoryCard";
import { getImageUrl } from "../services/api";

function ShowAllCategoriesDialog({
  isOpen,
  handleClose,
  categories,
  selectedCategory,
  onSelect,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (value) => {
    setSearchTerm(value.toLowerCase());
  };

  const handleSelect = (categoryName) => {
    onSelect(categoryName);
    handleClose();
  };

  const filteredCategories = categories
    .filter((category) => category.name.toLowerCase().includes(searchTerm))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>All Categories</DialogTitle>
      <DialogContent>
        <SearchBar
          title={"Prehladaj kategorie"}
          onSearch={handleSearchChange}
        />
        <div className="mt-4 grid grid-cols-3 gap-8 sm:grid-cols-4">
          {filteredCategories.map((category) => (
            <CategoryCard
              key={category.categoryId ?? category.id}
              image={getImageUrl(category.imageUrl) ?? undefined}
              title={category.name}
              selected={selectedCategory === category.name}
              onClick={() => handleSelect(category.name)}
            />
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ShowAllCategoriesDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

export default ShowAllCategoriesDialog;
