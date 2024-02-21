import { Filter, FilterSend, ResponseHttp } from "@/interfaces/ResponseHttp";
import { taskClient } from "./task";
import { FilterWithEvents } from '../interfaces/ResponseHttp';


export const getFilters = async () => {
    const resp = await taskClient.get<ResponseHttp<{ filters: Filter[] }>>(`/filter`);
    return resp.data.data.filters;
}

export const getFilter = async (id: number) => {
    const resp = await taskClient.get<ResponseHttp<{filter: FilterWithEvents}>>(`/filter/${id}?more=true`);
    return resp.data.data.filter;
}

export const newFilter = async (data: FilterSend) => {
    const resp = await taskClient.post<ResponseHttp<{filter: Filter}>>('/filter',{
        ...data
    });
    return resp.data.data.filter;
}

export const updateFilter = async(data: {idFilter: number, filter: any}) => {
    const resp = await taskClient.patch<ResponseHttp<{filter: FilterWithEvents}>>(`/filter/${data.idFilter}`,{
        ...data.filter
    });
    return resp.data.data.filter;
}