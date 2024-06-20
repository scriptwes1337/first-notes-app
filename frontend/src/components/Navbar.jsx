import React from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/")
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
          <button onClick={handleLogout} className="btn btn-secondary btn-outline">
            Logout
          </button>
        </div>
      </div>
    </>
  );
};
