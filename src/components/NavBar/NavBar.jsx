import React from "react";

function NavBar() {
  return (
    <nav className="bg-secondary p-4 rounded-xl">
      <div className="flex gap-2 items-center">
        <img
          src="./logo-white.svg"
          alt="Todo Logo Agenda"
          className="w-[40px]"
        />
        <h1 className="poppins-bold text-3xl">TODO</h1>
      </div>
      <div></div>
    </nav>
  );
}

export default NavBar;
