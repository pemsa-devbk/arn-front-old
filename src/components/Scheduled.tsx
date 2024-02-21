import React, { useEffect, useId, useState } from 'react'
import { useFormik } from 'formik';

interface Props {
    setCron: React.Dispatch<React.SetStateAction<string>>;
    cron: string;
    options: Array<number>;
    setStep: React.Dispatch<React.SetStateAction<number>>;
}

const validateEvery = (values: any) => {
    const errors = {};
    if (!values.hour) {
        //@ts-ignore
        errors.hour = 'Campo obligatorio';
    }
    return errors
}
const validateCustom = (values: any) => {
    const errors = {};
    if (values.days.length === 0) {
        //@ts-ignore
        errors.days = 'Seleccione al menos un día';
    }
    if (values.days.length === 7) {
        //@ts-ignore
        errors.days = 'Cambie la opcion a diario';
    }
    if (!values.hour) {
        //@ts-ignore
        errors.hour = 'Campo obligatorio';
    }
    return errors;
}
const validateTime = (values: any) => {
    const errors = {};
    if (!values.interval) {
        //@ts-ignore
        errors.interval = 'Campo obligatorio';
    } else if (values.interval < 1) {
        //@ts-ignore
        errors.interval = 'El intervalo no puede ser menos a 1';
    } else if (values.interval > 24) {
        //@ts-ignore
        errors.interval = 'El intervalo no puede ser mayor a 28';
    }
    if (!values.typeInterval) {
        //@ts-ignore
        errors.typeInterval = 'Campo obligatorio';
    }
    return errors;
}
const validateMounth = (values: any) => {
    const errors = {};
    if (!values.hour) {
        //@ts-ignore
        errors.hour = 'Campo obligatorio';
    }
    if (!values.day) {
        //@ts-ignore
        errors.day = 'Campo obligatorio';
    }
    return errors;
}


