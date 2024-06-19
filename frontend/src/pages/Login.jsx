import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { displayErrorMessage } from "../features/errorMessage/errorMessageSlice";
import axios from "axios";
import { setCurrentUser } from "../features/currentUser/currentUserSlice";

export const Login = () => {
  const errorMessage = useSelector((state) => state.errorMessage);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (loggedUser) {
      dispatch(setCurrentUser(loggedUser));
      return navigate("/dashboard");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const loginAttempt = await axios.post("/api/users/login", {
        username,
        password,
      });

      if (loginAttempt.status === 200) {
        localStorage.setItem("currentUser", JSON.stringify(loginAttempt.data));
        const { id, token, username, name } = loginAttempt.data;
        dispatch(setCurrentUser({ id, token, username, name }));
        return navigate("/dashboard");
      }
    } catch (error) {
      dispatch(displayErrorMessage(error.response.data.error));
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="usernameInput" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="text" name="password" id="passwordInput" />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
      {errorMessage && <p>{errorMessage.message}</p>}
    </>
  );
};
