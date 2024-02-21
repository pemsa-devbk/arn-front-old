import { ResponseHttp, TaskPSS, TaskPssSend } from "@/interfaces/ResponseHttp";
import { taskClient } from "./task";


export const newTask = async ( data: TaskPssSend) => {
    const resp = await taskClient.post<ResponseHttp<{task: TaskPSS}>>('/task-pss', {
        ...data
    });    
    return resp.data.data.task;
}

export const allTask = async() => {
    const resp = await taskClient.get<ResponseHttp<{tasks: Array<TaskPSS>}>>('/task-pss');
    return resp.data.data.tasks;
}

export const updateTask = async(data: {idtask: string, task: any}) => {
    const resp = await taskClient.patch<ResponseHttp<{task: TaskPSS}>>(`/task-pss/${data.idtask}`,{
        ...data.task
    });
    return resp.data.data.task;
}

export const executeTask = async(idTask: string) => {
    const resp = await taskClient.patch<ResponseHttp<{messages:{stateMail: string, stateTlg: string, date: string}}>>(`/task-pss/execute/${idTask}`);
    return resp.data.data;
}
