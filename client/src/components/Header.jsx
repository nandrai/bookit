import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { contextProvider } from "../Context";

function Header() {
  const { user } = useContext(contextProvider);
  return (
    <div className="fixed shadow shadow-gray-400 top-0 left-0 w-full h-20 flex items-center justify-center bg-white z-40">
      <div className="flex items-center max-w-6xl justify-between w-full px-4 md:px-8 z-50">
        <Link to={"/"} className="logo flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 -rotate-90"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
          <span className="font-bold text-2xl">
            Book<span className=" text-primary">It</span>
          </span>
        </Link>

        <div className="flex items-center border border-gray-300 rounded-full gap-2 py-2 px-4 shadow-md shadow-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
              clipRule="evenodd"
            />
          </svg>
          <Link
            to={user ? "/account/profile" : "/login"}
            className=" bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 relative top-1"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <Link to={user ? "/account/profile" : "/login"}>
            {user ? <span>{user.name}</span> : <span>Login / Register</span>}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
