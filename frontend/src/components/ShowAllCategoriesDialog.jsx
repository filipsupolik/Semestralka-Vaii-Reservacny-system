import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Button,
} from "@mui/material";
import SearchBar from "./SearchBar";
import CategoryCard from "./CategoryCard";
import { API_BASE_URL } from "../services/api";

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
        <Grid container spacing={4}>
          {filteredCategories.map((category) => (
            <Grid item xs={4} sm={3} key={category.categoryId ?? category.id}>
              <CategoryCard
                image={
                  category.imageUrl
                    ? `${API_BASE_URL}${category.imageUrl}`
                    : undefined
                }
                title={category.name}
                selected={selectedCategory === category.name}
                onClick={() => handleSelect(category.name)}
              />
            </Grid>
          ))}
        </Grid>
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
