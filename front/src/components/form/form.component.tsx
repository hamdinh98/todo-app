import React, { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import "./form.style.css";
import { Task, TaskStatus } from "../../model/Task";
import axios from "axios";
import { useLocation } from "react-router-dom";

interface Props {
  action: "update" | "create";
  submit: (todo: Task | undefined) => void;
}

const MyForm: React.FC<Props> = (props) => {
  const { pathname } = useLocation();
  const [todo, setTodo] = useState<Task | undefined>(undefined);

  const handleSubmit = () => {
    //console.log(todo);
    props.submit(todo);
  };
  useEffect(() => {
    const getItemById = async () => {
      const { data } = await axios.get(
        `http://localhost:8000/todo/get/${pathname.split("/")[2]}`
      );
      if (data) {
        setTodo({
          title: data.title,
          note: data.note,
          status: data.status,
          date: new Date(data.date),
        });
      }
    };
    getItemById();
    return () => {
      console.log("unmounting...");
    };
  }, [props.action === "update"]);

  return (
    <Form>
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          type="text"
          name="title"
          id="title"
          placeholder="Enter a title"
          value={todo?.title || ""}
          onChange={(event) => {
            //@ts-ignore
            setTodo({
              ...todo,
              title: event.target.value as string,
            });
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label for="note">Note</Label>
        <Input
          type="textarea"
          name="note"
          id="note"
          placeholder="Enter a note"
          value={todo?.note || ""}
          onChange={(event) => {
            //@ts-ignore
            setTodo({
              ...todo,
              note: event.target.value as string,
            });
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label for="date">Date</Label>
        <Input
          type="date"
          name="date"
          id="date"
          placeholder="Select a date"
          value={todo?.date.toISOString().split("T")[0] || ""}
          onChange={(event) => {
            //@ts-ignore
            setTodo({
              ...todo,
              date: new Date(event.target.value as string),
            });
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label for="status">Status</Label>
        <Input
          type="select"
          name="status"
          id="status"
          value={todo?.status || ""}
          onChange={(event) => {
            //@ts-ignore
            setTodo({
              ...todo,
              status: event.target.value as TaskStatus,
            });
          }}
        >
          <option value={TaskStatus.TODO}>TODO</option>
          <option value={TaskStatus.DONE}>DONE</option>
          <option value={TaskStatus.IN_PROGRESS}>IN-PROGRESS</option>
        </Input>
      </FormGroup>
      <Button onClick={handleSubmit}>{props.action}</Button>
    </Form>
  );
};

export default MyForm;
