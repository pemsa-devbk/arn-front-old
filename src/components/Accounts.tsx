import React, { useState } from 'react'
import { useAccounts, useGroups } from '@/hooks/monitoring';
import { useFormik } from 'formik';
import Icons from '../assets/icons.svg';
import { TableAccounts } from './TableAccounts';
import { TableGroups } from './TableGroups';
import { Account } from '@/interfaces/ResponseHttp';


interface Props {
    setStep?: React.Dispatch<React.SetStateAction<number>>;
    accounts: Array<Account>;
    handleSubmit: (accounts: Array<Account>, typeAccount: number) => void;
    typeAccount: number;
}

const validateFormAccounts = (values: any) => {
    const errors = {};
    if (!values.accounts) {
        //@ts-ignore
        errors.accounts = 'Campo obligatorio';
    } else if (values.accounts.length === 0) {
        //@ts-ignore
        errors.accounts = 'Ingrese al menos una cuenta';
    }
    return errors;
}

export const Accounts = ({ setStep, accounts, handleSubmit, typeAccount }: Props) => {
    const { data: groupsMW, refetch: refetchGroups } = useGroups();
    const { data: accountsMW, refetch: refetchAccounts } = useAccounts();
    const [typeAc, setTypeAc] = useState(1);
    const [textSearch, setTextSearch] = useState('');

    const formik = useFormik({
        initialValues: {
            typeAccount,
            accounts
        },
        validate: validateFormAccounts,
        onSubmit: (values) => {
            handleSubmit(values.accounts, values.typeAccount);
        },
        enableReinitialize: true
    });

    const addAccount = (idAccount: string, typeAccount: number) => {
        if (formik.values.accounts.length === 0) {
            formik.setFieldValue('typeAccount', typeAccount);
            formik.setFieldValue('accounts', [...formik.values.accounts, { idAccount, typeAccount }])
        } else {
            if (formik.values.accounts.every(acc => acc.typeAccount === typeAccount)) {
                if (formik.values.accounts.findIndex(acc => acc.idAccount === idAccount && acc.typeAccount === typeAccount) === -1) {
                    formik.setFieldValue('accounts', [...formik.values.accounts, { idAccount, typeAccount }])
                }
            } else {
                // Tipo de cuenta distinto
                console.log('Tipo distinto');

            }
        }
    }

    const refetch = () => {
        refetchAccounts();
        refetchAccounts();
    }

    const deleteAccount = (idAccount: string, typeAccount: number) => {
        formik.setFieldValue('accounts', [...formik.values.accounts.filter(acc => !(acc.idAccount === idAccount && acc.typeAccount === typeAccount))])
    }

    return (
        <form className='form' onSubmit={formik.handleSubmit}>
            <div className='form__container'>
                <label>Cuentas:</label>
                {formik.errors.accounts ? <div className='form-error'>{formik.errors.accounts.toString()}</div> : null}
                <div className='list-accounts'>
                    {
                        formik.values.accounts.map(account => (
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
                                        <button
                                            type='button'
                                            className='list-accounts__item-delete'
                                            onClick={() => deleteAccount(account.idAccount, account.typeAccount)}
                                        >
                                            <svg className='icon'>
                                                <use xlinkHref={`${Icons}#icon-x`}></use>
                                            </svg>
                                        </button>
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
                                                groupsMW?.find(group => group.CodeMW.toString() === account.idAccount && group.Type === account.typeAccount)?.Name
                                            }
                                        </p>
                                        <button
                                            type='button'
                                            className='list-accounts__item-delete'
                                            onClick={() => deleteAccount(account.idAccount, account.typeAccount)}
                                        >
                                            <svg className='icon'>
                                                <use xlinkHref={`${Icons}#icon-x`}></use>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                        ))
                    }
                </div>
            </div>

            <div className='options'>
                <button
                    className={`${typeAc === 1 && 'active'}`}
                    type='button'
                    onClick={() => setTypeAc(1)}
                >
                    Individual
                </button>
                <button
                    className={`${typeAc === 2 && 'active'}`}
                    type='button'
                    onClick={() => setTypeAc(2)}
                >
                    Grupal
                </button>
            </div>
            <article className='table__options'>
                <div className='search'>
                    <input
                        type="text"
                        value={textSearch}
                        className="inp__text-search"
                        onChange={({ target }) => setTextSearch(target.value)}
                        placeholder="Buscar..."
                    />
                </div>

                <button type='button' onClick={refetch} className='btn btn-header'>Actualizar</button>

            </article>

            <article className='table-content'>
                {
                    typeAc === 1
                        ?
                        <TableAccounts
                            showResults={3}
                            textSearch={textSearch}
                            addAccount={addAccount}
                        />
                        :
                        <TableGroups
                            showResults={3}
                            textSearch={textSearch}
                            addAccount={addAccount}
                        />
                }
            </article>

            <div className='form-steps'>
                <button type='submit' className='form-steps--save'>Next</button>
                {
                    (!!setStep)&&
                    <button type='button' onClick={() => setStep((step) => step - 1)} className='form-steps--back'>Atras</button>
                }
            </div>
        </form>
    )
}