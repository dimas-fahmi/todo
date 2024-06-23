import { ACTIONS } from "./constants/actions";

function core(
  state,
  { type, groupID, newTaskText, newGroupText, randomUUID, taskID }
) {
  let updatedGroups, task;
  switch (type) {
    case ACTIONS.ADD_GROUP:
      updatedGroups = [
        ...state.groups,
        { id: randomUUID, name: newGroupText, tasks: [] },
      ];

      return {
        ...state,
        groups: updatedGroups,
        process_count: state.process_count + 1,
      };
    case ACTIONS.DELETE_GROUP:
      // DELETE SPECIFIC GROUP
      updatedGroups = state.groups.filter((group) => group.id !== groupID);

      return {
        ...state,
        groups: updatedGroups,
      };
    case ACTIONS.EDIT_GROUP:
      // Use map to edit specific group
      updatedGroups = state.groups.map((group) => {
        if (group.id === groupID) {
          return {
            ...group,
            name: newGroupText,
          };
        } else {
          return group;
        }
      });

      return {
        ...state,
        groups: updatedGroups,
        process_count: state.process_count + 1,
      };
    case ACTIONS.ADD_TASK:
      updatedGroups = state.groups.map((group) => {
        if (group.id === groupID) {
          return {
            ...group,
            tasks: [
              ...group.tasks,
              { id: self.crypto.randomUUID(), task: newTaskText, done: false },
            ],
          };
        } else {
          return group;
        }
      });

      return {
        ...state,
        groups: updatedGroups,
        process_count: state.process_count + 1,
      };
    case ACTIONS.DELETE_TASK:
      updatedGroups = state.groups.map((group) => {
        if (group.id === groupID) {
          return {
            ...group,
            tasks: group.tasks.filter((task) => task.id !== taskID),
          };
        } else {
          return group;
        }
      });

      return {
        ...state,
        groups: updatedGroups,
        process_count: state.process_count + 1,
      };
    case ACTIONS.EDIT_TASK:
      updatedGroups = state.groups.map((group) => {
        if (group.id === groupID) {
          task = group.tasks.find((task) => task.id === taskID);
          task.task = newTaskText;
          return {
            ...group,
            tasks: group.tasks,
          };
        } else {
          return group;
        }
      });

      return {
        ...state,
        groups: updatedGroups,
        process_count: state.process_count + 1,
      };
    case ACTIONS.TOGGLE_TASK:
      updatedGroups = state.groups.map((group) => {
        if (group.id === groupID) {
          task = group.tasks.find((task) => task.id === taskID);
          task.done = !task.done;
          return {
            ...group,
            tasks: group.tasks,
          };
        } else {
          return group;
        }
      });
      return {
        ...state,
        groups: updatedGroups,
        process_count: state.process_count + 1,
      };

    case ACTIONS.CLEAR_TASKS:
      break;
  }
  return state;
}

export default core;
