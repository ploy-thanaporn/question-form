import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ children }) => {
  return (
    <div>
      <nav className="w-full bg-blue-400 h-14 px-8">
        <div className="flex items-center justify-between h-full">
          <Link to="/">
            <h1 className="text-white font-bold text-xl cursor-pointer">
              Question Form
            </h1>
          </Link>
          <div>
            <Link to={"/create-question"}>
              <button className="text-sm bg-blue-600 px-3 py-2 rounded-md text-white cursor-pointer">
                Create Question
              </button>
            </Link>
          </div>
        </div>
      </nav>
      <div className="px-8">{children}</div>
    </div>
  );
};

export default Navbar;
