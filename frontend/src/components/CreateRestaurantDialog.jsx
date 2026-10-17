import PropTypes from "prop-types";
import { Typography, Box, Chip, CircularProgress } from "@mui/material";
import { useRestaurantForm } from "../hooks";
import ImagePicker from "./ImagePicker";
import FormDialog from "./FormDialog";
import FormTextField from "./FormTextField";

const CreateRestaurantDialog = ({ open, onClose, onSubmit, restaurant }) => {
  const {
    formData,
    imagePreview,
    errors,
    categories,
    isLoadingCategories,
    handleInputChange,
    handleCategoryToggle,
    handleImageSelect,
    handleImageError,
    handleSubmit,
    handleClose,
  } = useRestaurantForm({ open, restaurant, onSubmit, onClose });

  return (
    <FormDialog
      open={open}
      onClose={handleClose}
      title={restaurant ? "Update Restaurant" : "Create New Restaurant"}
      onSubmit={handleSubmit}
      submitLabel={restaurant ? "Update Restaurant" : "Create Restaurant"}
    >
      <Box component="form" className="mt-4">
        <FormTextField
          label="Restaurant Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          error={errors.name}
          required
        />

        <FormTextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          error={errors.address}
          required
        />

        <FormTextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          error={errors.description}
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
    </FormDialog>
  );
};

CreateRestaurantDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  restaurant: PropTypes.object,
};

export default CreateRestaurantDialog;
