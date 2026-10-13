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
import { getImageUrl } from "../services/api";
import ImagePicker from "./ImagePicker";

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
        setImagePreview(getImageUrl(restaurant.imageUrl));
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

  const handleImageSelect = (file, previewUrl) => {
    setFormData((prev) => ({ ...prev, image: file }));
    setErrors((prev) => ({ ...prev, image: "" }));
    setImagePreview(previewUrl);
  };

  const handleImageError = (message) => {
    setErrors((prev) => ({ ...prev, image: message }));
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
        <Box component="form" className="mt-4">
          <TextField
            fullWidth
            label="Restaurant Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            error={!!errors.name}
            helperText={errors.name}
            className="mt-4 mb-2"
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
            className="mt-4 mb-2"
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
            className="mt-4 mb-2"
            multiline
            rows={3}
            required
          />

          <Typography variant="subtitle1" className="mt-4 mb-2">
            Categories *
          </Typography>
          {isLoadingCategories ? (
            <CircularProgress size={24} />
          ) : (
            <Box className="flex flex-wrap gap-2">
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
            <Typography color="error" variant="caption" className="mt-2">
              {errors.categories}
            </Typography>
          )}

          <Typography variant="subtitle1" className="mt-4 mb-2">
            Restaurant Image (Optional)
          </Typography>
          <ImagePicker
            inputId="restaurant-image"
            preview={imagePreview}
            onFileSelect={handleImageSelect}
            onError={handleImageError}
            previewClassName="max-h-[200px] w-full rounded-lg object-cover"
          />
          {errors.image && (
            <Typography color="error" variant="caption" className="mt-2">
              {errors.image}
            </Typography>
          )}
        </Box>
        {errors.submit && (
          <Typography color="error" className="mt-4">
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
