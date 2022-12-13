import React, {useEffect, useState} from 'react';
import './Todo.style.css';
import {Task} from "../../model/Task";
import axios from "axios";
import {useNavigate} from "react-router-dom";

// @ts-ignore
function TaskRow({task,removeTask,changeStatus}) {

    const navigate = useNavigate();
    return (
        <div
            className="task"
            style={{ textDecoration: task.status=='done' ? "line-through" : "" }}
        >
            {task.title}
            <button style={{background:'blue'}} onClick={()=>navigate(`/update/${task.id}`)}>update</button>
            <button style={{ background: "red" }} onClick={() => removeTask(task.id)}>x</button>
            {
                ['todo','done','in-progress'].map((status,index)=>{
                   return status!==task.status && <button onClick={()=>{
                       changeStatus(task.id,status)}
                   }>{status}</button>
                }
                )
            }
        </div>

    )
}




function Todo() {
    const [tasks, setTasks] = useState<Task[] | undefined>(undefined);
    //fetching data from the backend
    // @ts-ignore
    useEffect( () => {
        const fetchData = async () => {
            const { data } = await axios.get("http://localhost:8000/todo");
            if(data){
                setTasks(data);
            }
        }
        fetchData();
        return () => {
            setTasks(undefined);
        }
    }, []);

    const removeTask = async (id:number) => {
        // @ts-ignore

        const {data} = await axios.delete(`http://localhost:8000/todo`,{data:{ids:[id]}});
        if(data){
            // @ts-ignore
            setTasks(tasks.filter(task=>task.id!==id));
        }

    };
    const changeStatus = async (index:number,status:string) => {
       const {data} = await axios.patch(`http://localhost:8000/todo/${index}`,{
              status:status
       });
    };
    return (
        <div className="todo-container">
        <div className="header">TODO - ITEMS</div>
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