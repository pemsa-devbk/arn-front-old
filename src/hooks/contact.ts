import { hanldeErrors } from '@/helpers/erros';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { allContacts, assignList, unassignList } from '../API/contact';


export const useContacts = () => {
    return useQuery(['contact', 'list'], allContacts, {

    })
}

export const useAssignListReport = () => {
    const queryClient = useQueryClient();
    return useMutation( assignList, {
        onSuccess: (response, contact) => {
            queryClient.invalidateQueries(["contact", "list"]);
            Swal.fire({
                icon: 'success',
                title: `${response}`,
            });
        },
        onError: (err) => {
            const error = hanldeErrors(err);
            Swal.fire({
                icon: 'error',
                title: 'Error al añadir contacto a lista',
                text: error
            })
        }
    })
}

export const useUnassignListReport = () => {
    const queryClient = useQueryClient();
    return useMutation( unassignList, {
        onSuccess: (response, contact) => {
            queryClient.invalidateQueries(["contact", "list"]);
            Swal.fire({
                icon: 'success',
                title: `${response}`,
            });
        },
        onError: (err) => {
            const error = hanldeErrors(err);
            Swal.fire({
                icon: 'error',
                title: 'Error al eliminar contacto de lista',
                text: error
            })
        }
    })
}
