
// @ts-ignore
export enum TaskStatus {
    TODO = 'todo',
    IN_PROGRESS = 'in-progress',
    DONE = 'done',

}

export interface Task {
    title: string;
    note:string;
    status: TaskStatus;
    date:Date;
}



