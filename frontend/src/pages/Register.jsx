import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { displayErrorMessage } from "../features/errorMessage/errorMessageSlice";

export const Register = () => {
  const errorMessage = useSelector((state) => state.errorMessage);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const newUser = await axios.post("/api/users/register", {
        name,
        username,
        password,
      });

      if (newUser.status === 201) {
        return navigate("/login");
      }
    } catch (error) {
      dispatch(displayErrorMessage(error.response.data.error));
    }
  };

  return (
    <>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="nameInput" />
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="usernameInput" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="text" name="password" id="passwordInput" />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
      {errorMessage && <p>{errorMessage.message}</p>}
    </>
  );
};
