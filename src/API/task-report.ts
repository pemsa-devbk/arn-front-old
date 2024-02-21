import { ResponseHttp, TaskReport, TaskReportSend } from "@/interfaces/ResponseHttp";
import { taskClient } from "./task";


export const newTask = async ( data: TaskReportSend) => {
    const resp = await taskClient.post<ResponseHttp<{task: TaskReport}>>('/task-report', {
        ...data
    });    
    return resp.data.data.task;
}

export const allTask = async() => {
    const resp = await taskClient.get<ResponseHttp<{tasks: Array<TaskReport>}>>('/task-report');
    return resp.data.data.tasks;
}

export const updateTask = async(data: {idtask: string, task: any}) => {
    const resp = await taskClient.patch<ResponseHttp<{task: TaskReport}>>(`/task-report/${data.idtask}`,{
        ...data.task
    });
    return resp.data.data.task;
}

export const executeTask = async(idTask: string) => {
    const resp = await taskClient.patch<ResponseHttp<{messages:{stateMail: string, stateTlg: string, date: string}}>>(`/task-report/execute/${idTask}`);
    return resp.data.data;
}
