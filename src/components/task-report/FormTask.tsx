import React, { useEffect, useState } from 'react'
import { Account } from '@/interfaces/ResponseHttp';
import { useFormik } from 'formik';
import { useNewTask } from '@/hooks/task-report';
import { Progressbar } from '../Progressbar';
import { Scheduled } from '../Scheduled';
import { Accounts } from '../Accounts';
import { useFilters } from '../../hooks/filter';
import { hanldeErrors } from '@/helpers/erros';

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

const validateFormReport = (values: any) => {
    const errors = {};
    if (!values.idFilter) {
        //@ts-ignore
        errors.idFilter = 'Campo obligatorio';
    }else if(isNaN(Number(values.idFilter))){
        //@ts-ignore
        errors.idFilter = 'Tipo de reporte no valido';
    }

    return errors;
}


export const FormTask = ({ setShow }: Props) => {

    const { mutate: newTask, isSuccess, reset, isLoading: isLT } = useNewTask();
    const {data: filters, isLoading, isError, error} = useFilters();
    const [step, setStep] = useState(0);
    const [cron, setCron] = useState('');


    const formbasic = useFormik({
        initialValues: {
            name: '',
            ignoreEmpty: false,
            withPartition: false,
            reportTask: false,
            isAccumulated: false,
        },
        validate: validateFirstForm,
        onSubmit: (values) => {
            setStep((step) => step + 1)
        }
    });

    const formReport = useFormik({
        initialValues: {
            idFilter: 0,
            comments: 0,
            format: 'pdf',
            isHorizontal: false,
            withNames: false,
            startQuery: '00:00'
        },
        validate: validateFormReport,
        onSubmit: () => {
            setStep((step) => step + 1)
        }
    })

    const handleSubmit = (accounts: Array<Account>, typeAccount: number) => {
        if(!isLT){
            const data = {
                ...formReport.values,
                ...formbasic.values,
                cron,
                typeAccount,
                accounts
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
                                            <option key={`filter-${filter.idFilter}`} value={filter.idFilter}>{filter.name}</option>
                                        ))
                                    }
                                </>
                            }
                        </select>
                        {formReport.errors.idFilter ? <div className='form-error form-error--input'>{formReport.errors.idFilter}</div> : null}
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
                            <label htmlFor='hour' className='block'>Horario de envio</label>
                            <input
                                className='inp-time'
                                type="time"
                                name='hour'
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
                    cron={cron}
                />
            }
            {
                (step === 3) &&
                <Accounts 
                    accounts={[]}
                    handleSubmit={handleSubmit}
                    setStep={setStep}
                    typeAccount={0}
                />
            }

        </>

    )
}
