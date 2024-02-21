import React, { useState } from 'react'
import { hanldeErrors } from '@/helpers/erros';
import { Event as EventMW } from '@/interfaces/ResponseHttp';
import Icons from '../assets/icons.svg';
import { Pagination } from './Pagination';
import { useEvents } from '../hooks/monitoring';


interface Props {
    textSearch: string;
    showResults: number;
    addFilterEvent: (type: number, code: string) => void;
}

export const TableEvents = ({ showResults, textSearch, addFilterEvent}:Props) => {

    const { data: events, isLoading, isError, error } = useEvents();

    const [pager, setPager] = useState(1);


    const filterCode = (event: EventMW) => {
        return event.CodigoEvento.toLowerCase().includes(textSearch.toLowerCase());
    }

    const filterDesc = (event: EventMW) => {
        return event.DescripcionEvent.toLowerCase().includes(textSearch.toLowerCase());
    }

    const filterCodeA = (event: EventMW) => {
        return event.CodigoAlarma.toLowerCase().includes(textSearch.toLowerCase());
    }

    
    return (
        <table className='table modal-color'>
        <thead>
            <tr>
                <th className='table-head'>Codigo</th>
                <th className='table-head'>Descripción</th>
                <th className='table-head'>Cod. alarma</th>
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
                        events!.filter(event => filterCode(event) || filterDesc(event) || filterCodeA(event)).slice(((pager - 1) * showResults), pager * showResults).map(event => (
                            <tr className='table__col-single' key={`event-${event.CodigoEvento}`}>
                                <td className='table-text'>{event.CodigoEvento}</td>
                                <td className='table-text'>{event.DescripcionEvent}</td>
                                <td className='table-text'>{event.CodigoAlarma}</td>
                                <td>
                                    <div className='table-actions'>
                                        <button
                                            type='button' className='btn-table-primary modal'
                                            onClick={() => addFilterEvent(2, event.CodigoEvento)}
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
                    events!.filter(event => filterCode(event) || filterDesc(event) || filterCodeA(event)).length
            }
            page={pager}
            setPager={setPager}
            showResults={showResults}
        />
    </table>
    )
}
