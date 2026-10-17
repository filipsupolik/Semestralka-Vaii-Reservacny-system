import { useState, useEffect } from "react";
import { useMenu } from "../context";
import { getImageUrl } from "../services/api";
import { PRICE_MAX } from "../constants/validation";

const EMPTY_FORM = {
  name: "",
  description: "",
  price: "",
  categoryId: "",
  ingredientIds: [],
  image: null,
};

const useMenuItemForm = ({ open, menuItem, onSaved, onClose }) => {
  const {
    categories,
    ingredients,
    isLoading: isLoadingCategories,
    createMenuItem,
    updateMenuItem,
    createCategory,
    createIngredient,
  } = useMenu();

  const [formData, setFormData] = useState(EMPTY_FORM);
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

  const handleClose = () => {
    setFormData(EMPTY_FORM);
    setImagePreview(null);
    setNewCategoryName("");
    setNewIngredientName("");
    setErrors({});
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    const price = Number(formData.price);
    if (!formData.price || isNaN(price) || price <= 0)
      newErrors.price = "Price must be a positive number";
    else if (price > PRICE_MAX)
      newErrors.price = `Price must not exceed €${PRICE_MAX.toLocaleString()}`;
    if (!formData.categoryId || formData.categoryId === "__new__")
      newErrors.categoryId = "Please select a category";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        price,
        categoryId: formData.categoryId,
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

  return {
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
  };
};

export default useMenuItemForm;
