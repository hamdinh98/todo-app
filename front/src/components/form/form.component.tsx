import React,{useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import './form.style.css';
import {Task, TaskStatus} from "../../model/Task";

interface Props {
    task?: Task;
    submit: (todo: Task | undefined) => void;
}

const MyForm: React.FC<Props> = (props) => {

    const [todo, setTodo] = useState<Task>();
    const handleSubmit = () => {
        props.submit(todo);
    }


    return (
      <Form>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="Enter a title"
            value={props.task?.title}
            onChange={(event) => {
                //@ts-ignore
                setTodo({
                    ...todo,
                    title: event.target.value as string
                })
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
            value={props.task?.note}
            onChange={(event) => {
              //@ts-ignore
                setTodo({
                    ...todo,
                    note: event.target.value as string
                })
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
            onChange={(event) => {
                //@ts-ignore
                setTodo({
                    ...todo,
                    date: new Date(event.target.value as string)
                })
            }}
          />
        </FormGroup>
        <FormGroup>
          <Label for="status">Status</Label>
          <Input
            type="select"
            name="status"
            id="status"
            value={props.task?.status}
            onChange={(event) => {
              //@ts-ignore
                setTodo({
                    ...todo,
                    status: event.target.value as TaskStatus
                })
            }}
          >
            <option value={TaskStatus.TODO}>TODO</option>
            <option value={TaskStatus.DONE}>DONE</option>
            <option value={TaskStatus.IN_PROGRESS}>IN-PROGRESS</option>
          </Input>
        </FormGroup>
        <Button onClick={handleSubmit}>{props.task ? "update" : "add"}</Button>
      </Form>
    );
};

export default MyForm;