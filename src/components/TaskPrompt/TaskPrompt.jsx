import React, { useState } from "react";
import useTaskContext from "../../hooks/useTaskContext";
import { ACTIONS } from "../../app/constants/actions";

function TaskPrompt() {
  const { dispatch, activeGroupID } = useTaskContext();
  const [error, setError] = useState({ error: false, message: "" });
  const [value, setValue] = useState("");
  const onChangeHandler = (e) => setValue(e.target.value);

  return (
    <form
      className="flex gap-1"
      onSubmit={(e) => {
        e.preventDefault();
        if (value.trim() === "") {
          setError({
            error: true,
            message: "Tugas tidak boleh kosong.",
          });
          setValue("");
          return;
        }
        dispatch({
          type: ACTIONS.ADD_TASK,
          newTaskText: value,
          groupID: activeGroupID,
        });
        setValue("");
      }}
    >
      <div className="flex-grow">
        <input
          type="text"
          className="w-full h-[40px] rounded-l-xl bg-secondary px-4 text-sm outline-none placeholder:text-slate-300"
          placeholder={`${
            error.error ? error.message : "ketikan tugas kamu disini."
          }`}
          required
          autoFocus
          onChange={onChangeHandler}
          value={value}
        />
      </div>
      <button
        type="submit"
        className="px-4 h-[40px] flex items-center justify-center bg-primary rounded-r-xl active:scale-90 transition-all"
      >
        <i className="bi bi-caret-down-fill"></i>
      </button>
    </form>
  );
}

export default TaskPrompt;
