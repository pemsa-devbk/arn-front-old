import React, { useState } from 'react'
import { useTasks } from '@/hooks/task-panel';
import { TaskPSS } from '../../interfaces/ResponseHttp';
import { Table } from '@/components/task-panel/Table';
import { Modal } from '@/components/Modal';
import { Contacts } from '@/components/Contacts';
import { FormTask } from '@/components/task-panel/FormTask';
import { FormEditTask } from '@/components/task-panel/FormEditTask';

export const Panel = () => {

    const {isError, refetch } = useTasks();
    const [textSearch, setTextSearch] = useState('');
    const [showResults, setShowResults] = useState(5);
    const [showModalNew, setShowModalNew] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalView, setShowModalView] = useState(false);
    const [showModalContacts, setShowModalContacts] = useState(false);
    const [taskActive, setTaskActive] = useState<TaskPSS>({
        accounts: [],
        bodyMessage: false,
        contacts: [],
        createAt: '',
        cron: '',
        fileMessage: false,
        idFilter: 1,
        idTask: '',
        ignoreEmpty: false,
        lastRun: null,
        name: '',
        sendMail: false,
        sendTelegram: false,
        sendWhatsApp: false,
        state: false,
        typeAccount: 1,
        updateAt: '',
        timeBatery: 0,
        typeTimeBatery: 'DYS',
        timeCa: 0,
        typeTimeCa: 'DYS',
        timeLastTest: 0,
        typeTimeLastTest: 'DYS',
        typePss: 1
    });

    const openModalEdit = (task: TaskPSS) => {
        setTaskActive(task);
        setShowModalEdit(() => true);
    }

    const openModalView = (task: TaskPSS) => {
        setTaskActive(task);
        setShowModalView(() => true);
    }
    const openModalContact = (task: TaskPSS) => {
        setTaskActive(task);
        setShowModalContacts(() => true);
    }

    return (
        <div className='view'>

            <Modal title='Nueva tarea' showModal={setShowModalNew} show={showModalNew} subtitle='RELLENE TODOS LOS CAMPOS PARA IR AL SIGUIENTE PASO'>
                <FormTask
                    setShow={setShowModalNew}
                />
            </Modal>

            <Modal
                title={`Editar ${taskActive.name}`}
                showModal={setShowModalEdit}
                show={showModalEdit}
                subtitle='RELLENE TODOS LOS CAMPOS PARA IR AL SIGUIENTE PASO'
            >
                <FormEditTask
                    task={taskActive}
                    show={showModalEdit}
                    setShow={setShowModalEdit}
                />
            </Modal>

            <Modal
                title={`${taskActive.name}`}
                showModal={setShowModalContacts}
                show={showModalContacts}
                subtitle='Elimine y agrege contactos a la tarea'
            >
                <Contacts
                    idTask={taskActive.idTask}
                    typeTask='task-state'
                />

            </Modal>

            <section className='title-view'>
                <h2>Tareas Panel sin señal</h2>
                <button className='btn-text btn-header' onClick={() => setShowModalNew(true)}>
                    Nueva tarea
                </button>
                <button className='btn-text btn-header' onClick={() => refetch()}>
                    Actualizar
                </button>
            </section>

            <section className='table-container content'>
                <article className='table__options'>
                    <div className='search'>
                        <input
                            type="text"
                            value={textSearch}
                            className="inp__text-search"
                            disabled={isError}
                            onChange={({ target }) => setTextSearch(target.value)}
                            placeholder="Buscar..."
                        />
                    </div>
                    <div>
                        <label>Número de resultados</label>
                        <select name="" id="" onChange={({ target }) => setShowResults(Number(target.value))}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                </article>

                <article className='table-content'>
                    <Table
                        textSearch={textSearch}
                        showResults={showResults}
                        openModalEdit={openModalEdit}
                        openModalView={openModalView}
                        openModalContact={openModalContact}
                    />
                </article>
            </section>
        </div>
    )
}
