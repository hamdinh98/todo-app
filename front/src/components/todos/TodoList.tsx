import React, { useEffect, useState, useRef } from "react";
import "./TodoList.css";
import { Task, TaskStatus } from "../../model/Task";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PaginationItems from "../pagination/Pagination";

interface DetailsPropos {
  isOpen: boolean;
  details: Task;
}
const Details = (props: DetailsPropos) => {
  return (
    <React.Fragment>
      {props.isOpen && (
        <div>
          <div>
            <label>
              title: <h2>{props.details.title}</h2>
            </label>
            <label>
              Note: <p>{props.details.note}</p>
            </label>
            <label>
              status: <p>{props.details.status}</p>
            </label>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

// @ts-ignore
function TaskRow({ task }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toogleDetails = () => {
    setIsOpen(!isOpen);
  };
  const removeTask = async (id: number) => {
    // @ts-ignore
    const { data } = await axios.delete(`http://localhost:8000/todo`, {
      data: { ids: [id] },
    });
    if (data) {
      // @ts-ignore
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };
  // @ts-ignore
  return (
    <div className="task">
      <h1
        style={{ textDecoration: task.status == "done" ? "line-through" : "" }}
      >
        {task.title}
      </h1>
      <h3> {task.status}</h3>
      <button
        style={{ background: "blue" }}
        onClick={() => navigate(`/update/${task.id}`)}
      >
        update
      </button>
      <button style={{ background: "red" }} onClick={() => removeTask(task.id)}>
        x
      </button>
      <button style={{ background: "blue" }} onClick={() => toogleDetails()}>
        Details
      </button>
      <Details isOpen={isOpen} details={task} />
    </div>
  );
}

function TodoList() {
  const [tasks, setTasks] = useState<Task[] | undefined>([]);

  const filter = async (status: string) => {
    try {
      const { data } = await axios.get(`http://localhost:8000/todo`, {
        params: { status: status === "all" ? null : status },
      });
      if (data) {
        console.log(data.todosList);
        setTasks(data.todosList);
      } else {
        setTasks([]);
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      <div className="todo-container">
        <div className="header">Todo - ITEMS</div>
        Filter by status
        <select
          name="status"
          id="status"
          onChange={(e) => {
            filter(e.target.value);
          }}
        >
          <option value="all">All</option>
          <option value={TaskStatus.TODO}>Todo</option>
          <option value={TaskStatus.DONE}>DONE</option>
          <option value={TaskStatus.IN_PROGRESS}>IN-PROGRESS</option>
        </select>
        <div className="tasks">
          {tasks ? (
            tasks.map((task, index) => (
              <TaskRow
                task={task}
                // @ts-ignore
                index={index}
                key={index}
              />
            ))
          ) : (
            <div>No tasks found</div>
          )}
        </div>
      </div>
      <PaginationItems setTasks={setTasks} />
    </>
  );
}

export default TodoList;
