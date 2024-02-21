import { allTask, executeTask, newTask } from "@/API/task-report"
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { hanldeErrors } from '../helpers/erros';
import Swal from "sweetalert2";
import { updateTask } from '../API/task-report';
import { toast } from "react-toastify";


export const useTasks = () => {
    return useQuery(["task-report", "list"], allTask,{
        staleTime: Infinity,
        refetchOnMount: 'always'
    })
}

export const useNewTask = () => {
    const queryClient = useQueryClient();
    return useMutation( newTask,{
        onSuccess: (response, task) => {
            queryClient.invalidateQueries(["task-report", "list"]);
            Swal.fire({
                icon: 'success',
                title: `Tarea ${response?.name} Creada`,
            });
        },
        onError:(err) => {
            const error = hanldeErrors(err);
            Swal.fire({
                icon: 'error',
                title: 'Error al crear la tarea',
                text: error
            })
        }
    })
}

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation( updateTask,{
        onSuccess: (response, task) => {
            queryClient.invalidateQueries(["task-report", "list"]);
            Swal.fire({
                icon: 'success',
                title: 'Tarea actualizada',
            });
        },
        onError:(err) => {
            const error = hanldeErrors(err);
            Swal.fire({
                icon: 'error',
                title: 'Error al crear la tarea',
                text: error
            })
        }
    })
}

export const useExecuteTask = () => {
    const queryClient = useQueryClient();
    return useMutation( executeTask,{
        onSuccess: (response, task) => {
            queryClient.invalidateQueries(["task-report", "list"]);
            const {date, stateMail, stateTlg} = response.messages;
            toast.success('TAREA EJECUTADA');
            if(stateMail.includes('WARNING')){
                toast.warning(stateMail.replace('WARNING', ''));
            }else if(stateMail.includes('ERROR')){
                toast.error(stateMail.replace('ERROR', ''));
            }
            if(stateTlg.includes('ERROR')){
                toast.warning(stateTlg.replace('ERROR', ''));
            }

        },
        onError:(err) => {
            const error = hanldeErrors(err);
            console.log(err);
            
            Swal.fire({
                icon: 'error',
                title: 'Error al ejecutar la tarea',
                text: error
            })
        }
    })
}
