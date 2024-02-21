import React, { useEffect, useState } from 'react'
import { Account, TaskState } from '@/interfaces/ResponseHttp';
import { useFormik } from 'formik';
import { useUpdateTask } from '@/hooks/task-state';
import { Progressbar } from '../Progressbar';
import { Scheduled } from '../Scheduled';
import { Accounts } from '../Accounts';


interface Props {
    show: boolean;
    task: TaskState;
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

export const FormEditTask = ({ task, show, setShow }: Props) => {

    const { mutate: updateTask, isSuccess, isLoading } = useUpdateTask();
    const [step, setStep] = useState(0);
    const [cron, setCron] = useState(task.cron);

    const formbasic = useFormik({
        initialValues: {
            name: task.name,
            ignoreEmpty: task.ignoreEmpty,
            reportClose: task.reportClose,
            reportOpen: task.reportOpen,
            bodyMessage: task.bodyMessage,
            fileMessage: task.fileMessage,
        },
        validate: validateFirstForm,
        onSubmit: (values) => {
            setStep((step) => step + 1)
        },
        enableReinitialize: true
    });

    useEffect(() => {
        if (isSuccess) {
            setStep(0);
            setShow(false);
        }
    }, [isSuccess])

    useEffect(() => {
        if (show)
            setStep(0);
    }, [show])

    const hanldeSubmit = (accounts: Array<Account>, typeAccount: number) => {
        if (!isLoading) {
            let data = {};
            Object.entries(formbasic.values).forEach(dt => {
                //@ts-ignore
                if (task[dt[0]] !== dt[1]) {
                    data = { ...data, [dt[0]]: dt[1] };
                }
            })
            if (task.cron !== cron) {
                data = { ...data, cron };
            }
            if (task.typeAccount !== typeAccount) {
                data = { ...data, typeAccount, accounts };
            } else {
                if (JSON.stringify(task.accounts) !== JSON.stringify(accounts)) {
                    data = { ...data, accounts }
                }
            }
            updateTask({ idtask: task.idTask, task: data });
        }
    }

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
                    cron={task.cron}
                />
            }
            {
                (step === 2) &&
                <Accounts
                    setStep={setStep}
                    accounts={task.accounts}
                    handleSubmit={hanldeSubmit}
                    typeAccount={task.typeAccount}
                />

            }

        </>
    )
}
