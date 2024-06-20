import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { displayErrorMessage } from "../features/message/messageSlice";
import { deleteTask } from "../features/tasks/tasksSlice";

export const Task = ({ task }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      const deletedTask = await axios.delete(`/api/tasks/delete/${task.id}`);
      dispatch(deleteTask(deletedTask.data.id));
    } catch (error) {
      dispatch(displayErrorMessage(error.message.response.error));
    }
  };

  return (
    <div className="p-4 m-4 border border-gray-700 dark:border-gray-300 rounded-lg shadow-lg bg-white dark:bg-gray-800">
      <h3 className="text-3xl font-semibold text-black dark:text-white">
        {task.name}
      </h3>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
        {task.description ? (
          <span>
            {" "}
            Description: <span className="text-white">{task.description}</span>
          </span>
        ) : (
          <span className="italic">No description</span>
        )}
      </p>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
        {task.priority !== "None" ? (
          <span>
            {" "}
            Priority: <span className="text-white">{task.priority}</span>
          </span>
        ) : (
          <span className="italic">No priority</span>
        )}
      </p>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
        {task.deadline ? (
          <span>
            {" "}
            Deadline:{" "}
            <span className="text-white">
              {new Date(task.deadline).toLocaleDateString("en-sg")}
            </span>
          </span>
        ) : (
          <span className="italic">No deadline</span>
        )}
      </p>
      <button
        onClick={handleDelete}
        className="btn btn-outline btn-secondary btn-sm"
      >
        Delete
      </button>
    </div>
  );
};
