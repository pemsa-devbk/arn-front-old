import { hanldeErrors } from '@/helpers/erros';
import { GeneralTask } from '@/interfaces/ResponseHttp';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { startMail, startTelegram, startWhatsApp, stopMail, stopTelegram, stopWhatsApp, startTask, stopTask, addContact, deleteContact, getContacts, pairContacts, deleteTask, getFiles, resendFile, syncContacts } from '../API/general';
import { Contact } from '../interfaces/ResponseHttp';
import { toast } from 'react-toastify';

// * NOTIFICACION DE ERROR, SUCCESS Y AMBAS ACTUALIZACIONES
export const useStartMail = (type: string) => {
    const queryClient = useQueryClient();
    return useMutation(startMail, {
        onSuccess: (response, data) => {
            queryClient.setQueriesData<Array<GeneralTask>>([type, "list"], oldData => oldData?.map( task => {
                if(task.idTask === data){
                    return{
                        ...task,
                        sendMail: true
                    }
                }
                return task
            }) || []);
            toast.success(response);
            queryClient.invalidateQueries([type, "list"]);
        },
        onError: (err) => {
            const error = hanldeErrors(err);
            Swal.fire({
                icon: 'error',
                title: 'ERROR AL ACTIVAR EMAIL',
                text: error
            })
        }
    })
}

// * NOTIFICACION DE ERROR, SUCCESS Y AMBAS ACTUALIZACIONES
export const useStopMail = (type: string) => {
    const queryClient = useQueryClient();
    return useMutation(stopMail, {
        onSuccess: (response, data) => {
            queryClient.setQueriesData<Array<GeneralTask>>([type, "list"], oldData => oldData?.map( task => {
                if(task.idTask === data){
                    return{
                        ...task,
                        sendMail: false
                    }
                }
                return task;
            }) || []);
            toast.success(response);
            queryClient.invalidateQueries([type, "list"]);
        },
        onError: (err) => {
            const error = hanldeErrors(err);
            Swal.fire({
                icon: 'error',
                title: 'ERROR AL DESACTIVAR EMAIL',
                text: error
            })
        }
    })
}

// * NOTIFICACION DE ERROR, SUCCESS Y AMBAS ACTUALIZACIONES
export const useStartWhatsApp = (type: string) => {
    const queryClient = useQueryClient();
    return useMutation(startWhatsApp, {
        onSuccess: (response, data) => {
            queryClient.setQueriesData<Array<GeneralTask>>([type, "list"], oldData => oldData?.map( task => {
                if(task.idTask === data){
                    return{
                        ...task,
                        sendWhatsApp: true
                    }
                }
                return task;
            }) || []);
            toast.success(response);
            queryClient.invalidateQueries([type, "list"]);
        },
        onError: (err) => {
            const error = hanldeErrors(err);
            Swal.fire({
                icon: 'error',
                title: 'ERROR AL ACTIVAR WHATSAPP',
                text: error
            })
        }
    })
}

// * NOTIFICACION DE ERROR, SUCCESS Y AMBAS ACTUALIZACIONES
export const useStopWhatsApp = (type: string) => {
    const queryClient = useQueryClient();
    return useMutation(stopWhatsApp, {
        onSuccess: (response, data) => {
            queryClient.setQueriesData<Array<GeneralTask>>([type, "list"], oldData => oldData?.map( task => {
                if(task.idTask === data){
                    return{
                        ...task,
                        sendWhatsApp: false
                    }
                }
                return task;
            }) || []);
            toast.success(response);
            queryClient.invalidateQueries([type, "list"]);
        },
        onError: (err) => {
            const error = hanldeErrors(err);
            Swal.fire({
                icon: 'error',
                title: 'ERROR AL DESACTIVAR WHATSAPP',
                text: error
            })
        }
    })
}

