import { useState, useEffect } from "react";
import { menuService } from "../services";
import { mockMenuItems, mockMenuCategories } from "../data/mockData";

export const useMenuItems = (restaurantId, useMock = true) => {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setIsLoading(true);
        if (useMock || !restaurantId) {
          setMenuItems(mockMenuItems);
        } else {
          const data = await menuService.getMenuItems(restaurantId);
          setMenuItems(data);
        }
      } catch (err) {
        setError(err.message);
        setMenuItems(mockMenuItems);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, [restaurantId, useMock]);

  return { menuItems, isLoading, error };
};

export const useMenuCategories = (restaurantId, useMock = false) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        if (useMock || !restaurantId) {
          setCategories(mockMenuCategories);
        } else {
          const data = await menuService.getMenuCategories(restaurantId);
          setCategories(data);
        }
      } catch (err) {
        setError(err.message);
        setCategories(mockMenuCategories);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [restaurantId, useMock]);

  return { categories, isLoading, error };
};
