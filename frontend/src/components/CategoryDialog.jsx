import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Typography, Box } from "@mui/material";
import { categoryService } from "../services";
import { getImageUrl } from "../services/api";
import ImagePicker from "./ImagePicker";
import FormDialog from "./FormDialog";
import FormTextField from "./FormTextField";

const CategoryDialog = ({ open, onClose, category, onSaved }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setName(category?.name || "");
      setImage(null);
      setImagePreview(getImageUrl(category?.imageUrl));
      setError(null);
    }
  }, [open, category]);

  const handleImageSelect = (file, previewUrl) => {
    setImage(file);
    setError(null);
    setImagePreview(previewUrl);
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    setIsSaving(true);
    try {
      if (category) {
        await categoryService.updateCategory(category.categoryId, {
          name: name.trim(),
          image,
        });
      } else {
        await categoryService.createCategory({ name: name.trim(), image });
      }
      onSaved();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <FormDialog
      open={open}
      onClose={onClose}
      title={category ? "Edit Category" : "New Category"}
      onSubmit={handleSubmit}
      submitLabel={category ? "Save Changes" : "Create"}
      isSubmitting={isSaving}
      maxWidth="xs"
    >
      <Box component="form" className="mt-4 flex flex-col gap-4">
        <FormTextField
          label="Category name"
          placeholder="e.g. Italian"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError(null);
          }}
          required
          autoFocus
        />
        <ImagePicker
          inputId="category-image"
          preview={imagePreview}
          onFileSelect={handleImageSelect}
          onError={setError}
          previewWrapperClassName="flex justify-center"
          previewClassName="h-24 w-24 rounded-lg object-cover"
        />
        {error && (
          <Typography color="error" className="mt-2">
            {error}
          </Typography>
        )}
      </Box>
    </FormDialog>
  );
};

CategoryDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  category: PropTypes.object,
  onSaved: PropTypes.func.isRequired,
};

export default CategoryDialog;
