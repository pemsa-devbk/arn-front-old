import React, { useRef, useState } from 'react';
import { TaskState } from '@/interfaces/ResponseHttp';
import Icons from '../../assets/icons.svg';
import { cronToString } from '@/helpers/date';
import { useStartMail } from '@/hooks/general';
import { useStopMail, useStartWhatsApp, useStopWhatsApp, useStartTelegram, useStopTelegram, useStartTask, useStopTask, useDeleteTask } from '../../hooks/general';
import { useExecuteTask } from '../../hooks/task-state';
import { useNavigate } from 'react-router-dom';

interface Props {
    task: TaskState;
    openModalEdit: (task: TaskState) => void;
    openModalView: (task: TaskState) => void;
    openModalContact: (task: TaskState) => void;

}
export const Row = ({ task, openModalEdit, openModalView, openModalContact }: Props) => {
    const [icon, setIcon] = useState('plus-circle');
    const navigate = useNavigate();
    const ref = useRef<HTMLTableElement>(null);
    const showMoreInfo = () => {
        ref.current?.classList.toggle('show-more-info');
        if (icon === "plus-circle") {
            setIcon("minus-circle")
        } else {
            setIcon("plus-circle");
        }
    }

    const { mutate: startMail, isLoading: isLSTAM } = useStartMail('task-state');
    const { mutate: stopMail, isLoading: isLSTOM } = useStopMail('task-state');
    const { mutate: startWhatsApp, isLoading: isLSTAW } = useStartWhatsApp('task-state');
    const { mutate: stopWhatsApp, isLoading: isLSTOW } = useStopWhatsApp('task-state');
    const { mutate: startTelegram, isLoading: isLSTAT } = useStartTelegram('task-state');
    const { mutate: stopTelegram, isLoading: isLSTOT } = useStopTelegram('task-state');
    const { mutate: startTask, isLoading: isLSTAK } = useStartTask('task-state');
    const { mutate: stopTask, isLoading: isLSTOK } = useStopTask('task-state');
    const { mutate: deleteTask, isLoading: isLDel } = useDeleteTask('task-state');
    const { mutate: executeTask, isLoading: isLExe } = useExecuteTask();


    return (
        <>
            <tr className='table__col-primary'>
                <td>
                    <button className='btn btn-circle' onClick={() => showMoreInfo()}>
                        <svg className='icon'>
                            <use xlinkHref={`${Icons}#icon-${icon}`}></use>
                        </svg>
                    </button>
                </td>
                <td className='table-text'>{task.name}</td>
                <td className='table-text'>{cronToString(task.cron)}</td>
                <td className='table-text'>{(task.reportOpen && task.reportClose) ? 'Estado de sucursales' : (task.reportOpen) ? 'Sucursales abiertas' : 'Sucursales cerradas'}</td>
                <td className='table-text'>{task.lastRun ? new Date(task.lastRun).toLocaleString() : 'Sin ejecutar'}</td>
                <td className='table-text'>{(task.typeAccount === 1) ? 'Individual' : (task.typeAccount === 2) ? 'Grupal' : 'Dealer'}</td>
                <td className='table-text'>
                    {
                        task.state
                            ?
                            <button
                                className={`btn-text btn-table-state btn-table-state--active ${isLSTOK && 'btn-block'}`}
                                onClick={() => stopTask(task.idTask)}
                                disabled={isLSTOK}
                            >
                                Activo
                            </button>
                            :
                            <button
                                className={`btn btn-text btn-table-state btn-table-state--inactive  ${isLSTAK && 'btn-block'}`}
                                onClick={() => startTask(task.idTask)}
                                disabled={isLSTAK}
                            >
                                Inactivo
                            </button>
                    }
                </td>
                <td>
                    <div className='table-actions'>
                        <button
                            className='btn-table-primary btn-block'
                            data-tip="Ver"
                            data-for="xls-helps-ty"
                            data-iscapture="true"
                            // onClick={() => openModalView(task)}
                        >
                            <svg className='icon'>
                                <use xlinkHref={`${Icons}#icon-eye`}></use>
                            </svg>
                        </button>
                        <button
                            className='btn-table-primary'
                            data-tip="Contactos"
                            data-for="xls-helps-ty"
                            data-iscapture="true"
                            onClick={() => openModalContact(task)}
                        >
                            <svg className='icon'>
                                <use xlinkHref={`${Icons}#icon-users`}></use>
                            </svg>
                        </button>
                        <button
                            className='btn-table-primary' onClick={() => openModalEdit(task)}
                            data-tip="Editar"
                            data-for="xls-helps-ty"
                            data-iscapture="true"
                        >
                            <svg className='icon'>
                                <use xlinkHref={`${Icons}#icon-edit`}></use>
                            </svg>
                        </button>
                        <button
                            className='btn-table-primary'
                            data-tip="Archivos"
                            data-for="xls-helps-ty"
                            data-iscapture="true"
                            onClick={ () => navigate(`/task/docs/${task.name}/${task.idTask}`)}
                        >
                            <svg className='icon'>
                                <use xlinkHref={`${Icons}#icon-folder`}></use>
                            </svg>
                        </button>
                        <button
                            className={`btn-table-primary ${isLExe && 'btn-block'}`}
                            data-tip="Ejecutar"
                            data-for="xls-helps-ty"
                            data-iscapture="true"
                            onClick={() => executeTask(task.idTask)}
                            disabled={isLExe}
                        >
                            <svg className='icon'>
                                <use xlinkHref={`${Icons}#icon-zap`}></use>
                            </svg>
                        </button>
                        <button
                            className={`btn-table-primary ${isLDel && 'btn-block'}`}
                            data-tip="Eliminar"
                            data-for="xls-helps-ty"
                            data-iscapture="true"
                            onClick={() => deleteTask(task.idTask)}
                            disabled={isLDel}
                        >
                            <svg className='icon'>
                                <use xlinkHref={`${Icons}#icon-trash-2`}></use>
                            </svg>
                        </button>
                    </div>
                </td>
            </tr>
            <tr className='sub'>
                <td colSpan={10} className='sub-td'>
                    <table ref={ref}>
                        <tr>
                            <td className='table-text'>Envio por Correo</td>
                            <td>
                                {
                                    task.sendMail
                                        ?
                                        <button
                                            className={`btn btn-text btn-table-secondary btn-table-secondary--active ${isLSTOM && 'btn-block'}`}
                                            onClick={() => stopMail(task.idTask)}
                                            disabled={isLSTOM}
                                        >
                                            Activo
                                        </button>
                                        :
                                        <button
                                            className={`btn btn-text btn-table-secondary btn-table-secondary--inactive ${isLSTAM && 'btn-block'}`}
                                            onClick={() => startMail(task.idTask)}
                                            disabled={isLSTAM}
                                        >
                                            Inactivo
                                        </button>
                                }
                            </td>
                            <td className='table-text'>Creado en</td>
                            <td className='table-text'>{new Date(task.createAt).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td className='table-text'>Envio por WhatsApp</td>
                            <td>
                                {
                                    task.sendWhatsApp
                                        ?
                                        <button
                                            className={`btn btn-text btn-table-secondary btn-table-secondary--active ${isLSTOW && 'btn-block'}`}
                                            onClick={() => stopWhatsApp(task.idTask)}
                                            disabled={isLSTOW}
                                        >
                                            Activo
                                        </button>
                                        :
                                        <button
                                            className={`btn btn-text btn-table-secondary btn-table-secondary--inactive ${isLSTAW && 'btn-block'}`}
                                            onClick={() => startWhatsApp(task.idTask)}
                                            disabled={isLSTAW}
                                        >
                                            Inactivo
                                        </button>
                                }
                            </td>
                            <td className='table-text'>Ultima actualizacion</td>
                            <td className='table-text'>{ task.updateAt ? new Date(task.updateAt).toLocaleString() : 'No se han echo cambios' }</td>
                        </tr>
                        <tr>
                            <td className='table-text'>Envio por Telegram</td>
                            <td>
                                {
                                    task.sendTelegram
                                        ?
                                        <button
                                            className={`btn btn-text btn-table-secondary btn-table-secondary--active ${isLSTOT && 'btn-block'}`}
                                            onClick={() => stopTelegram(task.idTask)}
                                            disabled={isLSTOT}
                                        >
                                            Activo
                                        </button>
                                        :
                                        <button
                                            className={`btn btn-text btn-table-secondary btn-table-secondary--inactive ${isLSTAT && 'btn-block'}`}
                                            onClick={() => startTelegram(task.idTask)}
                                            disabled={isLSTAT}
                                        >
                                            Inactivo
                                        </button>
                                }
                            </td>
                            <td className='table-text'>Ignora sin eventos</td>
                            <td className='table-text'>
                                {
                                    task.ignoreEmpty
                                        ?
                                        'SI'
                                        :
                                        'NO'
                                }
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </>
    )
}
