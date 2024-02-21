import React, { useState } from 'react'
import { Table } from '@/components/task-state/Table';
import { useTasks } from '@/hooks/task-state';
import { Modal } from '@/components/Modal';
import { FormEditTask } from '@/components/task-state/FormEditTask';
import { TaskState } from '@/interfaces/ResponseHttp';
import { FormTask } from '@/components/task-state/FormTask';
import { ViewTask } from '@/components/task-state/ViewTask';
import { Contacts } from '@/components/Contacts';

export const TasksState = () => {

  const { isRefetching, isError, error, refetch } = useTasks();


  const [textSearch, setTextSearch] = useState('');
  const [showResults, setShowResults] = useState(5);
  const [showModalNew, setShowModalNew] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalView, setShowModalView] = useState(false);
  const [showModalContacts, setShowModalContacts] = useState(false);
  const [taskActive, setTaskActive] = useState<TaskState>({
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
    reportClose: false,
    reportOpen: false,
    sendMail: false,
    sendTelegram: false,
    sendWhatsApp: false,
    state: false,
    typeAccount: 1,
    updateAt: ''
  });

  const openModalEdit = (task: TaskState) => {
    setTaskActive(task);
    setShowModalEdit(() => true);
  }

  const openModalView = (task: TaskState) => {
    setTaskActive(task);
    setShowModalView(() => true);
  }
  const openModalContact = (task: TaskState) => {
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
        title={`Tarea: ${taskActive.name}`}
        showModal={setShowModalView}
        show={showModalView}
        subtitle=''
      > 
        <ViewTask 
          task={taskActive}
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
        <h2>Tareas Estado De Sucursales </h2>
        <button className='btn-text btn-header' onClick={() => setShowModalNew(true)}>
          Nueva tarea
        </button>
        {/* <button className='btn-text btn-header'>Crear reporte</button> */}
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
