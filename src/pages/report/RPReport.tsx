import React, { useState } from 'react'
import { Accounts } from '@/components/Accounts'
import { Modal } from '@/components/Modal'
import { useFormik } from 'formik';
import { Account } from '@/interfaces/ResponseHttp';
import { useAccounts, useGroups } from '@/hooks/monitoring';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useFilters } from '@/hooks/filter';
import { hanldeErrors } from '@/helpers/erros';

const validateForm = (values: any) => {
    const errors = {};
    if (!values.name) {
        //@ts-ignore
        errors.name = 'Campo obligatorio';
    }
    if (!values.idFilter) {
        //@ts-ignore
        errors.idFilter = 'Campo obligatorio';
    } else if (isNaN(Number(values.idFilter))) {
        //@ts-ignore
        errors.idFilter = 'Tipo de reporte no valido';
    }

    if (!values.startDate) {
        //@ts-ignore
        errors.startDate = 'Campo requerido';
    }
    if (!values.endDate) {
        //@ts-ignore
        errors.endDate = 'Campo requerido';
    }
    if (!values.accounts) {
        //@ts-ignore
        errors.accounts = 'Campo obligatorio';
    } else if (values.accounts.length === 0) {
        //@ts-ignore
        errors.accounts = 'Ingrese al menos una cuenta';
    }

    return errors;

}

