import { useState, useEffect, useCallback } from "react";
import { restaurantService } from "../services";
import { mockRestaurants } from "../data/mockData";
import { useDashboard } from "../context";

export const useRestaurants = (useMock = false) => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setIsLoading(true);
        if (useMock) {
          setRestaurants(mockRestaurants);
        } else {
          const data = await restaurantService.getTopRestaurants();
          setRestaurants(data);
        }
      } catch (err) {
        setError(err.message);
        // Fallback to mock data on error
        setRestaurants(mockRestaurants);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, [useMock]);

  return { restaurants, isLoading, error };
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

export const useRestaurantSearch = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (filters) => {
    try {
      setIsLoading(true);
      const data = await restaurantService.searchRestaurants(filters);
      setResults(data);
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return { results, search, isLoading, error };
};
