import PropTypes from "prop-types";
import {
  Typography,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { useMenuItemForm } from "../hooks";
import ImagePicker from "./ImagePicker";
import FormDialog from "./FormDialog";
import FormTextField from "./FormTextField";
import QuickAddField from "./QuickAddField";

const AddMenuItemDialog = ({ open, onClose, menuItem = null, onSaved }) => {
  const {
    formData,
    imagePreview,
    errors,
    categories,
    ingredients,
    isLoadingCategories,
    newCategoryName,
    setNewCategoryName,
    newIngredientName,
    setNewIngredientName,
    isCreatingCategory,
    isCreatingIngredient,
    handleInputChange,
    handleIngredientsChange,
    handleImageSelect,
    handleImageError,
    handleSubmit,
    handleCreateCategory,
    handleCreateIngredient,
    handleClose,
  } = useMenuItemForm({ open, menuItem, onSaved, onClose });

  return (
    <FormDialog
      open={open}
      onClose={handleClose}
      title={menuItem ? "Update Menu Item" : "Add Menu Item"}
      onSubmit={handleSubmit}
      submitLabel={menuItem ? "Save Changes" : "Add Item"}
    >
      <Box component="form" className="mt-4 flex flex-col gap-4">
        <FormTextField
          label="Item Name"
          name="name"
          placeholder="e.g. Margherita Pizza"
          value={formData.name}
          onChange={handleInputChange}
          error={errors.name}
          required
        />

        <FormTextField
          label="Description"
          name="description"
          placeholder="Describe the dish"
          value={formData.description}
          onChange={handleInputChange}
          error={errors.description}
          multiline
          rows={3}
          required
        />

        <FormTextField
          label="Price (€)"
          name="price"
          type="number"
          placeholder="0.00"
          inputProps={{ step: "0.01", min: "0" }}
          value={formData.price}
          onChange={handleInputChange}
          error={errors.price}
          required
        />

        <FormControl fullWidth error={!!errors.categoryId}>
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
            <QuickAddField
              label="New category name"
              placeholder="e.g. Desserts"
              value={newCategoryName}
              onChange={setNewCategoryName}
              onAdd={handleCreateCategory}
              isLoading={isCreatingCategory}
              autoFocus
            />
          )}
          {errors.categoryId && (
            <Typography color="error" variant="caption">
              {errors.categoryId}
            </Typography>
          )}
        </FormControl>

        <FormControl fullWidth error={!!errors.ingredients}>
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
          <QuickAddField
            label="New ingredient name"
            placeholder="e.g. basil"
            value={newIngredientName}
            onChange={setNewIngredientName}
            onAdd={handleCreateIngredient}
            isLoading={isCreatingIngredient}
          />
          {errors.ingredients && (
            <Typography color="error" variant="caption">
              {errors.ingredients}
            </Typography>
          )}
        </FormControl>

        <Typography variant="subtitle1">Item Image (Optional)</Typography>
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
    </FormDialog>
  );
};

AddMenuItemDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  menuItem: PropTypes.object,
  onSaved: PropTypes.func,
};

export default AddMenuItemDialog;
