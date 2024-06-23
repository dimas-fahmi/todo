import React, { useState } from "react";
import useTaskContext from "../../hooks/useTaskContext";
import { ACTIONS } from "../../app/constants/actions";

function ModalDeleteGroup({
  deleteShow = false,
  deleteShowHandler,
  groupName,
  groupID,
}) {
  const { dispatch } = useTaskContext();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: ACTIONS.DELETE_GROUP,
      groupID: groupID,
    });
    deleteShowHandler();
  };
  return (
    <>
      <div
        className={`overlay fixed inset-0 bg-black pointer-events-none ${
          deleteShow ? "opacity-70" : "opacity-0"
        } transition-all duration-300`}
      ></div>
      <div
        className={`modal-container fixed inset-0 flex justify-center items-center ${
          deleteShow ? "scale-100" : "scale-0"
        } transition-all duration-300 max-w-[450px] m-auto px-4`}
      >
        {/* Modal */}
        <div className="modal bg-senary w-[420px] max-w-[420px] p-6 rounded-xl text-primary">
          <div className="header flex flex-col gap-2">
            <div className="icon m-auto min-w-[50px] max-w-[50px] min-h-[50px] max-h-[50px] rounded-full bg-primary flex items-center justify-center text-xl text-senary">
              <i className="bi bi-exclamation-triangle-fill"></i>
            </div>
            <div className="text-wrap leading-4 text-center quicksand-regular text-black text-sm">
              <h1 className="text-center text-xl text-primary oswald-regular">
                HAPUS GRUP
              </h1>
              <p className="mt-4">
                Aksi ini tidak bisa di urungkan dan semua tugas didalam grup
                akan ikut terhapus.
              </p>
            </div>
            <form
              action=""
              onSubmit={onSubmitHandler}
              className="flex flex-col px-7 mt-4"
            >
              <nav className="mt-2 flex flex-col gap-1">
                <button
                  type="submit"
                  className="py-2 w-full bg-secondary text-white quicksand-bold rounded-lg"
                >
                  Hapus
                </button>
                <button
                  type="button"
                  className="py-2 w-full bg-teal-500 text-white rounded-lg quicksand-bold"
                  onClick={deleteShowHandler}
                >
                  Batal
                </button>
              </nav>
              <small className="block text-left mt-4 text-wrap">
                <i className="bi bi-exclamation-triangle-fill"></i> Grup dengan
                nama
                <span className="poppins-bold"> {groupName}</span> akan dihapus
                beserta semua tugasnya.
              </small>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalDeleteGroup;
