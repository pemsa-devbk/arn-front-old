import React, { useState } from 'react'
import { useGlobalTasks, useUpdateTime } from '../../hooks/global';
import { Table } from '@/components/settings/Table';
import { Modal } from '@/components/Modal';
import { useFormik } from 'formik';

export const GLTasks = () => {

    const { refetch } = useGlobalTasks();
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [tkActive, setTkActive] = useState('');
    const {mutate: update} = useUpdateTime();

    const form = useFormik({
        initialValues: {
            time: '00:00'
        },
        onSubmit: (values) => {
            update({id: tkActive, time: values.time})
        }
    });

    const openModalEdit = (id: string) => {
        setTkActive(id);
        setShowModalEdit(() => true);
    }

    return (
        <div className='view'>

            <Modal
                title={`Editar horario ${tkActive}`}
                subtitle='Ingrese el nuevo horario a ejecutar'
                show={showModalEdit}
                showModal={setShowModalEdit}
            >
                <form className='form' onSubmit={form.handleSubmit}>
                    <div className="form__container center-text">
                        <label htmlFor='hour' className='block'>Horario de ejecución</label>
                        <input
                            className='inp-time'
                            type="time"
                            name='time'
                            onChange={form.handleChange}
                            value={form.values.time}
                        />
                    </div>
                    <div className='form-steps'>
                        <button type='submit' className='form-steps--next'>Guardar</button>
                    </div>
                </form>
            </Modal>

            <section className='title-view'>
                <h2>Tareas globales</h2>

                <button className='btn-text btn-header' onClick={() => refetch()}>
                    Actualizar
                </button>
            </section>

            <section className='table-container content'>
                <article className='table-content'>
                    <Table
                        openModalEdit={openModalEdit}
                    />
                </article>
            </section>
        </div>
    )
}
