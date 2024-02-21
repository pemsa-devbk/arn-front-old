import React, { useState } from 'react'
import { hanldeErrors } from '@/helpers/erros';
import { useAlarms } from '@/hooks/monitoring';
import { Alarm } from '@/interfaces/ResponseHttp';
import Icons from '../assets/icons.svg';
import { Pagination } from './Pagination';


interface Props {
    textSearch: string;
    showResults: number;
    addFilterEvent: (type: number, code: string) => void;
}

export const TableAlarms = ({ showResults, textSearch, addFilterEvent}:Props) => {

    const { data: alarms, isLoading, isError, error } = useAlarms();

    const [pager, setPager] = useState(1);


    const filterCode = (alarm: Alarm) => {
        return alarm.CodigoAlarma.toLowerCase().includes(textSearch.toLowerCase());
    }

    const filterDesc = (alarm: Alarm) => {
        return alarm.DescripcionAlarm.toLowerCase().includes(textSearch.toLowerCase());
    }

    
    return (
        <table className='table modal-color'>
        <thead>
            <tr>
                <th className='table-head'>Codigo</th>
                <th className='table-head'>Descripción</th>
                <th className='table-head'>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {
                error
                    ?
                    <tr>
                        <td className='text-center' colSpan={10}>{hanldeErrors(error)}</td>
                    </tr>
                    :
                    isLoading
                        ?
                        <tr></tr>
                        :
                        alarms!.filter(alarm => filterCode(alarm) || filterDesc(alarm)).slice(((pager - 1) * showResults), pager * showResults).map(alarm => (
                            <tr className='table__col-single' key={`alarm-${alarm.CodigoAlarma}`}>
                                <td className='table-text'>{alarm.CodigoAlarma}</td>
                                <td className='table-text'>{alarm.DescripcionAlarm}</td>
                                <td>
                                    <div className='table-actions'>
                                        <button
                                            type='button' className='btn-table-primary modal'
                                            onClick={() => addFilterEvent(1, alarm.CodigoAlarma)}
                                        >
                                            <svg className='icon'>
                                                <use xlinkHref={`${Icons}#icon-plus-circle`}></use>
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
            }
        </tbody>
        <Pagination
            elements={
                (error || isLoading)
                    ?
                    0
                    :
                    alarms!.filter(alarm => filterCode(alarm) || filterDesc(alarm)).length
            }
            page={pager}
            setPager={setPager}
            showResults={showResults}
        />
    </table>
    )
}
