import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSuccessMessage } from "../features/message/messageSlice";

export const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    dispatch(setSuccessMessage("Logged out successfully."));
  };

  return (
    <>
      <div className="navbar bg-base-300 text-white px-8">
        <div className="flex-auto">
          <p className="text-xl">
            Welcome, {user.name} (@{user.username})
          </p>
        </div>
        <div className="flex-none">
          <button
            onClick={handleLogout}
            className="btn btn-secondary btn-outline btn-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};
