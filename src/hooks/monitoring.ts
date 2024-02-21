import { allAccounts } from '@/API/monitoring';
import { useQuery } from '@tanstack/react-query';
import { allGroups, categoryAlarms, categoryEvents } from '../API/monitoring';


export const useGroups = () => {
    return useQuery(["groups", "list"], allGroups, {
        staleTime: Infinity,
        refetchOnWindowFocus: false
    })
}

export const useAccounts = () => {
    return useQuery(["accounts", "list"], allAccounts,{
        staleTime: Infinity,
        refetchOnWindowFocus: false
    })
}

export const useAlarms = () => {
    return useQuery(["alarms", "list"], categoryAlarms,{
        staleTime: Infinity,
        refetchOnWindowFocus: false
    })
}

export const useEvents = () => {
    return useQuery(["events", "list"], categoryEvents,{
        staleTime: Infinity,
        refetchOnWindowFocus: false
    })
}
