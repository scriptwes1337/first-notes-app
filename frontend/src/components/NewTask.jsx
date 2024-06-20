import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  displayErrorMessage,
  displaySuccessMessage,
} from "../features/message/messageSlice";
import { appendTask } from "../features/tasks/tasksSlice";

export const NewTask = () => {
  const [display, setDisplay] = useState(false);
  const dispatch = useDispatch();

  const handleNewTask = async (e) => {
    e.preventDefault();
    const name = e.target.taskName.value;
    const description = e.target.taskDescription.value;
    const priority = e.target.taskPriority.value;
    const deadline = e.target.taskDeadline.value;

    if (name === "") {
      return dispatch(displayErrorMessage("Please fill the task name."));
    }

    const token = localStorage.getItem("currentUser");
    const parsedToken = JSON.parse(token);
    const headers = {
      Authorization: `Bearer ${parsedToken.token}`,
    };

    try {
      const newTask = await axios.post(
        "/api/tasks/create",
        { name, description, priority, deadline },
        { headers }
      );
      dispatch(appendTask(newTask.data));
      dispatch(displaySuccessMessage("Task added successfully 🔥"));
      setDisplay(false);
      e.target.taskName.value = "";
      e.target.taskDescription.value = "";
      e.target.taskPriority.value = "";
      e.target.taskDeadline.value = "";
    } catch (error) {
      dispatch(displayErrorMessage(error.response.data.error));
    }
  };

  if (!display) {
    return (
      <button className="btn btn-accent m-8" onClick={() => setDisplay(true)}>
        Create Task
      </button>
    );
  }

  if (display) {
    return (
      <div className="p-8 mx-auto">
        <button
          onClick={() => setDisplay(!display)}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        <p className="text-3xl my-6">New Task</p>
        <form onSubmit={handleNewTask} className="form-control">
          <label htmlFor="taskName" className="label">
            Task Name
          </label>
          <input
            type="text"
            name="taskName"
            id="taskNameInput"
            className="input input-primary"
          />

          <label htmlFor="taskDescription" className="label">
            Description
          </label>
          <input
            type="text"
            name="taskDescription"
            id="taskDescriptionInput"
            className="input input-primary"
          />

          <label htmlFor="taskPriority" className="label">
            Priority
          </label>
          <select
            name="taskPriority"
            id="taskPriorityInput"
            className="select select-primary"
            defaultValue="none"
          >
            <option value="None">
              None
            </option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <label htmlFor="taskName" className="label">
            Deadline
          </label>
          <input
            type="date"
            name="taskDeadline"
            id="taskDeadlineInput"
            className="input input-primary"
          />

          <button type="submit" className="btn btn-accent my-5">
            Create
          </button>
        </form>
      </div>
    );
  }
};
