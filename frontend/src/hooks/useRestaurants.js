import { useState, useEffect, useCallback } from "react";
import { restaurantService } from "../services";
import { useDashboard } from "../context";

export const useTopRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setIsLoading(true);
        const data = await restaurantService.getTopRestaurants();
        setRestaurants(data);
      } catch (err) {
        setError(err.message);
        setRestaurants([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return { restaurants, isLoading, error };
};

export const useRestaurants = ({ page, pageSize, name, category } = {}) => {
  const [restaurants, setRestaurants] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setIsLoading(true);
        const data = await restaurantService.getRestaurants({
          page,
          pageSize,
          name,
          category,
        });
        setRestaurants(data.items);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err.message);
        setRestaurants([]);
        setTotal(0);
        setTotalPages(0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, [page, pageSize, name, category]);

  return { restaurants, total, totalPages, isLoading, error };
};

export const useMyRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { restaurantsVersion } = useDashboard();

  const fetchMyRestaurants = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await restaurantService.getMyRestaurants();
      setRestaurants(data);
    } catch (err) {
      setError(err.message);
      setRestaurants([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyRestaurants();
  }, [fetchMyRestaurants, restaurantsVersion]);

  return { restaurants, isLoading, error, refetch: fetchMyRestaurants };
};
