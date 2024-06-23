import React, { useState } from "react";
import ModalAddGroup from "../Modals/ModalAddGroup";

function TaskGroups({ children }) {
  const [show, setShow] = useState(false);

  const showHandler = () => setShow(!show);

  return (
    <>
      <div className="flex-shrink-0 flex text-nowrap gap-2 overflow-x-scroll pb-1 custom-scrollbar">
        {children}
        <button
          className="bg-senary border-2 border-senary px-2 rounded-xl text-primary active:bg-quaternary active:text-primary transition-all duration-100 flex items-center justify-center"
          onClick={showHandler}
        >
          <i className="bi bi-plus-lg"></i>
        </button>
      </div>
      <ModalAddGroup show={show} showHandler={showHandler} />
    </>
  );
}

export default TaskGroups;
