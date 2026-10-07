import { useState, useEffect } from "react";
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
  Stack,
} from "@mui/material";
import { useMenu } from "../context";
import { API_BASE_URL } from "../services/api";

const AddMenuItemDialog = ({ open, onClose, menuItem = null, onSaved }) => {
  const {
    categories,
    isLoading: isLoadingCategories,
    createMenuItem,
    updateMenuItem,
    createCategory,
  } = useMenu();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open && menuItem) {
      setFormData({
        name: menuItem.name || "",
        description: menuItem.description || "",
        price: menuItem.price?.toString() || "",
        categoryId: menuItem.categoryId || "",
        image: null,
      });
      setImagePreview(
        menuItem.imageUrl ? `${API_BASE_URL}${menuItem.imageUrl}` : null,
      );
    } else if (open) {
      setImagePreview(null);
    }
  }, [open, menuItem]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          image: "Please select an image file",
        }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "Image must be less than 5MB",
        }));
        return;
      }
      setFormData((prev) => ({ ...prev, image: file }));
      setErrors((prev) => ({ ...prev, image: "" }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.price || isNaN(parseFloat(formData.price)))
      newErrors.price = "Valid price is required";
    if (!formData.categoryId || formData.categoryId === "__new__")
      newErrors.categoryId = "Please select a category";

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
        image: formData.image,
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

  const handleCreateCategory = async () => {
    const name = newCategoryName.trim();
    if (!name) return;

    setIsCreatingCategory(true);
    try {
      const created = await createCategory(name);
      setFormData((prev) => ({ ...prev, categoryId: created.categoryId }));
      setNewCategoryName("");
    } catch (error) {
      setErrors((prev) => ({ ...prev, submit: error.message }));
    } finally {
      setIsCreatingCategory(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      categoryId: "",
      image: null,
    });
    setImagePreview(null);
    setNewCategoryName("");
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
                <MenuItem value="__new__">
                  <em>+ New category</em>
                </MenuItem>
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
            {formData.categoryId === "__new__" && (
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="New category name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  autoFocus
                />
                <Button
                  variant="outlined"
                  onClick={handleCreateCategory}
                  disabled={!newCategoryName.trim() || isCreatingCategory}
                >
                  Add
                </Button>
              </Stack>
            )}
            {errors.categoryId && (
              <Typography color="error" variant="caption">
                {errors.categoryId}
              </Typography>
            )}
          </FormControl>

          <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
            Item Image (Optional)
          </Typography>
          <input
            accept="image/*"
            type="file"
            id="menu-item-image"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <label htmlFor="menu-item-image">
            <Button variant="outlined" component="span" fullWidth>
              Choose Image
            </Button>
          </label>
          {errors.image && (
            <Typography color="error" variant="caption" sx={{ mt: 1 }}>
              {errors.image}
            </Typography>
          )}
          {imagePreview && (
            <Box sx={{ mt: 2 }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  width: "128px",
                  height: "128px",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </Box>
          )}
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