// * NOTIFICACION DE ERROR, SUCCESS Y AMBAS ACTUALIZACIONES
export const useStartTelegram = (type: string) => {
    const queryClient = useQueryClient();
    return useMutation(startTelegram, {
        onSuccess: (response, data) => {
            queryClient.setQueriesData<Array<GeneralTask>>([type, "list"], oldData => oldData?.map( task => {
                if(task.idTask === data){
                    return{
                        ...task,
                        sendTelegram: true
                    }
                }
                return task;
            }) || []);
            toast.success(response);
            queryClient.invalidateQueries([type, "list"]);
        },
        onError: (err) => {
            const error = hanldeErrors(err);
            Swal.fire({
                icon: 'error',
                title: 'ERROR AL ACTIVAR TELEGRAM',
                text: error
            })
        }
    })
}

// * NOTIFICACION DE ERROR, SUCCESS Y AMBAS ACTUALIZACIONES
export const useStopTelegram = (type: string) => {
    const queryClient = useQueryClient();
    return useMutation(stopTelegram, {
        onSuccess: (response, data) => {
            queryClient.setQueriesData<Array<GeneralTask>>([type, "list"], oldData => oldData?.map( task => {
                if(task.idTask === data){
                    return{
                        ...task,
                        sendTelegram: false
                    }
                }
                return task;
            }) || []);
            toast.success(response);
            queryClient.invalidateQueries([type, "list"]);
        },
        onError: (err) => {
            const error = hanldeErrors(err);
            Swal.fire({
                icon: 'error',
                title: 'ERROR AL DESACTIVAR WHATSAPP',
                text: error
            })
        }
    })
}

// * NOTIFICACION DE ERROR, SUCCESS Y AMBAS ACTUALIZACIONES
export const useStartTask = (type: string) => {
    const queryClient = useQueryClient();
    return useMutation(startTask, {
        onSuccess: (response, data) => {
            queryClient.setQueriesData<Array<GeneralTask>>([type, "list"], oldData => oldData?.map( task => {
                if(task.idTask === data){
                    return{
                        ...task,
                        state: true
                    }
                }
                return task
            }) || []);
            toast.success(response);
            queryClient.invalidateQueries([type, "list"]);
        },
        onError: (err) => {
            const error = hanldeErrors(err);
            Swal.fire({
                icon: 'error',
                title: 'ERROR AL INICIAR LA TAREA',
                text: error
            })
        }
    })
}

// * NOTIFICACION DE ERROR, SUCCESS Y AMBAS ACTUALIZACIONES
export const useStopTask = (type: string) => {
    const queryClient = useQueryClient();
    return useMutation(stopTask, {
        onSuccess: (response, data) => {
            queryClient.setQueriesData<Array<GeneralTask>>([type, "list"], oldData => oldData?.map( task => {
                if(task.idTask === data){
                    return{
                        ...task,
                        state: false
                    }
                }
                return task;
            }) || []);
            toast.success(response);
            queryClient.invalidateQueries([type, "list"]);
        },
        onError: (err) => {
            const error = hanldeErrors(err);
            Swal.fire({
                icon: 'error',
                title: 'ERROR AL DETENER LA TAREA',
                text: error
            })
        }
    })
}

export const useAddContact = (type: string) => {
    const queryClient = useQueryClient();
    return useMutation(addContact, {
        onSuccess: (response, newContact) => {
            const {contact, type: typeContact} = newContact.contact;
            // * ACUTALIZACIONN OPTIMISTA PARA TODAS LAS TAREAS DE ESTADO
            queryClient.setQueriesData<Array<GeneralTask>>([type, "list"], oldData => oldData?.map( task => {
                if(task.idTask === newContact.idTask){
                    return{
                        ...task,
                        contacts: [...task.contacts, {typeContact: newContact.contact.type, contact: newContact.contact.contact}]
                    }
                }
                return task;
            }) || []);
            // * ACTUALIZACION OPTIMISTA PARA LOS CONTACTOS DE LA TAREA
            // TODO Esto por la actualización de la vista, debido a que no actualizaba la vista de contactos si actualizaba toda la tarea
            queryClient.setQueriesData<Array<Contact>>(['task', 'contacts', newContact.idTask], oldData => oldData ? [...oldData, {contact, typeContact}] : [] || []);
            toast.success(response);
            queryClient.invalidateQueries(["task", "contacts", newContact.idTask]);
            queryClient.invalidateQueries([type, "list"]);
        },
        onError: (err) => {
            const error = hanldeErrors(err);
            Swal.fire({
                icon: 'error',
                title: 'Error al añadir el contacto',
                text: error
            });
        }
    })
}

