import React, { useState } from 'react';
import { Filter } from '@/interfaces/ResponseHttp';
import { Pagination } from '../Pagination';
import { hanldeErrors } from '@/helpers/erros';
import { useFilters } from '../../hooks/filter';
import Icons from '../../assets/icons.svg';


interface Props {
    textSearch: string;
    showResults: number;
    openModalEdit: (idFilter: number, name: string) => void;
    openModalView: (idFilter: number, name: string) => void;
}
export const Table = ({ textSearch, showResults, openModalEdit, openModalView }: Props) => {

    const { data: filters, isLoading, isError, error } = useFilters();


    const [pager, setPager] = useState(1);


    const filterName = (task: Filter) => {
        return task.name.toLowerCase().includes(textSearch.toLowerCase());
    }



    return (
        <table className='table task-color'>
            <thead>
                <tr>
                    <th className='table-head'>Nombre</th>
                    <th className='table-head'>Mostrar zonas</th>
                    <th className='table-head'>Mostrar usuarios</th>
                    <th className='table-head'>Exclude eventos</th>
                    <th className='table-head'>Especial</th>
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
                            filters!.filter((filter) => filterName(filter)).slice(((pager - 1) * showResults), pager * showResults).map(filter => (
                                <tr className='table__col-single' key={`Filter-${filter.idFilter}`}>
                                    <td className='table-text'>{filter.name}</td>
                                    <td className='table-text'>{filter.showZone ? 'SI' : 'NO'}</td>
                                    <td className='table-text'>{filter.showUser ? 'SI' : 'NO'}</td>
                                    <td className='table-text'>{filter.exclude ? 'SI' : 'NO'}</td>
                                    <td className='table-text'>{filter.isSpecial ? 'SI' : 'NO'}</td>
                                    <td className='table-text'>
                                        <div className='table-actions'>
                                            <button
                                                className='btn-table-primary'
                                                onClick={() => openModalEdit(filter.idFilter, filter.name)}
                                            >
                                                <svg className='icon'>
                                                    <use xlinkHref={`${Icons}#icon-edit`}></use>
                                                </svg>
                                            </button>
                                            <button
                                                className='btn-table-primary btn-block'
                                            >
                                                <svg className='icon'>
                                                    <use xlinkHref={`${Icons}#icon-eye`}></use>
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
                        filters!.filter((filter) => filterName(filter)).length
                }
                page={pager}
                setPager={setPager}
                showResults={showResults}
            />
        </table>
    )
}
