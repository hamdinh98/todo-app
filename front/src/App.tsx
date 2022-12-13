import "./App.css";
import Todo from "./components/todos/Todo.component";
import LoginForm from "./components/login/Login.component"
import {
    createBrowserRouter,
    RouterProvider, useNavigate, useParams,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar.component";
import Form from "./components/form/form.component";
import {Task} from "./model/Task";
import React from "react";
import PrivateRoute from "./utils/PrivateRoute";
import axios from "axios";
import navbarComponent from "./components/navbar/Navbar.component";

const LoginElementForRoutes = () => {

  return(
      <>
        <Navbar />
        <LoginForm onSubmit={(username, password)=> localStorage.setItem('username',JSON.stringify({
        username,password
        }))}/>
      </>
  )
}

const ListElementForRoutes = () => {
    return(
        // @ts-ignore
        <PrivateRoute>
            <Navbar />
            <Todo />
        </PrivateRoute>
    )
}

const AddElementForRoutes = () => {

    const navigate = useNavigate();
    return (
      <PrivateRoute>
        <Navbar />
        <Form
            // @ts-ignore
          submit={async (task: Task) => {
              try {
                  const {data} = await axios.post('http://localhost:8000/todo',task);
                  if(data){
                      console.log(data);
                      navigate('/list');
                  }
              }catch (e) {
                  console.log(e);
              }
          }}
        />
      </PrivateRoute>
    );
}

const UpdateElementForRoutes = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    return(
        <PrivateRoute>
            <Navbar />
            <Form submit={async (todo?: Task)=>{
                try {
                    const {data} = await axios.patch(`http://localhost:8000/todo/${id}`,todo);
                    if(data){
                        navigate('/list');
                    }
                }catch (e) {
                    console.log(e);
                }
            }
            }/>
        </PrivateRoute>
    )
}

const router = createBrowserRouter([
  {
    path: "",
    element: <LoginElementForRoutes/>,
  },
  {
    path: "list",
    element: <ListElementForRoutes />,
  },
  {
    path: "add",
    element: <AddElementForRoutes />,
  },
  {
    path: "/update/:id",
    element: <UpdateElementForRoutes />,
  }
]);
const App = () => (
      <RouterProvider router={router} />
);




export default App;
