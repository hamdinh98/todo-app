import React, {useEffect, useState} from 'react';
import './Todo.style.css';
import {Task} from "../../model/Task";
import axios from "axios";
import {useNavigate} from "react-router-dom";

// @ts-ignore
function TaskRow({task,removeTask,completeTask,index}) {

    const navigate = useNavigate();
    return (
        <div
            className="task"
            style={{ textDecoration: task.status=='done' ? "line-through" : "" }}
        >
            {task.title}
            <button style={{background:'blue'}} onClick={()=>navigate(`/update/${task.id}`)}>update</button>
            <button style={{ background: "red" }} onClick={() => removeTask(index)}>x</button>
            {
                ['todo','done','in-progress'].map((status,index)=>{
                   return status!==task.status && <button onClick={() => completeTask(index,status)}>{status}</button>
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



    const removeTask = (index:number) => {
        // @ts-ignore
        const newTasks:Task[] = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    };
    const completeTask = (index:any) => {
        const newTasks = [...tasks];
        newTasks[index].status = true;
        setTasks(newTasks);
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
                    completeTask={completeTask}
                    removeTask={removeTask}
                    key={index}
    />
))}
    </div>
    </div>
);
}

export default Todo;