export const useDeleteContact = (type: string) => {
    const queryClient = useQueryClient();
    return useMutation(deleteContact, {
        onSuccess: (response, newContact) => {
            // * ACUTALIZACIONN OPTIMISTA PARA TODAS LAS TAREAS DE ESTADO
            queryClient.setQueriesData<Array<GeneralTask>>([type, "list"], oldData => oldData!.map( task => {
                if(task.idTask === newContact.idTask){
                    return{
                        ...task,
                        contacts: task.contacts.filter(contact => contact.contact !== newContact.contact.contact)
                    }
                }
                return task;
            }) || []);
            // * ACTUALIZACION OPTIMISTA PARA LOS CONTACTOS DE LA TAREA
            // TODO Esto por la actualización de la vista, debido a que no actualizaba la vista de contactos si actualizaba toda la tarea
            queryClient.setQueriesData<Array<Contact>>(['task', 'contacts', newContact.idTask], oldData => oldData ? [...oldData.filter(contact => contact.contact !== newContact.contact.contact)] : [] || []);
            toast.success(response);
            queryClient.invalidateQueries(["task", "contacts", newContact.idTask]);
            queryClient.invalidateQueries([type, "list"]);
        },
        onError: (err) => {
            const error = hanldeErrors(err);
            Swal.fire({
                icon: 'error',
                title: 'Error al eliminar el contacto',
                text: error
            });
        }
    })
}

export const useContacts = (idTask: string) => {
    return useQuery(["task", "contacts" ,idTask], () => getContacts(idTask),{
        staleTime: 60000,
        enabled: !!idTask,
        refetchOnMount: true
    })
}

export const usePairContacts = () => {
    const queryClient = useQueryClient();

    return useMutation(pairContacts, {
        onSuccess: (response, idTask) => {
            toast.success(response);
            queryClient.invalidateQueries(["task", "contacts", idTask]);
        },
        onError: (err) => {
            const error = hanldeErrors(err);
            Swal.fire({
                icon: 'error',
                title: 'Error al sincronizar contactos',
                text: error
            });
        }
    })
}

export const useSyncContacts = () => {
    const queryClient = useQueryClient();

    return useMutation(syncContacts, {
        onSuccess: (response, idTask) => {
            toast.success(response);
            queryClient.invalidateQueries(["task", "contacts", idTask]);
        },
        onError: (err) => {
            const error = hanldeErrors(err);
            Swal.fire({
                icon: 'error',
                title: 'Error al sincronizar contactos',
                text: error
            });
        }
    })
}

export const useDeleteTask = (type: string ) => {
    const queryClient = useQueryClient();
    return useMutation( deleteTask,{
        onSuccess: (response, task) => {
            queryClient.invalidateQueries([type, "list"]);
            Swal.fire({
                icon: 'success',
                title: response,
            });
        },
        onError:(err) => {
            const error = hanldeErrors(err);
            Swal.fire({
                icon: 'error',
                title: 'Error al eliminar la tarea',
                text: error
            })
        }
    })
}

export const useFiles = (idTask: string) => {
    return useQuery(["files", idTask], () => getFiles(idTask),{
        staleTime: 30000,
        refetchOnMount: 'always'
    })
}

export const useResendFile = () => {
    const queryClient = useQueryClient();
    return useMutation( resendFile,{
        onSuccess: (response, task) => {
            queryClient.invalidateQueries(["task-report", "list"]);
            const {stateMail, stateTlg} = response.messages;
            toast.success('Documento enviado');
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
            Swal.fire({
                icon: 'error',
                title: 'Error al enviar el documento',
                text: error
            })
        }
    })
}
