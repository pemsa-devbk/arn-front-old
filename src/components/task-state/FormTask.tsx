import React, { useEffect, useState } from 'react'
import { Account } from '@/interfaces/ResponseHttp';
import { useFormik } from 'formik';
import { useNewTask } from '@/hooks/task-state';
import { Progressbar } from '../Progressbar';
import { Scheduled } from '../Scheduled';
import { Accounts } from '../Accounts';

interface Props {
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const validateFirstForm = (values: any) => {
    const errors = {};
    if (!values.name) {
        //@ts-ignore
        errors.name = 'Campo obligatorio';
    }

    return errors;
}

export const FormTask = ({ setShow }: Props) => {

    const { mutate: newTask, isSuccess, reset, isLoading } = useNewTask();
    const [step, setStep] = useState(0);
    const [cron, setCron] = useState('');


    const formbasic = useFormik({
        initialValues: {
            name: '',
            ignoreEmpty: false,
            reportClose: false,
            reportOpen: false,
            bodyMessage: false,
            fileMessage: false,
        },
        validate: validateFirstForm,
        onSubmit: (values) => {
            setStep((step) => step + 1)
        }
    });

    const handleSubmit = ( accounts: Array<Account>, typeAccount: number) => {
        if(!isLoading){
            const data = {
                ...formbasic.values,
                cron,
                accounts,
                typeAccount
            }
            newTask(data);
        }
    }

    useEffect(() => {
        if (isSuccess) {
            reset();
            setCron('');
            setStep(0);
            formbasic.resetForm();
            setShow(false);
        }
    }, [isSuccess])

    return (
        <>
            <Progressbar
                keyi='newtaskState-progress'
                options={['Basico', 'Horario', 'Cuenta(s)']}
                step={step}
            />
            {
                (step === 0) &&
                <form className='form' onSubmit={formbasic.handleSubmit}>
                    <div className="form__container">
                        <label htmlFor="name" className='block'>Nombre</label>
                        <input
                            type="text"
                            id='name'
                            name='name'
                            onChange={formbasic.handleChange}
                            value={formbasic.values.name}
                        />
                        {formbasic.errors.name ? <div className='form-error form-error--input'>{formbasic.errors.name}</div> : null}
                    </div>

                    <div className='form__container'>
                        <label className="switch">
                            <span className="switch__span">Ignorar sucursales sin eventos</span>
                            <input
                                className="switch__input"
                                type="checkbox"
                                name='ignoreEmpty'
                                onChange={formbasic.handleChange}
                                checked={formbasic.values.ignoreEmpty}
                            // value={formbasic.values.ignoreEmpty}
                            />
                            <i className="switch__icon"></i>
                        </label>
                    </div>
                    <div className='form__container'>
                        <label className="switch">
                            <span className="switch__span">Reportar susursales abiertas</span>
                            <input
                                className="switch__input"
                                type="checkbox"
                                name='reportOpen'
                                onChange={formbasic.handleChange}
                                checked={formbasic.values.reportOpen}
                            />
                            <i className="switch__icon"></i>
                        </label>
                    </div>
                    <div className='form__container'>
                        <label className="switch">
                            <span className="switch__span">Reportar sucursales cerradas</span>
                            <input
                                className="switch__input"
                                type="checkbox"
                                name='reportClose'
                                onChange={formbasic.handleChange}
                                checked={formbasic.values.reportClose}
                            />
                            <i className="switch__icon"></i>
                        </label>
                    </div>
                    <div className='form__container'>
                        <label className="switch">
                            <span className="switch__span">Enviar archivo adjunto</span>
                            <input
                                className="switch__input"
                                type="checkbox"
                                name='fileMessage'
                                onChange={formbasic.handleChange}
                                checked={formbasic.values.fileMessage}
                            />
                            <i className="switch__icon"></i>
                        </label>
                    </div>
                    <div className='form__container'>
                        <label className="switch">
                            <span className="switch__span">Enviar datos en el cuerpo</span>
                            <input
                                className="switch__input"
                                type="checkbox"
                                name='bodyMessage'
                                onChange={formbasic.handleChange}
                                checked={formbasic.values.bodyMessage}
                            />
                            <i className="switch__icon"></i>
                        </label>
                    </div>
                    <div className='form-steps'>
                        <button type='submit' className='form-steps--next'>Siguiente</button>
                    </div>
                </form>
            }
            {
                (step === 1) &&
                <Scheduled
                    options={[1, 2, 3]}
                    setCron={setCron}
                    setStep={setStep}
                    cron={cron}
                />
            }
            {
                (step === 2) &&
                <Accounts
                    setStep={setStep}
                    accounts={[]}
                    handleSubmit={handleSubmit}
                    typeAccount={0}
                />
            }
        </>

    )
}
