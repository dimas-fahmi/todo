import React, { useState } from "react";
import useTaskContext from "../../hooks/useTaskContext";
import { ACTIONS } from "../../app/constants/actions";
import ModalDeleteGroup from "./ModalDeleteGroup";

function ModalEditGroup({ show, showHandler, groupID, groupName }) {
  const { dispatch, groups } = useTaskContext();
  const [value, setValue] = useState(groupName);
  const [error, setError] = useState({ error: false, message: "" });
  const [deleteShow, setDeleteSHow] = useState(false);

  const deleteShowHandler = () => setDeleteSHow(!deleteShow);
  const onChangeHandler = (e) => setValue(e.target.value);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (value.trim() === "") {
      setError({ error: true, message: "Nama Grup tidak boleh kosong." });
      return;
    }
    dispatch({
      type: ACTIONS.EDIT_GROUP,
      groupID: groupID,
      newGroupText: value,
    });
    showHandler();
  };

  return (
    <>
      <div
        className={`overlay fixed inset-0 bg-black pointer-events-none ${
          show ? "opacity-70" : "opacity-0"
        } transition-all duration-300`}
      ></div>
      <div
        className={`modal-container fixed inset-0 flex justify-center items-center ${
          show ? "scale-100" : "scale-0"
        } transition-all duration-300 max-w-[450px] m-auto px-4`}
      >
        {/* Modal */}
        <div className="modal bg-senary w-[420px] max-w-[420px] p-6 rounded-xl text-primary relative">
          {groups.length > 1 && (
            <div className="absolute right-3 top-3">
              <button
                className="text-md bg-primary p-1 text-white rounded-md active:scale-90 transition-all"
                title={`klik untuk menghapus ${groupName}`}
                onClick={() => {
                  deleteShowHandler();
                  showHandler();
                }}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          )}

          <div className="header flex flex-col gap-2">
            <div className="icon m-auto min-w-[50px] max-w-[50px] min-h-[50px] max-h-[50px] rounded-full bg-primary flex items-center justify-center text-xl text-senary">
              <i className="bi bi-pencil-fill"></i>
            </div>
            <h1 className="text-center text-xl text-primary oswald-regular">
              EDIT GRUP
            </h1>
            <form
              action=""
              onSubmit={onSubmitHandler}
              className="flex flex-col px-7"
            >
              <label
                htmlFor="newGroupText"
                className="text-primary quicksand-bold"
              >
                Nama Grup
              </label>
              <input
                type="text"
                required
                value={value}
                onChange={onChangeHandler}
                className="h-[40px] bg-tertiary px-4 placeholder:text-slate-200 quicksand-regular text-white outline-primary rounded-tr-xl rounded-bl-xl"
                placeholder="Ketikan Nama Grup."
              />
              <nav className="mt-7 flex flex-col gap-1">
                <button
                  type="submit"
                  className="py-2 w-full bg-secondary text-white quicksand-bold rounded-lg"
                >
                  Simpan
                </button>
                <button
                  type="button"
                  className="py-2 w-full bg-quaternary rounded-lg quicksand-bold"
                  onClick={showHandler}
                >
                  Batal
                </button>
              </nav>
            </form>
          </div>
        </div>
      </div>
      <ModalDeleteGroup
        deleteShow={deleteShow}
        deleteShowHandler={deleteShowHandler}
        groupID={groupID}
        groupName={groupName}
      />
    </>
  );
}

export default ModalEditGroup;
