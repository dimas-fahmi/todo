import React, { createContext, useEffect, useReducer, useState } from "react";
import core from "../app/core";

// Create a context for the task management system
const TaskContext = createContext();

// Initial state setup function
const getInitialState = () => {
  try {
    const stored = JSON.parse(localStorage.getItem("todo"));
    if (stored) {
      return stored;
    }
  } catch (error) {
    localStorage.clear();
    console.error(
      "Message: stored data is purged, Reason: failed to parse localStorage data, Error:",
      error
    );
  }
  return {
    groups: [{ id: crypto.randomUUID(), name: "Grup Baru", tasks: [] }],
    process_count: 0,
  };
};

const TaskProvider = ({ children }) => {
  const [{ groups, process_count }, dispatch] = useReducer(
    core,
    null,
    getInitialState
  );

  // Sync state with localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("todo", JSON.stringify({ groups, process_count }));
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  }, [groups, process_count]);

  // Manage the currently active group ID
  const [activeGroupID, setActiveGroupID] = useState(null);

  useEffect(() => {
    if (groups.length > 0) {
      if (!activeGroupID) {
        setActiveGroupID(groups[0].id);
      } else if (!groups.some((group) => group.id === activeGroupID)) {
        setActiveGroupID(groups[groups.length - 1].id);
      }
    }
  }, [groups, activeGroupID]);

  // Manage the tasks of the currently active group
  const [activeGroupTasks, setActiveGroupTasks] = useState([]);

  useEffect(() => {
    if (groups.length > 0 && activeGroupID) {
      const activeGroup = groups.find((group) => group.id === activeGroupID);
      setActiveGroupTasks(activeGroup?.tasks || groups[0].tasks);
    }
  }, [groups, activeGroupID]);

  return (
    <TaskContext.Provider
      value={{
        groups,
        process_count,
        activeGroupID,
        activeGroupTasks,
        dispatch,
        setActiveGroupID,
        setActiveGroupTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider };
