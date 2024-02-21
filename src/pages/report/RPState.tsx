import React, { CSSProperties, useState } from 'react'
import { Accounts } from '@/components/Accounts'
import { Modal } from '@/components/Modal'
import { useFormik } from 'formik';
import { Account } from '@/interfaces/ResponseHttp';
import { useAccounts, useGroups } from '@/hooks/monitoring';
import axios from 'axios';
import Swal from 'sweetalert2';

const validateForm = (values: any) => {
    const errors = {};
    if (!values.name) {
        //@ts-ignore
        errors.name = 'Campo obligatorio';
    }

    return errors;

}

export const RPState = () => {

    const [showModal, setShowModal] = useState(false);
    const { data: groupsMW, isLoading: isLG, isError: isEG, error: errg } = useGroups();
    const { data: accountsMW, isLoading: isLA, isError: isEA, error: erra } = useAccounts();

    const form = useFormik({
        initialValues: {
            name: '',
            ignoreEmpty: false,
            reportOpen: false,
            reportClose: false,
            typeFile: 'file',
            typeAccount: 0,
            accounts: [] as Account[],

        },
        validate: validateForm, 
        onSubmit: (values) => {
            axios({
                url: `https://arn.pem-sa.com.mx/task-state/report`,
                method: 'POST',
                responseType: 'blob',
                data: values
            })
                .then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `${values.name}.pdf`);
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
                <h2>Reporte de estado de sucursales</h2>
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
                            <span className="switch__span">Sucursales abiertas</span>
                            <input
                                className="switch__input"
                                type="checkbox"
                                name='reportOpen'
                                onChange={form.handleChange}
                                checked={form.values.reportOpen}
                            />
                            <i className="switch__icon"></i>
                        </label>
                    </div>

                    <div className='form__container'>
                        <label className="switch">
                            <span className="switch__span">Sucursales cerradas</span>
                            <input
                                className="switch__input"
                                type="checkbox"
                                name='reportClose'
                                onChange={form.handleChange}
                                checked={form.values.reportClose}
                            />
                            <i className="switch__icon"></i>
                        </label>
                    </div>

                    <div className='form__container'>
                        <label htmlFor="">
                            Cuentas:
                            <button className='report-arrow' type='button' onClick={() => setShowModal(true)}>Agregar</button>
                        </label>
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
