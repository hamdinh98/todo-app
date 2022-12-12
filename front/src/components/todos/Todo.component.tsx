import React, {useEffect, useState} from 'react';
import './Todo.style.css';
import {Task, TaskStatus} from "../../model/Task";
import axios from "axios";

// @ts-ignore
function TaskRow({task,removeTask,completeTask,index}) {
    return (
        <div
            className="task"
            style={{ textDecoration: task.status=='DONE' ? "line-through" : "" }}
        >
            {task.title}
            <button style={{ background: "red" }} onClick={() => removeTask(index)}>x</button>
            <button onClick={() => completeTask(index)}>Complete</button>
        </div>

    )
}



// @ts-ignore
function CreateTask({ addTask }) {
    const [value, setValue] = useState("");

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        if (!value) return;
        try {
            const {data} = await axios.post('http://localhost:8000/todo',{
                title:value,
                status:TaskStatus.TODO,
                date:Date.now(),
                note:'some notes'
            },
                // @ts-ignore
                {"Access-Control-Allow-Origin": "*"});
            console.log(data);
        }catch (e) {
            console.log(e);
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                className="input"
                value={value}
                placeholder="Add a new task"
                onChange={e => setValue(e.target.value)}
            />
        </form>
    );
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

    const addTask = (title:any) => {
        const newTasks = [...tasks, { title, completed: false }];
        // @ts-ignore
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