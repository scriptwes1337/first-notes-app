import "../index.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  displayErrorMessage,
  displaySuccessMessage,
} from "../features/message/messageSlice";
import axios from "axios";
import { setCurrentUser } from "../features/currentUser/currentUserSlice";
import NotificationComponent from "../components/NotificationComponent";
import checkUserValidity from "../../helpers/checkUserValidity";

export const Login = () => {
  const errorMessage = useSelector((state) => state.message.errorMessage);
  const successMessage = useSelector((state) => state.message.successMessage);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (loggedUser) {
      dispatch(setCurrentUser(loggedUser));
      return navigate("/home");
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
        dispatch(displaySuccessMessage("Logged in successfully!"));
        return navigate("/home");
      }
    } catch (error) {
      dispatch(displayErrorMessage(error.response.data.error));
    }
  };

  return (
    <div className="container mx-auto max-w-screen-sm p-2">
      <NotificationComponent
        errorMessage={errorMessage}
        successMessage={successMessage}
        dispatch={dispatch}
      />
      <p className="text-3xl my-6">Login</p>
      <form onSubmit={handleLogin} className="form-control">
        <label htmlFor="username" className="label">
          Username
        </label>
        <input
          type="text"
          name="username"
          id="usernameInput"
          className="input input-primary"
        />

        <label htmlFor="password" className="label">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="passwordInput"
          className="input input-primary"
        />

        <button type="submit" className="btn btn-primary my-5">
          Login
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link to="/register" className="underline">
          Create an account
        </Link>
      </p>
    </div>
  );
};
