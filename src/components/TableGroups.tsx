import React, { useState } from 'react'
import { GroupMW } from '../interfaces/ResponseHttp';
import { Pagination } from './Pagination';
import Icons from '../assets/icons.svg';
import { useGroups } from '../hooks/monitoring';
import { hanldeErrors } from '../helpers/erros';


interface Props {
    textSearch: string;
    showResults: number;
    addAccount: (idAccount: string, typeAccount: number) => void;
}
export const TableGroups = ({ textSearch, showResults, addAccount }: Props) => {

    const {data: groups, isLoading, isError, error} = useGroups();
    const [pager, setPager] = useState(1);

    const filterCode = (group: GroupMW) => {
        return group.CodeMW === Number(textSearch);
    }

    const filterName = (group: GroupMW) => {
        return group.Name.toLowerCase().includes(textSearch.toLowerCase());
    }

    return (
        <table className='table modal-color'>
            <thead>
                <tr>
                    <th className='table-head'>Codigo</th>
                    <th className='table-head'>Nombre</th>
                    <th className='table-head'>Tipo</th>
                    <th className='table-head'>Add</th>
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
                            groups!.filter(group => filterCode(group) || filterName(group)).slice(((pager - 1) * showResults), pager * showResults).map(group => (
                                <tr className='table__col-single' key={`Group-${group.CodeMW}`}>
                                    <td className='table-text'>{group.CodeMW}</td>
                                    <td className='table-text'>{group.Name}</td>
                                    <td className='table-text'>{(group.Type === 2) ? 'GRUPO' : 'DEALER'}</td>
                                    <td className='table-text' >
                                        <div className='table-actions'>
                                            <button
                                                type='button' className='btn-table-primary modal'
                                                onClick={() => addAccount(group.CodeMW.toString(), group.Type)}
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
                    (isError || isLoading)
                        ?
                        0
                        :
                        groups!.filter(group => filterCode(group) || filterName(group)).length
                }
                page={pager}
                setPager={setPager}
                showResults={showResults}
            />
        </table>
    )
}
