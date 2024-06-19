import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import checkUserValidity from "../../helpers/checkUserValidity";

export const Dashboard = () => {
  const currentUser = useSelector((state) => state.currentUser);

  // These are passed into checkUserValidity since you cannot call hooks within hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    // Verifies JWT by posting to the verify API route
    checkUserValidity(dispatch, navigate);
  }, []);

  return (
    <>
    <div>{currentUser.username} is logged in</div>
      <h1>Welcome, {currentUser.name}</h1>
    </>
  );
};
