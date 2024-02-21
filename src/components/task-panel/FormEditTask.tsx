import React, { useEffect, useState } from 'react'
import { Account } from '@/interfaces/ResponseHttp';
import { useFormik } from 'formik';
import { useUpdateTask } from '@/hooks/task-panel';
import { Progressbar } from '../Progressbar';
import { Scheduled } from '../Scheduled';
import { TaskPSS } from '../../interfaces/ResponseHttp';
import { Accounts } from '../Accounts';

interface Props {
    show: boolean;
    task: TaskPSS;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const validateFirstForm = (values: any) => {
    const errors = {};
    if (!values.name) {
        //@ts-ignore
        errors.name = 'Campo obligatorio';
    }
    if(values.typePss === 1){
        if(!values.timeBatery ){
            //@ts-ignore
            errors.timeBatery = 'Campo obligatorio';
        }else if(values.timeBatery <= 0){
            //@ts-ignore
            errors.timeBatery = 'Tiempo de batería no valido';
        }
        if(!values.timeLastTest){
            //@ts-ignore
            errors.timeLastTest = 'Campo obligatorio';
        }else if(values.timeLastTest <= 0){
            //@ts-ignore
            errors.timeLastTest = 'Tiempo de batería no valido';
        }
    }

    if(values.typePss === 2){
        if(!values.timeCa){
            //@ts-ignore
            errors.timeCa = 'Campo obligatorio';
        }else if(values.timeCa <= 0){
            //@ts-ignore
            errors.timeCa = 'Tiempo de batería no valido';
        }

    }

    return errors;
}

export const FormEditTask = ({ setShow, task, show }: Props) => {
    
    const { mutate: updateTask, isSuccess, isLoading } = useUpdateTask();
    const [step, setStep] = useState(0);
    const [cron, setCron] = useState(task.cron);


    const formbasic = useFormik({
        initialValues: {
            name: task.name,
            ignoreEmpty: task.ignoreEmpty,
            typePss: task.typePss,
            timeBatery: task.timeBatery ? task.timeBatery : 0,
            typeTimeBatery: task.timeBatery ? task.typeTimeBatery : 'DYS',
            timeCa: task.timeCa ? task.timeCa : 0,
            typeTimeCa: task.timeCa ? task.typeTimeCa : 'DYS',
            timeLastTest: task.timeLastTest ? task.timeLastTest : 0,
            typeTimeLastTest: task.timeLastTest ? task.typeTimeLastTest : 'DYS',
            bodyMessage: task.bodyMessage,
            fileMessage: task.fileMessage,
        },
        validate: validateFirstForm,
        onSubmit: (values) => {
            setStep((step) => step + 1)
        },
        enableReinitialize: true
    });

    const handleSubmit = (accounts: Array<Account>, typeAccount: number) => {
        if(!isLoading){
            let data = {};
            Object.entries(formbasic.values).forEach( dt => {
                //@ts-ignore
                if(task[dt[0]] !== dt[1]){
                    data = {...data, [dt[0]]: dt[1]};
                }  
            })
            if(task.cron !== cron){
                data = {...data, cron};
            }
            if(task.typeAccount !== typeAccount){
                data = {...data, typeAccount, accounts};
            }else{
                if(JSON.stringify(task.accounts) !== JSON.stringify(accounts)){
                    data = {...data, accounts}
                }
            }   
            updateTask({idtask: task.idTask, task: data})
        }
    }

    useEffect(() => {
        if (isSuccess) {
            setStep(0);
            setShow(false);
        }
    }, [isSuccess])

    useEffect( () => {
        if(show)
            setStep(0);
    },[show]) 

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
                        <label htmlFor="">Tipo</label>
                        <div className='options'>
                            <button
                                className={`${formbasic.values.typePss === 1 && 'active'}`}
                                type='button'
                                onClick={() => formbasic.setFieldValue('typePss', 1)}
                            >
                                Panel sin señal
                            </button>
                            <button
                                className={`${formbasic.values.typePss === 2 && 'active'}`}
                                type='button'
                                onClick={() => formbasic.setFieldValue('typePss', 2)}
                            >
                                Estado del panel
                            </button>
                        </div>
                    </div>

                    {
                        (formbasic.values.typePss === 1)
                            ?
                            <>
                                <div className="form__container">
                                    <label htmlFor="name" className='block'>Tiempo Bateria</label>
                                    <div className="inp-slc">
                                        <input
                                            type="number"
                                            name='timeBatery'
                                            onChange={formbasic.handleChange}
                                            value={formbasic.values.timeBatery}
                                            min={1}
                                            max={60}
                                        />
                                        <select name="typeTimeBatery" value={formbasic.values.typeTimeBatery} onChange={formbasic.handleChange}>
                                            <option value="HRS">Horas</option>
                                            <option value="DYS">Días</option>
                                        </select>
                                    </div>
                                    {formbasic.errors.timeBatery ? <div className='form-error form-error--input'>{formbasic.errors.timeBatery}</div> : null}
                                </div>
                                <div className="form__container">
                                    <label htmlFor="name" className='block'>Tiempo Ultimo test</label>
                                    <div className="inp-slc">
                                        <input
                                            type="number"
                                            name='timeLastTest'
                                            onChange={formbasic.handleChange}
                                            value={formbasic.values.timeLastTest}
                                            min={1}
                                            max={60}
                                        />
                                        <select name="typeTimeLastTest" value={formbasic.values.typeTimeLastTest} onChange={formbasic.handleChange}>
                                            <option value="HRS">Horas</option>
                                            <option value="DYS">Días</option>
                                        </select>
                                    </div>
                                    {formbasic.errors.timeLastTest ? <div className='form-error form-error--input'>{formbasic.errors.timeLastTest}</div> : null}
                                </div>
                            </>
                            :
                            <div className="form__container">
                                <label htmlFor="name" className='block'>Tiempo falla de corriente</label>
                                <div className="inp-slc">
                                    <input
                                        type="number"
                                        name='timeCa'
                                        onChange={formbasic.handleChange}
                                        value={formbasic.values.timeCa}
                                        min={1}
                                        max={60}
                                    />
                                    <select name="typeTimeCa" value={formbasic.values.typeTimeCa} onChange={formbasic.handleChange}>
                                        <option value="HRS">Horas</option>
                                        <option value="DYS">Días</option>
                                    </select>
                                </div>
                                {formbasic.errors.timeCa ? <div className='form-error form-error--input'>{formbasic.errors.timeCa}</div> : null}
                            </div>
                    }

                    <div className='form__container'>
                        <label className="switch">
                            <span className="switch__span">Ignorar sucursales sin eventos</span>
                            <input
                                className="switch__input"
                                type="checkbox"
                                name='ignoreEmpty'
                                onChange={formbasic.handleChange}
                                checked={formbasic.values.ignoreEmpty}
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
                    options={[1, 3]}
                    setCron={setCron}
                    setStep={setStep}
                    cron={task.cron}
                />
            }
            {
                (step === 2) &&
                <Accounts 
                    accounts={task.accounts}
                    handleSubmit={handleSubmit}
                    setStep={setStep}
                    typeAccount={task.typeAccount}
                />
            }

        </>

    )
}
