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
} from "@mui/material";
import { useMenu } from "../context";
import { getImageUrl } from "../services/api";
import ImagePicker from "./ImagePicker";

const AddMenuItemDialog = ({ open, onClose, menuItem = null, onSaved }) => {
  const {
    categories,
    ingredients,
    isLoading: isLoadingCategories,
    createMenuItem,
    updateMenuItem,
    createCategory,
    createIngredient,
  } = useMenu();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    ingredientIds: [],
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newIngredientName, setNewIngredientName] = useState("");
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [isCreatingIngredient, setIsCreatingIngredient] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open && menuItem) {
      setFormData({
        name: menuItem.name || "",
        description: menuItem.description || "",
        price: menuItem.price?.toString() || "",
        categoryId: menuItem.categoryId || "",
        ingredientIds: (menuItem.ingredients || []).map(
          (ing) => ing.ingredientId,
        ),
        image: null,
      });
      setImagePreview(getImageUrl(menuItem.imageUrl));
    } else if (open) {
      setImagePreview(null);
    }
  }, [open, menuItem]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleIngredientsChange = (e) => {
    setFormData((prev) => ({ ...prev, ingredientIds: e.target.value }));
    setErrors((prev) => ({ ...prev, ingredients: "" }));
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
        ingredientIds: formData.ingredientIds,
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

  const handleCreateIngredient = async () => {
    const name = newIngredientName.trim();
    if (!name) return;

    if (ingredients.some((ing) => ing.name === name.toLowerCase())) {
      setErrors((prev) => ({
        ...prev,
        ingredients: "Ingredient already exists",
      }));
      return;
    }

    setIsCreatingIngredient(true);
    try {
      const created = await createIngredient(name);
      setFormData((prev) => ({
        ...prev,
        ingredientIds: [...prev.ingredientIds, created.ingredientId],
      }));
      setNewIngredientName("");
    } catch (error) {
      setErrors((prev) => ({ ...prev, ingredients: error.message }));
    } finally {
      setIsCreatingIngredient(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      categoryId: "",
      ingredientIds: [],
      image: null,
    });
    setImagePreview(null);
    setNewCategoryName("");
    setNewIngredientName("");
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {menuItem ? "Update Menu Item" : "Add Menu Item"}
      </DialogTitle>
      <DialogContent>
        <Box component="form" className="mt-4">
          <TextField
            fullWidth
            label="Item Name"
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
            className="mt-4 mb-2"
            required
          />

          <FormControl
            fullWidth
            className="mt-4 mb-2"
            error={!!errors.categoryId}
          >
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
              <div className="mt-2 flex gap-2">
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
              </div>
            )}
            {errors.categoryId && (
              <Typography color="error" variant="caption">
                {errors.categoryId}
              </Typography>
            )}
          </FormControl>

          <FormControl
            fullWidth
            className="mt-4 mb-2"
            error={!!errors.ingredients}
          >
            <InputLabel>Ingredients</InputLabel>
            <Select
              multiple
              name="ingredientIds"
              value={formData.ingredientIds}
              onChange={handleIngredientsChange}
              label="Ingredients"
              renderValue={(selected) =>
                ingredients
                  .filter((ing) => selected.includes(ing.ingredientId))
                  .map((ing) => ing.name)
                  .join(", ")
              }
            >
              {ingredients.map((ing) => (
                <MenuItem key={ing.ingredientId} value={ing.ingredientId}>
                  {ing.name}
                </MenuItem>
              ))}
            </Select>
            <div className="mt-2 flex gap-2">
              <TextField
                fullWidth
                size="small"
                label="New ingredient name"
                value={newIngredientName}
                onChange={(e) => setNewIngredientName(e.target.value)}
              />
              <Button
                variant="outlined"
                onClick={handleCreateIngredient}
                disabled={!newIngredientName.trim() || isCreatingIngredient}
              >
                Add
              </Button>
            </div>
            {errors.ingredients && (
              <Typography color="error" variant="caption">
                {errors.ingredients}
              </Typography>
            )}
          </FormControl>

          <Typography variant="subtitle1" className="mt-4 mb-2">
            Item Image (Optional)
          </Typography>
          <ImagePicker
            inputId="menu-item-image"
            preview={imagePreview}
            onFileSelect={handleImageSelect}
            onError={handleImageError}
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
          {menuItem ? "Save Changes" : "Add Item"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddMenuItemDialog;
