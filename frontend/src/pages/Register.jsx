import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { displayErrorMessage, displaySuccessMessage } from "../features/message/messageSlice";
import NotificationComponent from "../components/NotificationComponent";

export const Register = () => {
  const errorMessage = useSelector((state) => state.message.errorMessage);
  const successMessage = useSelector((state) => state.message.successMessage)

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
        dispatch(displaySuccessMessage("Account created successfully 🎉"));
        return navigate("/login");
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
      />
      <p className="text-3xl my-6">Create an account</p>
      <form onSubmit={handleRegister} className="form-control">
        <label htmlFor="name" className="label">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="nameInput"
          className="input input-primary"
        />

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
          type="text"
          name="password"
          id="passwordInput"
          className="input input-primary"
        />

        <button type="submit" className="btn btn-primary my-5">
          Register
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <Link to="/login" className="underline">
          Login
        </Link>
      </p>
    </div>
  );
};
