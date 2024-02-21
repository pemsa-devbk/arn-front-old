import { cronToString } from '@/helpers/date';
import React from 'react'
import Icons from '../../assets/icons.svg';
import { useExecuteGlobal } from '../../hooks/global';


interface Props {
    tkG: { id: string, cron: string, state: boolean }
    openModalEdit: (id: string) => void;
}
export const Row = ({ openModalEdit, tkG }: Props) => {

    const {mutate: execute, isLoading} = useExecuteGlobal();

    return (
        <tr className='table__col-single' key={tkG.id}>
            <td className='table-text'>{tkG.id}</td>
            <td className='table-text'>{cronToString(tkG.cron)}</td>
            <td className='table-text'>
                {
                    tkG.state
                        ?
                        <button
                            className={`btn-text btn-table-state btn-table-state--active`}
                        >
                            Activo
                        </button>
                        :
                        <button
                            className={`btn btn-text btn-table-state btn-table-state--inactive`}
                        >
                            Inactivo
                        </button>
                }
            </td>
            <td className='table-actions'>
                <button
                    className='btn-table-primary'
                    onClick={() => openModalEdit(tkG.id)}
                    data-tip="Editar"
                    data-for="xls-helps-ty"
                    data-iscapture="true"
                >
                    <svg className='icon'>
                        <use xlinkHref={`${Icons}#icon-edit`}></use>
                    </svg>
                </button>
                <button
                    className={`btn-table-primary`}
                    data-tip="Ejecutar"
                    data-for="xls-helps-ty"
                    data-iscapture="true"
                    onClick={() => execute(tkG.id)}
                    disabled={isLoading}
                >
                    <svg className='icon'>
                        <use xlinkHref={`${Icons}#icon-zap`}></use>
                    </svg>
                </button>
            </td>
        </tr>
    )
}
