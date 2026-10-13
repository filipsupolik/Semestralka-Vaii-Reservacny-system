import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { categoryService } from "../services";
import { getImageUrl } from "../services/api";
import ImagePicker from "./ImagePicker";

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
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{category ? "Edit Category" : "New Category"}</DialogTitle>
      <DialogContent>
        <Box component="form" className="mt-4">
          <TextField
            fullWidth
            label="Category name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError(null);
            }}
            className="mt-4 mb-2"
            required
            autoFocus
          />
          <ImagePicker
            inputId="category-image"
            preview={imagePreview}
            onFileSelect={handleImageSelect}
            onError={setError}
            previewWrapperClassName="mt-4 flex justify-center"
            previewClassName="h-24 w-24 rounded-lg object-cover"
          />
          {error && (
            <Typography color="error" className="mt-2">
              {error}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={isSaving}
        >
          {category ? "Save Changes" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CategoryDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  category: PropTypes.object,
  onSaved: PropTypes.func.isRequired,
};

export default CategoryDialog;