export const Scheduled = ({ options, setCron, setStep, cron }: Props) => {
    const [typeShceduled, setTypeShceduled] = useState(1);
    const formTimeId = useId();
    const formEveryId = useId();
    const formCustomId = useId();
    const formMounthId = useId();

    const formTime = useFormik({
        initialValues: {
            interval: 1,
            typeInterval: 'HRS'
        },
        validate: validateTime,
        onSubmit: (values) => {
            if (values.typeInterval === 'HRS') {
                const cron = `0 */${values.interval} * * *`;
                setCron(cron);
            } else {
                const cron = `*/${values.interval} * * * *`;
                setCron(cron);
            }
            setStep( (step) => step + 1);
        },
    });
    const formEveryday = useFormik({
        initialValues: {
            hour: ''
        },
        validate: validateEvery,
        onSubmit: (values) => {
            const [hr, mn] = values.hour.split(':');
            const cron = `${mn} ${hr} * * *`;
            setCron(cron);
            setStep( (step) => step + 1);
        },
    });
    const formCustonDay = useFormik({
        initialValues: {
            hour: '',
            days: [] as Array<string>
        },
        validate: validateCustom,
        onSubmit: (values) => {
            console.log(values);
            
            const [hr, mn] = values.hour.split(':');
            const cron = `${mn} ${hr} * * ${values.days.sort()}`;
            setCron(cron);
            setStep( (step) => step + 1);
        },
    });
    const formMounth = useFormik({
        initialValues: {
            hour: '',
            day: 1
        },
        validate: validateMounth,
        onSubmit: (values) => {
            const [hr, mn] = values.hour.split(':');
            const cron = `${mn} ${hr} ${values.day} * *`;
            setCron(cron);
            setStep( (step) => step + 1);
        },
    });
    

    useEffect(() => {
        if(cron){                        
            const [mn, hr, dm, , dw] = cron.split(' ');
            
            if(mn.includes('/')){
                setTypeShceduled( () => 3);
                formTime.setFieldValue('interval',mn.split('/')[1]);
                formTime.setFieldValue('typeInterval','MIN');
            }else if(hr.includes('/')){
                setTypeShceduled( () => 3);
                formTime.setFieldValue('interval',hr.split('/')[1]);
                formTime.setFieldValue('typeInterval','HRS');
            }else if(dm !== '*'){
                formMounth.setFieldValue('hour',`${hr}:${mn}`);
                formMounth.setFieldValue('day', dm);
                setTypeShceduled( () => 4);
            }else if(dw !== '*'){
                setTypeShceduled( () => 2);
                formCustonDay.setFieldValue('hour', `${hr}:${mn}`);
                formCustonDay.setFieldValue('days', dw.split(','));
            }else if(!mn.includes('/') && !hr.includes('/')){
                setTypeShceduled( () => 1);
                formEveryday.setFieldValue('hour',`${hr}:${mn}`);
            }
        }
    }, [cron]);

    return (
        <>
            <div className='options'>
                {
                    options.includes(1) &&
                    <button
                        className={`${typeShceduled === 1 && 'active'}`}
                        type='button'
                        onClick={() => setTypeShceduled(1)}
                    >
                        Diario
                    </button>
                }
                {
                    options.includes(2) &&
                    <button
                        className={`${typeShceduled === 2 && 'active'}`}
                        type='button'
                        onClick={() => setTypeShceduled(2)}
                    >
                        Personalizado
                    </button>
                }
                {
                    options.includes(3) &&
                    <button
                        className={`${typeShceduled === 3 && 'active'}`}
                        type='button'
                        onClick={() => setTypeShceduled(3)}
                    >
                        Cada N tiempo
                    </button>
                }
                {
                    options.includes(4) &&
                    <button
                        className={`${typeShceduled === 4 && 'active'}`}
                        type='button'
                        onClick={() => setTypeShceduled(4)}
                    >
                        Mensual
                    </button>
                }
            </div>
            {
                (typeShceduled === 1) &&
                <form className='form' onSubmit={formEveryday.handleSubmit}>
                    <div className="form__container center-text">
                        <label htmlFor={formEveryId + '-hour'} className='block' >Horario de envio</label>
                        <input
                            className='inp-time'
                            type="time"
                            id={formEveryId + '-hour'}
                            name='hour'
                            onChange={formEveryday.handleChange}
                            value={formEveryday.values.hour}
                        />
                        {formEveryday.errors.hour ? <div className='form-error'>{formEveryday.errors.hour}</div> : null}
                    </div>
                    <div className='form-steps'>
                        <button type='submit' className='form-steps--next'>Siguiente</button>
                        <button type='button' onClick={() => setStep((step) => step -1)} className='form-steps--back'>Atras</button>
                    </div>
                </form>
            }
            {
                (typeShceduled === 2) &&
                <form className='form' onSubmit={formCustonDay.handleSubmit}>
                    <div className="form__container center-text">
                        <label htmlFor={formCustomId + '-hour'} className='block' >Horario de envio</label>
                        <input
                            className='inp-time'
                            type="time"
                            name='hour'
                            id={formCustomId + '-hour'}
                            onChange={formCustonDay.handleChange}
                            value={formCustonDay.values.hour}
                        />
                        {formCustonDay.errors.hour ? <div className='form-error'>{formCustonDay.errors.hour}</div> : null}
                    </div>
                    <div className='form__container'>
                        <label htmlFor="" className='block'>Dias a ejecutar</label>
                        {formCustonDay.errors.days ? <div className='form-error'>{formCustonDay.errors.days}</div> : null}

                        <div className='form__days'>
                            <div className="checkbox">
                                <label className="checkbox__item">
                                    <input
                                        type="checkbox"
                                        name='days'
                                        value={1}
                                        onChange={formCustonDay.handleChange}
                                        checked={formCustonDay.values.days.includes('1')}
                                    />
                                    <div className="checkbox__checkmark"></div>
                                    <div className="checkbox__body">Lunes</div>
                                </label>
                            </div>
                            <div className="checkbox">
                                <label className="checkbox__item">
                                    <input
                                        type="checkbox"
                                        name='days'
                                        value={2}
                                        onChange={formCustonDay.handleChange}
                                        checked={formCustonDay.values.days.includes('2')}
                                    />
                                    <div className="checkbox__checkmark"></div>
                                    <div className="checkbox__body">Martes</div>
                                </label>
                            </div>

                            <div className="checkbox">
                                <label className="checkbox__item">
                                    <input
                                        type="checkbox"
                                        name='days'
                                        value={3}
                                        onChange={formCustonDay.handleChange}
                                        checked={formCustonDay.values.days.includes('3')}
                                    />
                                    <div className="checkbox__checkmark"></div>
                                    <div className="checkbox__body">Miercoles</div>
                                </label>
                            </div>
                        </div>
                        <div className='form__days'>
                            <div className="checkbox">
                                <label className="checkbox__item">
                                    <input
                                        type="checkbox"
                                        name='days'
                                        value={4}
                                        onChange={formCustonDay.handleChange}
                                        checked={formCustonDay.values.days.includes('4')}
                                    />
                                    <div className="checkbox__checkmark"></div>
                                    <div className="checkbox__body">Jueves</div>
                                </label>
                            </div>
                            <div className="checkbox">
                                <label className="checkbox__item">
                                    <input
                                        type="checkbox"
                                        name='days'
                                        value={5}
                                        onChange={formCustonDay.handleChange}
                                        checked={formCustonDay.values.days.includes('5')}
                                    />
                                    <div className="checkbox__checkmark"></div>
                                    <div className="checkbox__body">Viernes</div>
                                </label>
                            </div>
                            <div className="checkbox">
                                <label className="checkbox__item">
                                    <input
                                        type="checkbox"
                                        name='days'
                                        value={6}
                                        onChange={formCustonDay.handleChange}
                                        checked={formCustonDay.values.days.includes('6')}
                                    />
                                    <div className="checkbox__checkmark"></div>
                                    <div className="checkbox__body">Sabado</div>
                                </label>
                            </div>
                        </div>
                        <div className="form__days">
                            <div className="checkbox">
                                <label className="checkbox__item">
                                    <input
                                        type="checkbox"
                                        name='days'
                                        value={0}
                                        onChange={formCustonDay.handleChange}
                                        checked={formCustonDay.values.days.includes('0')}
                                    />
                                    <div className="checkbox__checkmark"></div>
                                    <div className="checkbox__body">Domingo</div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='form-steps'>
                        <button type='submit' className='form-steps--next'>Siguiente</button>
                        <button type='button' onClick={() => setStep((step) => step -1)} className='form-steps--back'>Atras</button>
                    </div>
                </form>
            }
            {
                (typeShceduled === 3) &&
                <form className='form' onSubmit={formTime.handleSubmit}>
                    <div className='form__container'>
                        <label htmlFor={formTimeId + 'interval'} className='block'>Ingrese el intervalo de ejecución</label>
                        <div className="inp-slc">
                            <input
                                type="number"
                                id={formTimeId + 'interval'}
                                name='interval'
                                onChange={formTime.handleChange}
                                value={formTime.values.interval}
                                min={1}
                                max={24}
                            />
                            <select name="typeInterval" value={formTime.values.typeInterval} onChange={formTime.handleChange}>
                                <option value="MIN">Minutos</option>
                                <option value="HRS">Horas</option>
                            </select>
                        </div>
                    </div>
                    <div className='form-steps'>
                        <button type='submit' className='form-steps--next'>Siguiente</button>
                        <button type='button' onClick={() => setStep((step) => step -1)} className='form-steps--back'>Atras</button>
                    </div>
                </form>
            }
            {
                (typeShceduled === 4) &&
                <form onSubmit={formMounth.handleSubmit} className="form">
                    <div className="form__container center-text">
                        <label htmlFor={`${formMounthId}-lbl`} className='block' >Horario de envio</label>
                        <input
                            className='inp-time'
                            type="time"
                            id={`${formCustomId}-lbl`}
                            name='hour'
                            onChange={formMounth.handleChange}
                            value={formMounth.values.hour}
                        />
                        {formMounth.errors.hour ? <div className='form-error'>{formMounth.errors.hour}</div> : null}

                    </div>
                    <div className='form__container'>
                        <label htmlFor={`${formMounthId}-day`} className='block'>Día de ejecución</label>
                        <input
                            type="number"
                            id={`${formMounthId}-day`}
                            name='day'
                            onChange={formMounth.handleChange}
                            value={formMounth.values.day}
                            min={1}
                            max={28}
                        />
                        {formMounth.errors.day ? <div className='form-error form-error--input'>{formMounth.errors.day}</div> : null}

                    </div>
                    <div className='form-steps'>
                        <button type='submit' className='form-steps--next'>Siguiente</button>
                        <button type='button' onClick={() => setStep((step) => step -1)} className='form-steps--back'>Atras</button>
                    </div>
                </form>
            }

        </>
    )
}
