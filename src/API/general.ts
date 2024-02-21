import { ResponseHttp } from "@/interfaces/ResponseHttp";
import { taskClient } from './task';

interface ContactSend {
    contact: string;
    type: number;
    alias: string;
}
interface ContactDelete{
    contact: string;
    type: number;
}

export const startMail = async (idTask: string) => {
    const resp = await taskClient.get<ResponseHttp<{ msg: string }>>(`/general/start-mail/${idTask}`);
    return resp.data.data.msg;
}

export const stopMail = async (idTask: string) => {
    const resp = await taskClient.get<ResponseHttp<{ msg: string }>>(`/general/stop-mail/${idTask}`);
    return resp.data.data.msg;
}

export const startWhatsApp = async (idTask: string) => {
    const resp = await taskClient.get<ResponseHttp<{ msg: string }>>(`/general/start-whatsapp/${idTask}`);
    return resp.data.data.msg;
}

export const stopWhatsApp = async (idTask: string) => {
    const resp = await taskClient.get<ResponseHttp<{ msg: string }>>(`/general/stop-whatsapp/${idTask}`);
    return resp.data.data.msg;
}

export const startTelegram = async (idTask: string) => {
    const resp = await taskClient.get<ResponseHttp<{ msg: string }>>(`/general/start-telegram/${idTask}`);
    return resp.data.data.msg;
}

export const stopTelegram = async (idTask: string) => {
    const resp = await taskClient.get<ResponseHttp<{ msg: string }>>(`/general/stop-telegram/${idTask}`);
    return resp.data.data.msg;
}

export const startTask = async (idTask: string) => {
    const resp = await taskClient.get<ResponseHttp<{ msg: string }>>(`/general/start/${idTask}`);
    return resp.data.data.msg;
}

export const stopTask = async (idTask: string) => {
    const resp = await taskClient.get<ResponseHttp<{ msg: string }>>(`/general/stop/${idTask}`);
    return resp.data.data.msg;
}

export const addContact = async (data: { idTask: string, contact: ContactSend }) => {
    const resp = await taskClient.post<ResponseHttp<{ msg: string }>>(`/general/add-contact/${data.idTask}`, {
        ...data.contact
    });
    return resp.data.data.msg;
}

export const deleteContact = async (data: { idTask: string, contact: ContactDelete }) => {
    const resp = await taskClient.post<ResponseHttp<{ msg: string }>>(`/general/delete-contact/${data.idTask}`, {
        ...data.contact
    });
    return resp.data.data.msg;
}

export const getContacts = async (id: string) => {
    const resp = await taskClient.get<ResponseHttp<{ contacts: Array<any> }>>(`/general/contact/${id}`);
    return resp.data.data.contacts;
}

export const pairContacts = async (id: string) => {
    const resp = await taskClient.get<ResponseHttp<{ msg: string }>>(`/general/pair-contacts-mw/${id}`);
    return resp.data.data.msg;
}

export const syncContacts = async (id: string) => {
    const resp = await taskClient.get<ResponseHttp<{ msg: string }>>(`/general/sync-contacts-mw/${id}`);
    return resp.data.data.msg;
}

export const deleteTask = async(idTask: string) => {
    const resp = await taskClient.delete<ResponseHttp<{ msg: string }>>(`/general/delete-task/${idTask}`);
    return resp.data.data.msg;
}

export const getFiles = async(id: string) => {
    const resp = await taskClient.get<ResponseHttp<{ files: string[] }>>(`/general/docs-task/${id}`);
    return resp.data.data.files;
}

export const resendFile = async (data: {idTask: string, file: string}) => {
    const resp = await taskClient.get<ResponseHttp<{messages:{stateMail: string, stateTlg: string}}>>(`/general/doc-task/resend/${data.idTask}/${data.file}`);
    return resp.data.data;
}