import React from "react";
import { clearErrorMessage, clearSuccessMessage } from "../features/message/messageSlice";

const NotificationComponent = ({ errorMessage, successMessage, dispatch }) => {
  return (
    <div className="px-3 pt-6 fixed top-0 inset-x-0 z-50 flex justify-center p-3">
      {errorMessage ? (
        <p className="alert alert-warning">
          {errorMessage}{" "}
          <button className="ml-auto" onClick={() => dispatch(clearErrorMessage())}>
            Close (x)
          </button>
        </p>
      ) : null}
      {successMessage ? (
        <p className="alert alert-success">
          {successMessage}{" "}
          <button className="ml-auto" onClick={() => dispatch(clearSuccessMessage())}>
            Close (x)
          </button>
        </p>
      ) : null}
    </div>
  );
};

export default NotificationComponent;
