import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Button,
  Typography,
} from "@mui/material";
import SearchBar from "./SearchBar";

function ShowAllCategoriesDialog({ isOpen, handleClose, categories }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredCategories = categories
    .filter((category) => category.name.toLowerCase().includes(searchTerm))
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>All Categories</DialogTitle>
      <DialogContent>
        <SearchBar title={"Prehladaj kategorie"} />
        <Grid container spacing={4}>
          {filteredCategories.map((category) => (
            <Grid item xs={12} sm={4} key={category.id}>
              <Typography>{category.name}</Typography>
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

export default ShowAllCategoriesDialog;
