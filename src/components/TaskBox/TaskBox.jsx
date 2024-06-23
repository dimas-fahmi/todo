import React, { useState } from "react";
import useTaskContext from "../../hooks/useTaskContext";
import { ACTIONS } from "../../app/constants/actions";
import ModalEditTask from "../Modals/ModalEditTask";
import ModalDeleteTask from "../Modals/ModalDeleteTask";

function TaskBox({ task }) {
  const { dispatch, activeGroupID } = useTaskContext();
  const [show, setShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);

  const showHandler = () => setShow(!show);
  const deleteShowHandler = () => setDeleteShow(!deleteShow);

  const toggleHandler = () => {
    dispatch({
      type: ACTIONS.TOGGLE_TASK,
      groupID: activeGroupID,
      taskID: task.id,
    });
  };

  return (
    <>
      <div className="bg-secondary p-4 rounded-xl flex justify-between">
        <div className="flex items-center gap-2">
          <button
            className={`min-w-[28px] max-w-[28px] min-h-[28px] max-h-[28px] border-2 rounded-full active:scale-90 transition-all ${
              task.done ? "border-teal-500 bg-teal-500" : "border-senary"
            }`}
            onClick={toggleHandler}
          ></button>
          <p
            className={`${
              task.done ? "line-through quicksand-bold" : "quicksand-regular"
            }`}
          >
            {task.task}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            className="hover:text-quinary active:scale-90 transition-all"
            onClick={showHandler}
          >
            <i className="bi bi-pencil-square"></i>
          </button>
          <button
            className="hover:text-quinary active:scale-90 transition-all"
            onClick={deleteShowHandler}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
      <ModalEditTask
        show={show}
        showHandler={showHandler}
        taskID={task.id}
        taskName={task.task}
        deleteShowHandler={deleteShowHandler}
      />
      <ModalDeleteTask
        deleteShow={deleteShow}
        deleteShowHandler={deleteShowHandler}
        taskID={task.id}
        taskName={task.task}
      />
    </>
  );
}

export default TaskBox;
