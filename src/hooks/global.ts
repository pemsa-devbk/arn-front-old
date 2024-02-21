import { edit, getGlobalTasks, execute } from "@/API/global";
import { hanldeErrors } from "@/helpers/erros";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

export const useGlobalTasks = () => {
    return useQuery(["global-tasks", "list"], getGlobalTasks , {
        staleTime: 120000
    });
}

export const useExecuteGlobal = () => {
    return useMutation( execute, {
        onSuccess: (response, id) => {
            Swal.fire({
                icon: 'success',
                title: `Tarea ${id} ejecutada`,
            });
        },
        onError: (err) => {
            const error = hanldeErrors(err);
            Swal.fire({
                icon: 'error',
                title: `Error al ejeuctar la tarea`,
                text: error
            })
        }
    })
}


export const useUpdateTime = () => {
    const queryClient = useQueryClient();
    return useMutation( edit, {
        onSuccess: (response, data) => {
            queryClient.invalidateQueries(["global-tasks", "list"]);
            Swal.fire({
                icon: 'success',
                title: `Horario actualizado`,
            });
        },
        onError: (err) => {
            const error = hanldeErrors(err);
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar el horario',
                text: error
            })
        }
    })
}
