import { ResponseHttp, AccountMW, GroupMW, Alarm, Event} from '../interfaces/ResponseHttp';
import axios from 'axios';

const mwClient = axios.create({
    baseURL: 'https://arn.pem-sa.com.mx/general',
    headers: {
        "Content-type": "application/json",
    }
});

export const allAccounts = async () => {
    const resp = await mwClient.get<ResponseHttp<{ accounts: AccountMW[] }>>('/all-accounts');
    return resp.data.data.accounts;
}

export const allGroups = async () => {
    const resp = await mwClient.get<ResponseHttp<{ groups: GroupMW[] }>>('/all-groups');
    return resp.data.data.groups;
}

export const categoryAlarms = async () => {
    const resp = await mwClient.get<ResponseHttp<{alarms: Alarm[]}>>('/category-alarms');
    return resp.data.data.alarms;
}

export const categoryEvents = async () => {
    const resp = await mwClient.get<ResponseHttp<{events: Event[]}>>('/category-events');
    return resp.data.data.events;
}