import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { displayErrorMessage, displaySuccessMessage } from "../features/message/messageSlice";
import { deleteTask, updateTasks } from "../features/tasks/tasksSlice";

export const Task = ({ task }) => {
  const [display, setDisplay] = useState(true);

  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      const deletedTask = await axios.delete(`/api/tasks/delete/${task.id}`);
      dispatch(deleteTask(deletedTask.data.id));
    } catch (error) {
      dispatch(displayErrorMessage(error.message.response.error));
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const newName = e.target.name.value;
    const newDescription = e.target.description.value;
    const newPriority = e.target.priority.value;
    const newDeadline = e.target.deadline.value;

    if (newName === "") {
      return dispatch(displayErrorMessage("Please fill the task name."));
    }

    const token = localStorage.getItem("currentUser");
    const parsedToken = JSON.parse(token);
    const headers = {
      Authorization: `Bearer ${parsedToken.token}`,
    };

    try {
      const updatedTask = await axios.put(
        `/api/tasks/edit/${task.id}`,
        { name: newName, description: newDescription, priority: newPriority, deadline: newDeadline },
        { headers }
      );

      const {deadline, description, id, name, priority, user} = updatedTask.data

      const newTask = {
        deadline,
        description,
        id,
        name,
        priority,
        user
      }

      dispatch(updateTasks({id, updatedTask: newTask}))
      dispatch(displaySuccessMessage("Task updated successfully 🔥"));
      setDisplay(true);
    } catch (error) {
      dispatch(displayErrorMessage(error.response.data.error));
    }
  };

  if (!display) {
    return (
      <div className="p-4 m-4 border border-gray-700 dark:border-gray-300 rounded-lg shadow-lg bg-white dark:bg-gray-800">
        <h3 className="text-xl font-semibold text-black dark:text-white">
          Editing:
        </h3>
        <form
          className="form-control"
          onReset={() => setDisplay(true)}
          onSubmit={handleEdit}
        >
          <label htmlFor="title" className="label">
            Name
          </label>
          <input
            name="name"
            defaultValue={task.name}
            className="text-lg input input-accent"
          ></input>

          <label htmlFor="description" className="label">
            Description
          </label>
          <input
            name="description"
            className="text-lg input input-accent"
            defaultValue={task.description}
          />

          <label htmlFor="priority" className="label">
            Priority
          </label>
          <select
            name="priority"
            className="select select-text select-accent"
            defaultValue={task.priority}
          >
            <option value="None">None</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <label htmlFor="deadline" className="label">
            Deadline
          </label>
          <input
            name="deadline"
            type="date"
            className="text-lg input input-accent"
            defaultValue={new Date(task.deadline).toISOString().split("T")[0]}
          />

          <button type="submit" className="btn btn-accent btn-sm mt-5">
            Update
          </button>
          <button type="reset" className="btn btn-secondary btn-sm mt-5">
            Cancel
          </button>
        </form>
      </div>
    );
  }

  if (display) {
    return (
      <div className="p-4 m-4 border border-gray-700 dark:border-gray-300 rounded-lg shadow-lg bg-white dark:bg-gray-800">
        <h3 className="text-3xl font-semibold text-black dark:text-white">
          Editing: {task.name}
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
          {task.description ? (
            <span>
              {" "}
              Description:{" "}
              <span className="text-white">{task.description}</span>
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
          className="btn btn-outline btn-secondary btn-sm mr-2"
        >
          Delete
        </button>
        <button
          onClick={() => setDisplay(false)}
          className="btn btn-outline btn-accent btn-sm mr-2"
        >
          Edit
        </button>
      </div>
    );
  }
};
