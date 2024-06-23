import React, { useEffect } from "react";
import {
  NavBar,
  TaskGroups,
  HeadUnit,
  TaskPrompt,
  TaskBox,
  GroupBox,
} from "./components";
import useTaskContext from "./hooks/useTaskContext";

function App() {
  const { groups, activeGroupTasks } = useTaskContext();

  return (
    <div className="max-w-[450px] px-4 py-4 flex flex-col gap-2 m-auto max-h-[100vh] min-h-[100vh] overflow-hidden">
      {/* NavBar */}
      <NavBar />
      {/* TaskGroups */}
      <TaskGroups>
        {groups &&
          groups.map((group, index) => <GroupBox key={index} group={group} />)}
      </TaskGroups>
      {/* HeadUnit */}
      <HeadUnit />
      {/* TaskPrompt */}
      <TaskPrompt />
      {/* TaskBox */}
      <div className="flex-grow flex flex-col overflow-y-scroll custom-scrollbar pe-2 gap-2 mt-4">
        {activeGroupTasks.map((task, index) => (
          <TaskBox key={index} task={task} />
        ))}
      </div>
    </div>
  );
}

export default App;
