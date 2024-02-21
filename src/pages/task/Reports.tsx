import { Contacts } from '@/components/Contacts';
import { Modal } from '@/components/Modal';
import { FormEditTask } from '@/components/task-report/FormEditTask';
import { FormTask } from '@/components/task-report/FormTask';
import { Table } from '@/components/task-report/Table';
import { useTasks } from '@/hooks/task-report';
import React, { useState } from 'react'
import { TaskReport } from '../../interfaces/ResponseHttp';

export const Reports = () => {
    const { isRefetching, isError, error, refetch } = useTasks();


    const [textSearch, setTextSearch] = useState('');
    const [showResults, setShowResults] = useState(5);
    const [showModalNew, setShowModalNew] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalView, setShowModalView] = useState(false);
    const [showModalContacts, setShowModalContacts] = useState(false);
    const [taskActive, setTaskActive] = useState<TaskReport>({
        accounts: [],
        contacts: [],
        createAt: '',
        cron: '',
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
        comments: 0,
        format: 'pdf',
        isAccumulated: false,
        isHorizontal: false,
        reportTask: false,
        startQuery: '00:00',
        withNames: false,
        withPartition: false
    });

    const openModalEdit = (task: TaskReport) => {
        setTaskActive(task);
        setShowModalEdit(() => true);
    }

    const openModalView = (task: TaskReport) => {
        setTaskActive(task);
        setShowModalView(() => true);
    }
    const openModalContact = (task: TaskReport) => {
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
                <h2>Tareas Reporte de alarma</h2>
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
