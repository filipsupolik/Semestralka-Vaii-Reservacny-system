import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { useMenu } from "../context";

const AddMenuItemDialog = ({ open, onClose, menuItem = null, onSaved }) => {
  const {
    categories,
    isLoading: isLoadingCategories,
    createMenuItem,
    updateMenuItem,
  } = useMenu();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open && menuItem) {
      setFormData({
        name: menuItem.name || "",
        description: menuItem.description || "",
        price: menuItem.price?.toString() || "",
        categoryId: menuItem.categoryId || "",
      });
    }
  }, [open, menuItem]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.price || isNaN(parseFloat(formData.price)))
      newErrors.price = "Valid price is required";
    if (!formData.categoryId) newErrors.categoryId = "Please select a category";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      let categoryId = formData.categoryId;

      const payload = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        categoryId,
      };

      const savedItem = menuItem
        ? await updateMenuItem(menuItem.menuItemId, payload)
        : await createMenuItem(payload);

      if (onSaved) {
        onSaved(savedItem);
      }
      handleClose();
    } catch (error) {
      setErrors((prev) => ({ ...prev, submit: error.message }));
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      categoryId: "",
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {menuItem ? "Update Menu Item" : "Add Menu Item"}
      </DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Item Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            error={!!errors.name}
            helperText={errors.name}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            error={!!errors.description}
            helperText={errors.description}
            margin="normal"
            multiline
            rows={3}
            required
          />

          <TextField
            fullWidth
            label="Price (€)"
            name="price"
            type="number"
            inputProps={{ step: "0.01", min: "0" }}
            value={formData.price}
            onChange={handleInputChange}
            error={!!errors.price}
            helperText={errors.price}
            margin="normal"
            required
          />

          <FormControl fullWidth margin="normal" error={!!errors.categoryId}>
            <InputLabel>Category</InputLabel>
            {isLoadingCategories ? (
              <CircularProgress size={24} />
            ) : (
              <Select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                label="Category"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.categoryId} value={cat.categoryId}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            )}
            {errors.categoryId && (
              <Typography color="error" variant="caption">
                {errors.categoryId}
              </Typography>
            )}
          </FormControl>
        </Box>
        {errors.submit && (
          <Typography color="error" sx={{ mt: 2 }}>
            {errors.submit}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {menuItem ? "Save Changes" : "Add Item"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMenuItemDialog;
