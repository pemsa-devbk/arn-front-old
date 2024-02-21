import React, { useRef, useState } from 'react';
import { TaskPSS } from '@/interfaces/ResponseHttp';
import Icons from '../../assets/icons.svg';
import { cronToString } from '@/helpers/date';
import { useStartMail } from '@/hooks/general';
import { useStopMail, useStartWhatsApp, useStopWhatsApp, useStartTelegram, useStopTelegram, useStartTask, useStopTask, useDeleteTask } from '../../hooks/general';
import ReactTooltip from 'react-tooltip';
import { useExecuteTask } from '../../hooks/task-panel';
import { useNavigate } from 'react-router-dom';

interface Props {
    task: TaskPSS;
    openModalEdit: (task: TaskPSS) => void;
    openModalView: (task: TaskPSS) => void;
    openModalContact: (task: TaskPSS) => void;

}
export const Row = ({ task, openModalEdit, openModalView, openModalContact }: Props) => {
    const [icon, setIcon] = useState('plus-circle');

    const ref = useRef<HTMLTableElement>(null);
    const navigate = useNavigate();
    const showMoreInfo = () => {
        ref.current?.classList.toggle('show-more-info');
        if (icon === "plus-circle") {
            setIcon("minus-circle")
        } else {
            setIcon("plus-circle");
        }
    }

    const { mutate: startMail, isLoading: isLSTAM } = useStartMail('task-panel');
    const { mutate: stopMail, isLoading: isLSTOM } = useStopMail('task-panel');
    const { mutate: startWhatsApp, isLoading: isLSTAW } = useStartWhatsApp('task-panel');
    const { mutate: stopWhatsApp, isLoading: isLSTOW } = useStopWhatsApp('task-panel');
    const { mutate: startTelegram, isLoading: isLSTAT } = useStartTelegram('task-panel');
    const { mutate: stopTelegram, isLoading: isLSTOT } = useStopTelegram('task-panel');
    const { mutate: startTask, isLoading: isLSTAK } = useStartTask('task-panel');
    const { mutate: stopTask, isLoading: isLSTOK } = useStopTask('task-panel');
    const { mutate: deleteTask, isLoading: isLDel } = useDeleteTask('task-panel');
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
                <td className='table-text'>{(task.typePss === 1) ? 'Panel sin señal' : 'Estado del panel'}</td>
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
                            onClick={() => navigate(`/task/docs/${task.name}/${task.idTask}`)}
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
                                            className={`btn btn-text btn-table-secondary btn-table-secondary--inactive ${isLSTAW && 'btn-block'}`}
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
                            <td className='table-text'>{task.updateAt ? new Date(task.updateAt).toLocaleString() : 'No se han echo cambios'}</td>
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
