import React, { useEffect, useState } from "react";
import "./Todo.style.css";
import { Task, TaskStatus } from "../../model/Task";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { Simulate } from "react-dom/test-utils";
import submit = Simulate.submit;

// @ts-ignore
function TaskRow({ task, removeTask, changeStatus }) {
  const navigate = useNavigate();
  return (
    <div
      className="task"
      style={{ textDecoration: task.status == "done" ? "line-through" : "" }}
    >
      {task.title}
      <button
        style={{ background: "blue" }}
        onClick={() => navigate(`/update/${task.id}`)}
      >
        update
      </button>
      <button style={{ background: "red" }} onClick={() => removeTask(task.id)}>
        x
      </button>
      {["todo", "done", "in-progress"].map((status, index) => {
        return (
          status !== task.status && (
            <button
              onClick={() => {
                changeStatus(task.id, status);
              }}
            >
              {status}
            </button>
          )
        );
      })}
    </div>
  );
}

function Todo() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [tasks, setTasks] = useState<Task[] | undefined>(undefined);
  //fetching data from the backend
  // @ts-ignore
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:8000/todo");
      if (data) {
        setTasks(data);
      }
    };
    fetchData();
    return () => {
      setTasks(undefined);
    };
  }, []);

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
  const changeStatus = async (index: number, status: string) => {
    const { data } = await axios.patch(`http://localhost:8000/todo/${index}`, {
      status: status,
    });
  };

  const filter = async (status: string) => {
    try {
      const { data } = await axios.get(`http://localhost:8000/todo`, {
        params: { status: status === "all" ? undefined : status },
      });
      if (data) {
        console.log(tasks);
        console.log(data);
        setTasks(data);
        //console.log(tasks);
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <div className="todo-container">
      <div className="header">TODO - ITEMS</div>
      <select
        name="status"
        id="status"
        onChange={(e) => {
          filter(e.target.value);
        }}
      >
        <option value="all">All</option>
        <option value={TaskStatus.TODO}>TODO</option>
        <option value={TaskStatus.DONE}>DONE</option>
        <option value={TaskStatus.IN_PROGRESS}>IN-PROGRESS</option>
      </select>
      <div className="tasks">
        {tasks?.map((task, index) => (
          <TaskRow
            task={task}
            // @ts-ignore
            index={index}
            changeStatus={changeStatus}
            removeTask={removeTask}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default Todo;
