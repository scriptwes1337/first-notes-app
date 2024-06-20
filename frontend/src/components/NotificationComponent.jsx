import React from "react";

const NotificationComponent = ({ errorMessage, successMessage }) => {
  return (
    <div className="px-3 pt-6 fixed top-0 inset-x-0 z-50 flex justify-center p-3">
      {errorMessage ? (
        <p className="alert alert-warning">{errorMessage}</p>
      ) : null}
      {successMessage ? (
        <p className="alert alert-success">{successMessage}</p>
      ) : null}
    </div>
  );
};

export default NotificationComponent;
