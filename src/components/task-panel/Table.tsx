import React, { useEffect, useState } from 'react';
import { Row } from './Row';
import { TaskPSS } from '@/interfaces/ResponseHttp';
import { Pagination } from '../Pagination';
import { useTasks } from '@/hooks/task-panel';
import { hanldeErrors } from '@/helpers/erros';
import { cronToString } from '@/helpers/date';

interface Props {
    textSearch: string;
    showResults: number;
    openModalEdit: (task: TaskPSS) => void;
    openModalView: (task: TaskPSS) => void;
    openModalContact: (task: TaskPSS) => void;
}
export const Table = ({ textSearch, showResults, openModalEdit, openModalView, openModalContact }: Props) => {

    const { data: tasks, isLoading, isRefetching, isError, error, refetch } = useTasks();


    const [pager, setPager] = useState(1);

    useEffect(() => {
        setPager(1);
    }, [textSearch])

    const filterName = (task: TaskPSS) => {
        return task.name.toLowerCase().includes(textSearch.toLowerCase());
    }
    const filterCron = (task: TaskPSS) => {
        return cronToString(task.cron).toLowerCase().includes(textSearch.toLowerCase());
    }
    const filterEmail = (task: TaskPSS) => {
        return task.contacts.find(cnt => cnt.contact.toLowerCase().includes(textSearch.toLowerCase()))
    }
    const filterState = (task: TaskPSS) => {
        if (task.state) {
            return 'activa'.includes(textSearch.toLowerCase());
        } else {
            return 'detenida'.includes(textSearch.toLowerCase());
        }
    }


    return (
        <table className='table task-color'>
            <thead>
                <tr>
                    <th className='table-head'></th>
                    <th className='table-head'>Nombre</th>
                    <th className='table-head'>Horario</th>
                    <th className='table-head'>Tipo</th>
                    <th className='table-head'>Ultima Ejecución</th>
                    <th className='table-head'>Cuenta</th>
                    <th className='table-head'>Estado</th>
                    <th className='table-head'>Acciones</th>
                </tr>
            </thead>
            <tbody className='table-task'>
                {
                    isLoading ?
                        <tr>
                            <td className='text-center' colSpan={10}>Loading...</td>
                        </tr>
                        :
                        isError
                            ?
                            <tr>
                                <td className='text-center' colSpan={10}>{hanldeErrors(error)}</td>
                            </tr>
                            :
                            tasks!.filter((task) => filterName(task) || filterCron(task) || filterEmail(task) || filterState(task)).slice(((pager - 1) * showResults), pager * showResults).map(task => (
                                <Row
                                    task={task}
                                    key={task.idTask}
                                    openModalEdit={openModalEdit}
                                    openModalView={openModalView}
                                    openModalContact={openModalContact}
                                />
                            ))
                }
            </tbody>
            <Pagination
                elements={
                    (error || isLoading)
                        ?
                        0
                        :
                        tasks!.filter((task) => filterName(task) || filterCron(task) || filterEmail(task) || filterState(task)).length
                }
                page={pager}
                setPager={setPager}
                showResults={showResults}
            />
        </table>
    )
}
