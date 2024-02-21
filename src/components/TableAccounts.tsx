import React, { useState } from 'react'
import { Pagination } from './Pagination';
import Icons from '../assets/icons.svg';
import { useAccounts } from '../hooks/monitoring';
import { hanldeErrors } from '../helpers/erros';

interface Props {
    textSearch: string;
    showResults: number;
    addAccount: (idAccount: string, typeAccount: number) => void;
}

export const TableAccounts = ({ showResults, textSearch, addAccount }: Props) => {

    const {data: accounts, isLoading, isError, error} = useAccounts();

    const [pager, setPager] = useState(1);

    const filterClient = (account: any) => {
        return account.CodigoCte.toLowerCase().includes(textSearch.toLowerCase());
    }

    const filterAbonado = (account: any) => {
        return account.CodigoAbonado.toLowerCase().includes(textSearch.toLowerCase());
    }

    const filterName = (account: any) => {
        return account.Nombre.toLowerCase().includes(textSearch.toLowerCase());
    }

    return (
        <table className='table modal-color'>
            <thead>
                <tr>
                    <th className='table-head'>CTE</th>
                    <th className='table-head'>Abonado</th>
                    <th className='table-head'>Nombre</th>
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
                            accounts!.filter(account => filterClient(account) || filterName(account) || filterAbonado(account)).slice(((pager - 1) * showResults), pager * showResults).map(account => (
                                <tr className='table__col-single' key={`cta-${account.CodigoCte}`}>
                                    <td className='table-text'>{account.CodigoCte}</td>
                                    <td className='table-text'>{account.CodigoAbonado}</td>
                                    <td className='table-text'>
                                        {account.Nombre}
                                    </td>
                                    <td>
                                        <div className='table-actions'>
                                            <button
                                                type='button' className='btn-table-primary modal'
                                                onClick={() => addAccount(account.CodigoCte, 1)}
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
                        accounts!.filter(account => filterClient(account) || filterName(account) || filterAbonado(account)).length
                }
                page={pager}
                setPager={setPager}
                showResults={showResults}
            />
        </table>
    )
}
