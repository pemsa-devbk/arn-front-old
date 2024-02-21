import { hanldeErrors } from '@/helpers/erros';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { getFilters, getFilter, newFilter, updateFilter } from '../API/filter';


export const useFilters = () => {
    return useQuery(["filter", "list"], getFilters, {
        staleTime: 120000
    });
}

export const useFilter = (id: number) => {
    return useQuery(["filter", "item" , id], () => getFilter(id), {
        enabled: !!id,
        staleTime: 60000
    });
}

export const useNewFilter = () => {
    const queryClient = useQueryClient();
    return useMutation( newFilter,{
        onSuccess: (response, filter) => {
            queryClient.invalidateQueries(["filter", "list"]);
            Swal.fire({
                icon: 'success',
                title: `Filtro ${filter.name} creado`,
            });
        },
        onError:(err) => {
            const error = hanldeErrors(err);
            Swal.fire({
                icon: 'error',
                title: 'Error al crear el filtro',
                text: error
            })
        }
    })
}

export const useUpdateFilter = () => {
    const queryClient = useQueryClient();
    return useMutation( updateFilter, {
        onSuccess: (response, filter) => {
            queryClient.invalidateQueries(["filter", "list"]);
            Swal.fire({
                icon: 'success',
                title: `Filtro actualizado`,
            });
        },
        onError: (err) => {
            const error = hanldeErrors(err);
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar el filtro',
                text: error
            })
        }
    })
}
