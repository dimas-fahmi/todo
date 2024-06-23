import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TaskProvider } from "./contexts/TaskContext";

// CSS Initializations
import "./css/directives.css";
import "./css/style.css";
import "./css/fonts.css";
import "./css/icons.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TaskProvider>
    <App />
  </TaskProvider>
);
