import React, { useState } from "react";
import useTaskContext from "../../hooks/useTaskContext";
import { ACTIONS } from "../../app/constants/actions";

function ModalAddGroup({ show = false, showHandler }) {
  const { dispatch, setActiveGroupID } = useTaskContext();
  const [error, setError] = useState({ error: false, message: "" });
  const [value, setValue] = useState("");
  let randomUUID;

  // Handler
  const onChangeHandler = (e) => setValue(e.target.value);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (value.trim() === "") {
      setError({ error: true, message: "Nama Grup tidak boleh kosong" });
      return;
    }
    randomUUID = self.crypto.randomUUID();
    dispatch({
      type: ACTIONS.ADD_GROUP,
      newGroupText: value,
      randomUUID: randomUUID,
    });
    setActiveGroupID(randomUUID);
    setValue("");
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
        <div className="modal bg-senary w-[420px] max-w-[420px] p-6 rounded-xl text-primary">
          <div className="header flex flex-col gap-2">
            <div className="icon m-auto min-w-[50px] max-w-[50px] min-h-[50px] max-h-[50px] rounded-full bg-primary flex items-center justify-center text-3xl text-senary">
              <i className="bi bi-plus-circle-fill"></i>
            </div>
            <h1 className="text-center text-xl text-primary oswald-regular">
              GRUP BARU
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
    </>
  );
}

export default ModalAddGroup;
