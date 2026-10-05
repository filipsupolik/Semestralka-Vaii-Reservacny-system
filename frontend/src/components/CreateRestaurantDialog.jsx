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
  Chip,
  CircularProgress,
} from "@mui/material";
import { categoryService } from "../services";
import { API_BASE_URL } from "../services/api";

const CreateRestaurantDialog = ({ open, onClose, onSubmit, restaurant }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
    categories: [],
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    if (open) {
      fetchCategories();
      if (restaurant) {
        setFormData({
          name: restaurant.name || "",
          address: restaurant.address || "",
          description: restaurant.description || "",
          categories: (restaurant.categories || []).map((rc) => ({
            categoryId: rc.categoryId,
          })),
          image: null,
        });
        setImagePreview(
          restaurant.imageUrl ? `${API_BASE_URL}${restaurant.imageUrl}` : null,
        );
      } else {
        setFormData({
          name: "",
          address: "",
          description: "",
          categories: [],
          image: null,
        });
        setImagePreview(null);
      }
      setErrors({});
    }
  }, [open, restaurant]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCategoryToggle = (categoryId) => {
    setFormData((prev) => {
      const isSelected = prev.categories.some(
        (c) => c.categoryId === categoryId,
      );
      const newCategories = isSelected
        ? prev.categories.filter((c) => c.categoryId !== categoryId)
        : [...prev.categories, { categoryId }];
      return { ...prev, categories: newCategories };
    });
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
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (formData.categories.length === 0)
      newErrors.categories = "At least one category is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await onSubmit(formData);
      handleClose();
    } catch (error) {
      setErrors((prev) => ({ ...prev, submit: error.message }));
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      address: "",
      description: "",
      categories: [],
      image: null,
    });
    setImagePreview(null);
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {restaurant ? "Update Restaurant" : "Create New Restaurant"}
      </DialogTitle>
      <DialogContent>
        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Restaurant Name"
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
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            error={!!errors.address}
            helperText={errors.address}
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

          <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
            Categories *
          </Typography>
          {isLoadingCategories ? (
            <CircularProgress size={24} />
          ) : (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {categories.map((category) => (
                <Chip
                  key={category.categoryId}
                  label={category.name}
                  onClick={() => handleCategoryToggle(category.categoryId)}
                  color={
                    formData.categories.some(
                      (c) => c.categoryId === category.categoryId,
                    )
                      ? "primary"
                      : "default"
                  }
                  clickable
                />
              ))}
            </Box>
          )}
          {errors.categories && (
            <Typography color="error" variant="caption" sx={{ mt: 1 }}>
              {errors.categories}
            </Typography>
          )}

          <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
            Restaurant Image (Optional)
          </Typography>
          <input
            accept="image/*"
            type="file"
            id="restaurant-image"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <label htmlFor="restaurant-image">
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
                  width: "100%",
                  maxHeight: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
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
          {restaurant ? "Update Restaurant" : "Create Restaurant"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRestaurantDialog;
