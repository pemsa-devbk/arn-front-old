import { ResponseHttp } from "@/interfaces/ResponseHttp";
import { taskClient } from "./task";

export const getGlobalTasks = async () => {
    const resp = await taskClient.get<ResponseHttp<{globalTasks: Array<{id: string, cron: string, state: boolean}>}>>('/global-tasks',);    
    return resp.data.data.globalTasks;
}

export const execute = async (id: string) => {
    const resp = await taskClient.get<ResponseHttp<{ msg: string }>>(`/global-tasks/execute/${id}`);
    return resp.data.data.msg;
}

export const edit = async (data:{id: string, time: string}) => {
    const resp = await taskClient.patch<ResponseHttp<{ msg: string }>>(`/global-tasks/change-time/${data.id}`,{
        time: data.time
    });
    return resp.data.data.msg;
}
