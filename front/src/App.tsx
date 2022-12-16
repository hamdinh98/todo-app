import "./App.css";
import TodoList from "./components/todos/TodoList";
import LoginForm from "./components/login/Login.component";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
  useParams,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Form from "./components/form/form.component";
import { Task } from "./model/Task";
import React from "react";
import PrivateRoute from "./utils/PrivateRoute";
import axios from "axios";

const LoginElementForRoutes = () => {
  return (
    <>
      <Navbar />
      <LoginForm
        onSubmit={(username, password) =>
          localStorage.setItem(
            "username",
            JSON.stringify({
              username,
              password,
            })
          )
        }
      />
    </>
  );
};

const ListElementForRoutes = () => {
  return (
    // @ts-ignore
    <PrivateRoute>
      <Navbar />
      <TodoList />
    </PrivateRoute>
  );
};

const AddElementForRoutes = () => {
  const navigate = useNavigate();
  return (
    <PrivateRoute>
      <Navbar />
      <Form
        // @ts-ignore
        submit={async (task: Task) => {
          try {
            const { data } = await axios.post(
              "http://localhost:8000/todo",
              task
            );
            if (data) {
              console.log(data);
              navigate("/list");
            }
          } catch (e) {
            console.log(e);
          }
        }}
        action="create"
      />
    </PrivateRoute>
  );
};

const UpdateElementForRoutes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <PrivateRoute>
      <Navbar />
      <Form
        submit={async (todo?: Task) => {
          try {
            const { data } = await axios.patch(
              `http://localhost:8000/todo/${id}`,
              todo
            );
            if (data) {
              navigate("/list");
            }
          } catch (e) {
            console.log(e);
          }
        }}
        action="update"
      />
    </PrivateRoute>
  );
};
export const routes = [
  {
    path: "",
    element: <LoginElementForRoutes />,
  },
  {
    path: "/list",
    element: <ListElementForRoutes />,
  },
  {
    path: "/add",
    element: <AddElementForRoutes />,
  },
  {
    path: "/update/:id",
    element: <UpdateElementForRoutes />,
  },
];
const router = createBrowserRouter(routes);
const App = () => <RouterProvider router={router} />;

export default App;
