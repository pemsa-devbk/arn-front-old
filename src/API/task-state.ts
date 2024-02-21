import { ResponseHttp, TaskState, TaskStateSend } from "@/interfaces/ResponseHttp";
import { taskClient } from "./task";


export const newTask = async ( data: TaskStateSend) => {
    const resp = await taskClient.post<ResponseHttp<{task: TaskState}>>('/task-state', {
        ...data
    });    
    return resp.data.data.task;
}

export const allTask = async() => {
    const resp = await taskClient.get<ResponseHttp<{tasks: Array<TaskState>}>>('/task-state');
    return resp.data.data.tasks;
}

export const updateTask = async(data: {idtask: string, task: any}) => {
    const resp = await taskClient.patch<ResponseHttp<{task: TaskState}>>(`/task-state/${data.idtask}`,{
        ...data.task
    });
    return resp.data.data.task;
}

export const executeTask = async(idTask: string) => {
    const resp = await taskClient.patch<ResponseHttp<{messages:{stateMail: string, stateTlg: string, date: string}}>>(`/task-state/execute/${idTask}`);
    return resp.data.data;
}
