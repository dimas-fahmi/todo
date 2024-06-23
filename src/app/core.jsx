import { ACTIONS } from "./constants/actions";

function updateGroup(groups, groupID, updater) {
  return groups.map((group) => (group.id === groupID ? updater(group) : group));
}

function core(state, action) {
  const { type, groupID, newTaskText, newGroupText, taskID } = action;
  let updatedGroups;

  switch (type) {
    case ACTIONS.ADD_GROUP:
      updatedGroups = [
        ...state.groups,
        { id: groupID, name: newGroupText, tasks: [] },
      ];
      return { ...state, groups: updatedGroups };

    case ACTIONS.DELETE_GROUP:
      updatedGroups = state.groups.filter((group) => group.id !== groupID);
      return { ...state, groups: updatedGroups };

    case ACTIONS.EDIT_GROUP:
      updatedGroups = updateGroup(state.groups, groupID, (group) => ({
        ...group,
        name: newGroupText,
      }));
      return {
        ...state,
        groups: updatedGroups,
        process_count: state.process_count + 1,
      };

    case ACTIONS.ADD_TASK:
      updatedGroups = updateGroup(state.groups, groupID, (group) => ({
        ...group,
        tasks: [
          ...group.tasks,
          { id: self.crypto.randomUUID(), task: newTaskText, done: false },
        ],
      }));
      return { ...state, groups: updatedGroups };

    case ACTIONS.DELETE_TASK:
      updatedGroups = updateGroup(state.groups, groupID, (group) => ({
        ...group,
        tasks: group.tasks.filter((task) => task.id !== taskID),
      }));
      return { ...state, groups: updatedGroups };

    case ACTIONS.EDIT_TASK:
      updatedGroups = updateGroup(state.groups, groupID, (group) => ({
        ...group,
        tasks: group.tasks.map((task) =>
          task.id === taskID ? { ...task, task: newTaskText } : task
        ),
      }));
      return {
        ...state,
        groups: updatedGroups,
        process_count: state.process_count + 1,
      };

    case ACTIONS.TOGGLE_TASK:
      updatedGroups = updateGroup(state.groups, groupID, (group) => ({
        ...group,
        tasks: group.tasks.map((task) =>
          task.id === taskID ? { ...task, done: !task.done } : task
        ),
      }));
      return {
        ...state,
        groups: updatedGroups,
        process_count: state.process_count + 1,
      };

    case ACTIONS.CLEAR_TASKS:
      updatedGroups = updateGroup(state.groups, groupID, (group) => ({
        ...group,
        tasks: [],
      }));
      return { ...state, groups: updatedGroups };

    default:
      return state;
  }
}

export default core;
