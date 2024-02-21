import { ResponseHttp } from "@/interfaces/ResponseHttp";
import { taskClient } from "./task";


export const allContacts = async() => {
    const resp = await taskClient.get<ResponseHttp<{contacts: Array<{idContact: number, contact: string, typeContact: number, alias: string, isContactReport: boolean}>}>>('/contacts');
    return resp.data.data.contacts;
}

export const assignList = async (id: number) => {
    const resp = await taskClient.patch<ResponseHttp<{ msg: string }>>(`/contacts/assign/${id}`);
    return resp.data.data.msg;
}

export const unassignList = async (id: number) => {
    const resp = await taskClient.patch<ResponseHttp<{ msg: string }>>(`/contacts/unassign/${id}`);
    return resp.data.data.msg;
}