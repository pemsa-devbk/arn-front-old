import React from 'react'
import { TaskState } from '@/interfaces/ResponseHttp';
import { cronToString } from '../../helpers/date';
import { useAccounts, useGroups } from '@/hooks/monitoring';


interface Props {
    task: TaskState
}
export const ViewTask = ({ task }: Props) => {
    const { data: groupsMW, isLoading: isLG, isError: isEG, error: errg } = useGroups();
    const { data: accountsMW, isLoading: isLA, isError: isEA, error: erra } = useAccounts();

    return (
        <section className='info-task'>
            <article className='basic-task'>
                <p className='info-title'>Información basica</p>

                <p className='info-text'>Tiempo de ejecución: <small>{cronToString(task.cron)}</small></p>
                <p className='info-text'>Creada el: <small>{new Date(task.createAt).toLocaleString()}</small></p>
                <p className='info-text'>Ultima actualización: <small>{new Date(task.updateAt).toLocaleString()}</small></p>
                <p className='info-text'>Estado: <small>{task.state ? 'Activa' : 'Inactiva'}</small></p>
                <p className='info-text'>Tipo de cuenta: <small>{(task.typeAccount === 1) ? 'Individual' : (task.typeAccount === 2) ? 'Grupal' : 'Dealer'}</small></p>
                <p className='info-text'>Envio por correo: <small>{task.sendMail ? 'Activo' : 'Inactivo'}</small></p>
                <p className='info-text'>Envio por Telegram: <small>{task.sendTelegram ? 'SI' : 'NO'}</small></p>
                <p className='info-text'>Ignora cuentas sin eventos: <small>{task.ignoreEmpty ? 'SI' : 'NO'}</small></p>
            </article>
            <article className='for-task'>
                <p className='info-title'>Informacion tarea estado</p>
                <p className='info-text'>Reporta cuentas abiertas: <small>{task.reportOpen ? 'SI' : 'NO'}</small></p>
                <p className='info-text'>Reporta cuentas abiertas: <small>{task.reportClose ? 'SI' : 'NO'}</small></p>
                <p className='info-text'>Tabla en cuerpo de mensaje (email): <small>{task.bodyMessage ? 'SI' : 'NO'}</small></p>
                <p className='info-text'>Archio en cuerpo de mensaje (email): <small>{task.fileMessage ? 'SI' : 'NO'}</small></p>
            </article>
            <article className='contacts-task'>
                <p className='info-title'>Contactos</p>
                <div className="items-list">
                    {
                        (task.contacts.length === 0)
                        ?
                        <p className='info-text'>Sin contactos</p>
                        :
                        task.contacts.map(contact => (
                            <div key={`${task.idTask}-${contact.contact}`} className='item'>
                                <span>
                                    {
                                        (contact.typeContact === 1)
                                            ?
                                            'Correo principal'
                                            :
                                            (contact.typeContact === 2)
                                                ?
                                                'Correo copia'
                                                :
                                                (contact.typeContact === 3)
                                                    ?
                                                    'Correo copia oculta'
                                                    :
                                                    (contact.typeContact === 4)
                                                        ?
                                                        'WhatsApp'
                                                        :
                                                        (contact.typeContact === 5)
                                                            ?
                                                            'Telegram'
                                                            :
                                                            'Desconocido'
                                    }
                                </span>
                                <p>{contact.contact}</p>
                            </div>
                        ))
                    }
                </div>
            </article>

            <article className='accounts-task'>
                <p className='info-title'>Cuentas</p>
                <div className="items-list">
                    {
                        (task.typeAccount === 1)
                            ?
                            (isLA)
                                ?
                                <p>Carando....</p>
                                :
                                (isEA)
                                    ?
                                    (erra instanceof Error)
                                        ?
                                        erra.message
                                        :
                                        'Error no controlado'
                                    :
                                    task.accounts.map(account => (
                                        <div key={`${task.idTask}-${account.idAccount}`} className='item'>
                                            <p>{accountsMW?.find(acc => acc.CodigoCte === account.idAccount)?.Nombre || 'No encontrada'}</p>
                                        </div>
                                    ))
                            :
                            (isLG)
                                ?
                                <p>Carando....</p>
                                :
                                (isEG)
                                    ?
                                    (errg instanceof Error)
                                        ?
                                        errg.message
                                        :
                                        'Error no controlado'
                                    :
                                    task.accounts.map(account => (
                                        <div key={`${task.idTask}-${account.idAccount}`} className='item'>
                                            <p>{groupsMW?.find(acc => acc.CodeMW.toString() === account.idAccount && acc.Type === account.typeAccount)?.Name || 'No encontrada'}</p>
                                        </div>
                                    ))
                    }
                </div>
            </article>
        </section>
    )
}
