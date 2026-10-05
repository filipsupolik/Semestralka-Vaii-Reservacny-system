import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { menuService, menuCategoryService } from "../services";
import { useDashboard } from "./DashboardContext";

const MenuContext = createContext(null);

export const MenuProvider = ({ children }) => {
  const { selectedProject } = useDashboard();
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshMenu = useCallback(async () => {
    if (!selectedProject) {
      setMenuItems([]);
      setCategories([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const [items, menuCategories] = await Promise.all([
        menuService.getMenuItems(selectedProject),
        menuService.getMenuCategories(selectedProject),
      ]);
      setMenuItems(items);
      setCategories(menuCategories);
    } catch (err) {
      setError(err.message);
      setMenuItems([]);
      setCategories([]);
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

  const value = {
    menuItems,
    categories,
    selectedMenuItem,
    setSelectedMenuItem,
    isLoading,
    error,
    refreshMenu,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    createCategory,
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
