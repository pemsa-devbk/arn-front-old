import React, { useEffect, useState } from 'react'
import { Account } from '@/interfaces/ResponseHttp';
import { useFormik } from 'formik';
import { useUpdateTask } from '@/hooks/task-report';
import { Progressbar } from '../Progressbar';
import { Scheduled } from '../Scheduled';
import { TaskReport } from '../../interfaces/ResponseHttp';
import { Accounts } from '../Accounts';
import { useFilters } from '@/hooks/filter';
import { hanldeErrors } from '@/helpers/erros';

interface Props {
    show: boolean;
    task: TaskReport;
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

export const FormEditTask = ({ setShow, task, show }: Props) => {
    
    const { mutate: updateTask, isSuccess, isLoading: isLT } = useUpdateTask();
    const {data: filters, isLoading, isError, error} = useFilters();
    const [step, setStep] = useState(0);
    const [cron, setCron] = useState(task.cron);


    const formbasic = useFormik({
        initialValues: {
            name: task.name,
            ignoreEmpty: task.ignoreEmpty,
            withPartition: task.withPartition,
            reportTask: task.reportTask,
            isAccumulated: task.isAccumulated,
        },
        validate: validateFirstForm,
        onSubmit: (values) => {
            setStep((step) => step + 1)
        },
        enableReinitialize: true
    });

    const formReport = useFormik({
        initialValues: {
            idFilter: task.idFilter,
            comments: task.comments,
            format: task.format,
            isHorizontal: task.isHorizontal,
            withNames: task.withNames,
            startQuery: task.startQuery,
        },
        onSubmit: () => {
            setStep((step) => step + 1)
        },
        enableReinitialize: true
    })

    const handleSubmit = (accounts: Array<Account>, typeAccount: number) => {
        if(!isLT){
            let data = {};
            Object.entries(formbasic.values).forEach( dt => {
                //@ts-ignore
                if(task[dt[0]] !== dt[1]){
                    data = {...data, [dt[0]]: dt[1]};
                }  
            })
            Object.entries(formReport.values).forEach( dt => {
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
            console.log(data);
            
            
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
                options={['Basico', 'Reporte', 'Horario', 'Cuenta(s)']}
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
                                onChange={formbasic.handleChange}
                                checked={formbasic.values.withPartition}
                            />
                            <i className="switch__icon"></i>
                        </label>
                    </div>
                    <div className='form__container'>
                        <label className="switch">
                            <span className="switch__span">Reportar tarea</span>
                            <input
                                className="switch__input"
                                type="checkbox"
                                name='reportTask'
                                onChange={formbasic.handleChange}
                                checked={formbasic.values.reportTask}
                            />
                            <i className="switch__icon"></i>
                        </label>
                    </div>

                    <div className='form__container'>
                        <label className="switch">
                            <span className="switch__span">Acumulado del mes</span>
                            <input
                                className="switch__input"
                                type="checkbox"
                                name='isAccumulated'
                                onChange={formbasic.handleChange}
                                checked={formbasic.values.isAccumulated}
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
                <form className='form' onSubmit={formReport.handleSubmit}>
                    <div className='form__container'>
                        <label htmlFor="">Tipo de reporte</label>
                        <select name="idFilter" onChange={ ({target}) => formReport.setFieldValue('idFilter', Number(target.value))} value={formReport.values.idFilter}>
                            {
                                isLoading&&
                                <option defaultChecked value="X">Cargando...</option>
                            }
                            {
                                isError&&
                                <option defaultChecked value="X">{hanldeErrors(error)}</option>
                            }
                            {
                                <>
                                    <option value="x" defaultChecked>Seleccione una opcion</option>
                                    {
                                        filters?.filter(filter => !filter.isSpecial).map( filter => (
                                            <option key={`filter-edit-${filter.idFilter}`} value={filter.idFilter}>{filter.name}</option>
                                        ))
                                    }
                                </>
                            }

                        </select>
                    </div>

                    <div className='form__container'>
                        <label htmlFor="">Tipo de comentarios</label>
                        <select name="comments" onChange={ ({target}) => formReport.setFieldValue('comments', Number(target.value))} value={formReport.values.comments}>
                            <option value='0'>Sin comentarios</option>
                            <option value='1'>Comentarios PEMSA</option>
                            <option value='2'>Comentarios MK</option>
                            <option value='3'>Comentarios MW</option>
                        </select>
                    </div>

                    <div className='form__container'>
                        <label htmlFor="">Formato de envio</label>
                        <select name="format" onChange={formReport.handleChange} value={formReport.values.format}>
                            <option value="pdf">PDF</option>
                            <option value="xlsx">XLSX</option>
                        </select>
                    </div>
                    {
                        (formReport.values.idFilter === 1 && formReport.values.format === 'xlsx' && Number(formReport.values.comments) === 0) &&
                        <>
                            <div className='form__container'>
                                <label className="switch">
                                    <span className="switch__span">Horizontal</span>
                                    <input
                                        className="switch__input"
                                        type="checkbox"
                                        name='isHorizontal'
                                        onChange={formReport.handleChange}
                                        checked={formReport.values.isHorizontal}
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
                                        onChange={formReport.handleChange}
                                        checked={formReport.values.withNames}
                                    />
                                    <i className="switch__icon"></i>
                                </label>
                            </div>
                        </>
                    }
                    {
                        (!formbasic.values.isAccumulated) &&
                        <div className="form__container center-text">
                            <label htmlFor='startQuery' className='block'>Horario inicial de consulta</label>
                            <input
                                className='inp-time'
                                type="time"
                                name='startQuery'
                                onChange={formReport.handleChange}
                                value={formReport.values.startQuery}
                            />
                            {/* {formEveryday.errors.hour ? <div className='form-error'>{formEveryday.errors.hour}</div> : null} */}
                        </div>


                    }

                    <div className='form-steps'>
                        <button type='submit' className='form-steps--next'>Siguiente</button>
                        <button type='button' onClick={() => setStep((step) => step - 1)} className='form-steps--back'>Atras</button>
                    </div>

                </form>
            }
            {
                (step === 2) &&
                <Scheduled
                    options={[1, 2, 4]}
                    setCron={setCron}
                    setStep={setStep}
                    cron={task.cron}
                />
            }
            {
                (step === 3) &&
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
