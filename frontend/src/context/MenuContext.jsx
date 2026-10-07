import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  menuService,
  menuCategoryService,
  ingredientService,
} from "../services";
import { useDashboard } from "./DashboardContext";

const MenuContext = createContext(null);

export const MenuProvider = ({ children }) => {
  const { selectedProject } = useDashboard();
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshMenu = useCallback(async () => {
    if (!selectedProject) {
      setMenuItems([]);
      setCategories([]);
      setIngredients([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const [items, menuCategories, allIngredients] = await Promise.all([
        menuService.getMenuItems(selectedProject),
        menuService.getMenuCategories(selectedProject),
        ingredientService.getAllIngredients(),
      ]);
      setMenuItems(items);
      setCategories(menuCategories);
      setIngredients(allIngredients);
    } catch (err) {
      setError(err.message);
      setMenuItems([]);
      setCategories([]);
      setIngredients([]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedProject]);

  useEffect(() => {
    setSelectedMenuItem(null);
    refreshMenu();
  }, [refreshMenu]);

  const ensureRestaurantSelected = () => {
    if (!selectedProject) {
      throw new Error("Select a restaurant first");
    }
  };

  const createMenuItem = async (menuItemData) => {
    ensureRestaurantSelected();
    const createdItem = await menuService.createMenuItem(
      selectedProject,
      menuItemData,
    );
    await refreshMenu();
    return createdItem;
  };

  const updateMenuItem = async (menuItemId, menuItemData) => {
    ensureRestaurantSelected();
    const updatedItem = await menuService.updateMenuItem(
      selectedProject,
      menuItemId,
      menuItemData,
    );
    await refreshMenu();
    return updatedItem;
  };

  const deleteMenuItem = async (menuItemId) => {
    ensureRestaurantSelected();
    await menuService.deleteMenuItem(selectedProject, menuItemId);
    setSelectedMenuItem(null);
    await refreshMenu();
  };

  const createCategory = async (name) => {
    ensureRestaurantSelected();
    const createdCategory = await menuCategoryService.createCategory(name);
    await refreshMenu();
    return createdCategory;
  };

  const createIngredient = async (name) => {
    ensureRestaurantSelected();
    const createdIngredient = await ingredientService.createIngredient(name);
    await refreshMenu();
    return createdIngredient;
  };

  const value = {
    menuItems,
    categories,
    ingredients,
    selectedMenuItem,
    setSelectedMenuItem,
    isLoading,
    error,
    refreshMenu,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    createCategory,
    createIngredient,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
