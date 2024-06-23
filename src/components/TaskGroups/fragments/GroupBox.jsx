import React, { useState } from "react";
import useTaskContext from "../../../hooks/useTaskContext";
import ModalEditGroup from "../../Modals/ModalEditGroup";

function GroupBox({ group }) {
  const { activeGroupID, setActiveGroupID } = useTaskContext();
  const [show, setShow] = useState(false);

  const groupHandler = () => {
    setActiveGroupID(group.id);
  };

  const showHandler = () => setShow(!show);

  return (
    <>
      <div className="flex">
        <button
          className="bg-secondary border-y-2 border-l-2 border-secondary flex gap-2 py-2 px-4 rounded-l-xl items-center quicksand-regular hover:underline active:bg-quaternary active:text-primary transition-all duration-100"
          onClick={groupHandler}
        >
          {activeGroupID === group.id ? (
            <i className="bi bi-toggle-on text-xl"></i>
          ) : (
            <i className="bi bi-toggle-off text-xl"></i>
          )}
          <span>{group.name}</span>
        </button>
        <button
          className="bg-senary border-y-2 border-r-2 border-senary px-2 rounded-r-xl text-primary active:bg-quaternary active:text-primary transition-all duration-100"
          onClick={showHandler}
        >
          <i className="bi bi-pencil-fill"></i>
        </button>
      </div>
      <ModalEditGroup
        show={show}
        showHandler={showHandler}
        groupID={group.id}
        groupName={group.name}
      />
    </>
  );
}

export default GroupBox;