export const RPReport = () => {

    const [showModal, setShowModal] = useState(false);
    const { data: groupsMW, isLoading: isLG, isError: isEG, error: errg } = useGroups();
    const { data: accountsMW, isLoading: isLA, isError: isEA, error: erra } = useAccounts();
    const { data: filters, isLoading, isError, error } = useFilters();


    const form = useFormik({
        initialValues: {
            name: '',
            ignoreEmpty: false,
            idFilter: 0,
            comments: 0,
            isHorizontal: false,
            withNames: false,
            format: 'pdf',
            startQuery: '00:00',
            endQuery: '23:59',
            startDate: '',
            endDate: '',
            withPartition: false,
            accounts: [] as Account[],
        },
        validate: validateForm,
        onSubmit: (values) => {
            axios({
                url: `https://arn.pem-sa.com.mx/task-report/report`,
                method: 'POST',
                responseType: 'blob',
                data: values
            })
                .then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `${values.name}.${values.format}`);
                    document.body.appendChild(link);
                    link.click();
                })
                .catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al descargar el archivo',
                    })
                })

        },
        enableReinitialize: true
    });

    const handleSubmit = (accounts: Array<Account>, typeAccount: number) => {
        form.setFieldValue('typeAccount', typeAccount);
        form.setFieldValue('accounts', accounts);
        setShowModal(false);
    }

    return (
        <div className='view'>

            <Modal
                title='Agregar cuentas'
                showModal={setShowModal}
                show={showModal}
                subtitle='SELECCIONE LAS CUENTAS'
            >
                <Accounts
                    accounts={[]}
                    handleSubmit={handleSubmit}
                    typeAccount={0}
                />
            </Modal>

            <section className='title-view'>
                <h2>Reporte de estado de alarmas</h2>
            </section>

            <section className='report'>
                <form action="" className='form report__form' onSubmit={form.handleSubmit}>
                    <div className='form__container'>
                        <label htmlFor="">Nombre del archivo</label>
                        <input
                            type="text"
                            id='name'
                            name='name'
                            onChange={form.handleChange}
                            value={form.values.name}
                        />
                        {form.errors.name ? <div className='form-error form-error--input'>{form.errors.name}</div> : null}

                    </div>
                    <div className='form__doble'>
                        <div className='form__container'>
                            <label htmlFor="">Fecha inicial</label>
                            <input
                                type="date"
                                id='startDate'
                                name='startDate'
                                onChange={form.handleChange}
                                value={form.values.startDate}
                            />
                            {form.errors.startDate ? <div className='form-error form-error--input'>{form.errors.startDate}</div> : null}
                        </div>
                        <div className='form__container'>
                            <label htmlFor="">Fecha final</label>
                            <input
                                type="date"
                                id='endDate'
                                name='endDate'
                                onChange={form.handleChange}
                                value={form.values.endDate}
                            />
                            {form.errors.endDate ? <div className='form-error form-error--input'>{form.errors.endDate}</div> : null}
                        </div>
                    </div>

                    <div className="form__doble">
                        <div className='form__container'>
                            <label htmlFor="">Tipo de reporte</label>
                            <select name="idFilter" onChange={({ target }) => form.setFieldValue('idFilter', Number(target.value))} value={form.values.idFilter}>
                                {
                                    isLoading &&
                                    <option defaultChecked value="X">Cargando...</option>
                                }
                                {
                                    isError &&
                                    <option defaultChecked value="X">{hanldeErrors(error)}</option>
                                }
                                {
                                    <>
                                        <option value="x" defaultChecked>Seleccione una opcion</option>
                                        {
                                            filters?.filter(filter => !filter.isSpecial).map(filter => (
                                                <option key={`filter-${filter.idFilter}`} value={filter.idFilter}>{filter.name}</option>
                                            ))
                                        }
                                    </>
                                }
                            </select>
                            {form.errors.idFilter ? <div className='form-error form-error--input'>{form.errors.idFilter}</div> : null}
                        </div>

                        <div className='form__container'>
                            <label htmlFor="">Tipo de comentarios</label>
                            <select name="comments" onChange={({ target }) => form.setFieldValue('comments', Number(target.value))} value={form.values.comments}>
                                <option value='0'>Sin comentarios</option>
                                <option value='1'>Comentarios PEMSA</option>
                                <option value='2'>Comentarios MK</option>
                                <option value='3'>Comentarios MW</option>
                            </select>
                        </div>

                    </div>

                    <div className='form__container'>
                        <label htmlFor="">Formato de envio</label>
                        <select name="format" onChange={form.handleChange} value={form.values.format}>
                            <option value="pdf">PDF</option>
                            <option value="xlsx">XLSX</option>
                        </select>
                    </div>
                    <div className='form__doble'>
                        <div className='form__container'>
                            <label className="switch">
                                <span className="switch__span">Ignorar sucursales sin eventos</span>
                                <input
                                    className="switch__input"
                                    type="checkbox"
                                    name='ignoreEmpty'
                                    onChange={form.handleChange}
                                    checked={form.values.ignoreEmpty}
                                />
                                <i className="switch__icon"></i>
                            </label>
                        </div>
                        <div className='form__container'>
                            <label className="switch">
                                <span className="switch__span">Particiones independientes</span>
                                <input
                                    className="switch__input"
                                    type="checkbox"
                                    name='withPartition'
                                    onChange={form.handleChange}
                                    checked={form.values.withPartition}
                                />
                                <i className="switch__icon"></i>
                            </label>
                        </div>
                    </div>
                    {
                        (form.values.idFilter === 1 && form.values.format === 'xlsx' && Number(form.values.comments) === 0) &&
                        <div className='form__doble'>
                            <div className='form__container'>
                                <label className="switch">
                                    <span className="switch__span">Horizontal</span>
                                    <input
                                        className="switch__input"
                                        type="checkbox"
                                        name='isHorizontal'
                                        onChange={form.handleChange}
                                        checked={form.values.isHorizontal}
                                    />
                                    <i className="switch__icon"></i>
                                </label>
                            </div>
                            <div className='form__container'>
                                <label className="switch">
                                    <span className="switch__span">Con nombres</span>
                                    <input
                                        className="switch__input"
                                        type="checkbox"
                                        name='withNames'
                                        onChange={form.handleChange}
                                        checked={form.values.withNames}
                                    />
                                    <i className="switch__icon"></i>
                                </label>
                            </div>
                        </div>
                    }

                    <div className='form__doble'>

                        <div className="form__container center-text">
                            <label htmlFor='hour' className=''>Horario inicial</label>
                            <input
                                className='inp-time'
                                type="time"
                                name='startQuery'
                                onChange={form.handleChange}
                                value={form.values.startQuery}
                            />
                        </div>
                        <div className="form__container center-text">
                            <label htmlFor='hour' className=''>Hora final</label>
                            <input
                                className='inp-time'
                                type="time"
                                name='endQuery'
                                onChange={form.handleChange}
                                value={form.values.endQuery}
                            />
                        </div>
                    </div>

                    <div className='form__container'>
                        <label htmlFor="">
                            Cuentas:
                            <button className='report-arrow' type='button' onClick={() => setShowModal(true)}>Agregar</button>
                        </label>
                        {form.errors.accounts ? <div className='form-error'>{form.errors.accounts.toString()}</div> : null}
                        <div className='list-accounts'>
                            {
                                form.values.accounts.map(account => (
                                    (account.typeAccount === 1)
                                        ?
                                        <div
                                            key={`task-account-${account.idAccount}`}
                                            className='list-accounts__item'
                                        >
                                            <div className='list-accounts__item-container'>
                                                <p className='list-accounts__item-content'>
                                                    {
                                                        accountsMW?.find(acc => acc.CodigoCte === account.idAccount)?.Nombre
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        :
                                        <div
                                            key={`task-account-${account.idAccount}`}
                                            className='list-accounts__item'
                                        >

                                            <div className='list-accounts__item-container'>
                                                <p className='list-accounts__item-content'>
                                                    {
                                                        groupsMW?.find(group => group.CodeMW.toString() === account.idAccount)?.Name
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                ))
                            }
                        </div>
                    </div>
                    <button className='btn btn-text btn-header'>Generar reporte</button>
                </form>

            </section>
        </div>
    )

}
