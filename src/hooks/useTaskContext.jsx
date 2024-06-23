import React, { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";

function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("API Context not in place");
  }
  return context;
}

export default useTaskContext;
