import React from 'react'
import { hanldeErrors } from '@/helpers/erros';
import { useGlobalTasks } from '@/hooks/global';
import { Row } from './Row';

interface Props{
    openModalEdit: (id: string) => void
}
export const Table = ({openModalEdit}:Props) => {
    const { data, refetch, isError, isLoading, error } = useGlobalTasks();

    return (
        <table className='table task-color'>
            <thead>
                <tr>
                    <th className='table-head'>ID</th>
                    <th className='table-head'>HORARIO</th>
                    <th className='table-head'>ESTADO</th>
                    <th className='table-head'>ACCIONES</th>
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
                            data!.map(gt => (
                                <Row 
                                    openModalEdit={openModalEdit}
                                    tkG={gt}
                                />
                            ))
                }
            </tbody>
        </table>
    )
}
