import axios from "axios";
import { setCurrentUser } from "../src/features/currentUser/currentUserSlice";
import { displayErrorMessage } from "../src/features/message/messageSlice";

const checkUserValidity = async (dispatch, navigate) => {
  const userDetails = JSON.parse(localStorage.getItem("currentUser"));
  if (!userDetails) {
    return navigate("/login");
  }

  try {
    const isValidUser = await axios.post("/api/users/verify", {
      token: userDetails.token,
    });
    const { username, name, id } = isValidUser.data;
    dispatch(setCurrentUser({ username, name, id, token: userDetails.token }));
  } catch (error) {
    dispatch(displayErrorMessage("Invalid token, please login again"));
    localStorage.removeItem("currentUser");
    navigate("/login");
  }
};

export default checkUserValidity;

