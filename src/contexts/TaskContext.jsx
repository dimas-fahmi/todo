import React, { createContext, useEffect, useReducer, useState } from "react";
import core from "../app/core";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  // LOGICS
  // const [{ groups, process_count }, dispatch] = useReducer(core, {
  //   groups: [{ id: self.crypto.randomUUID(), name: "Grup Baru", tasks: [] }],
  //   process_count: 0,
  // });

  const [{ groups, process_count }, dispatch] = useReducer(core, null, () => {
    const stored = JSON.parse(localStorage.getItem("todo"));
    return stored
      ? stored
      : {
          groups: [
            { id: self.crypto.randomUUID(), name: "Grup Baru", tasks: [] },
          ],
          process_count: 0,
        };
  });

  // Update LocalStorage everytime there's a change
  useEffect(() => {
    localStorage.setItem(
      "todo",
      JSON.stringify({ groups: groups, process_count: process_count })
    );
  }, [groups, process_count]);

  //   ActiveGrup Handler
  const [activeGroupID, setActiveGroupID] = useState(null);
  useEffect(() => {
    if (groups?.length > 0 && activeGroupID === null) {
      setActiveGroupID(groups[0].id);
    }

    if (!groups.find((group) => group.id === activeGroupID)?.tasks) {
      setActiveGroupID(groups[groups.length - 1].id);
    }
  }, [groups, process_count]);

  //   ActiveGroupTasks Handler
  const [activeGroupTasks, setActiveGroupTasks] = useState([]);
  useEffect(() => {
    if (groups.length > 0 && activeGroupID != null) {
      if (groups.find((group) => group.id === activeGroupID)?.tasks) {
        setActiveGroupTasks(
          groups.find((group) => group.id === activeGroupID).tasks
        );
      } else {
        setActiveGroupTasks(groups[0].tasks);
      }
    }
  }, [groups, activeGroupID, process_count]);
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
