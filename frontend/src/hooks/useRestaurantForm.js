import { useState, useEffect } from "react";
import { categoryService } from "../services";
import { getImageUrl } from "../services/api";

const EMPTY_FORM = {
  name: "",
  address: "",
  description: "",
  categories: [],
  image: null,
};

const useRestaurantForm = ({ open, restaurant, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(EMPTY_FORM);
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
        setErrors((prev) => ({ ...prev, categories: error.message }));
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
        setFormData(EMPTY_FORM);
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

  const handleClose = () => {
    setFormData(EMPTY_FORM);
    setImagePreview(null);
    setErrors({});
    onClose();
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

  return {
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
  };
};

export default useRestaurantForm;
