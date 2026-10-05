import React, { createContext, useContext, useState } from "react";

const DashboardContext = createContext(null);

export const DashboardProvider = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [restaurantsVersion, setRestaurantsVersion] = useState(0);

  const refreshRestaurants = () => {
    setRestaurantsVersion((v) => v + 1);
  };

  const toggleProject = (projectName) => {
    setSelectedProject((currentProject) =>
      currentProject === projectName ? null : projectName,
    );
  };

  const selectProject = (projectName) => {
    setSelectedProject(projectName);
  };

  const clearSelection = () => {
    setSelectedProject(null);
  };

  const value = {
    selectedProject,
    setSelectedProject,
    toggleProject,
    selectProject,
    clearSelection,
    restaurantsVersion,
    refreshRestaurants,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
