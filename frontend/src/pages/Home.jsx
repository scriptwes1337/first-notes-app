import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import checkUserValidity from "../../helpers/checkUserValidity";
import { NewTask } from "../components/NewTask";
import { Task } from "../components/Task";
import axios from "axios";
import { setTasks } from "../features/tasks/tasksSlice";
import { Navbar } from "../components/Navbar";
import NotificationComponent from "../components/NotificationComponent";

export const Home = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const tasks = useSelector((state) => state.tasks);
  const errorMessage = useSelector((state) => state.message.errorMessage);
  const successMessage = useSelector((state) => state.message.successMessage);

  // These are passed into checkUserValidity since you cannot call hooks within hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Verifies JWT by posting to the verify API route
    checkUserValidity(dispatch, navigate);

    axios
      .get(`/api/tasks/${currentUser.id}`)
      .then((res) => dispatch(setTasks(res.data)));
  }, [currentUser]);

  return (
    <div>
      <Navbar user={currentUser} />
      <NotificationComponent
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
      <NewTask />

      <div className="flex flex-col">
        <p className="text-2xl p-4 text-white">Your tasks:</p>
        {tasks.map((task) =>
          task ? <Task task={task} key={task.id} /> : null
        )}
      </div>
    </div>
  );
};
