import React, { useEffect, useState } from 'react'
import { Progressbar } from '../Progressbar';
import { useFormik } from 'formik';
import { Events } from './Events';
import { FilterEvent } from '../../interfaces/ResponseHttp';
import { useNewFilter } from '../../hooks/filter';


interface Props {
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
}


const validateForm = (values: any) => {
    const errors = {};
    if(!values.name){
        //@ts-ignore
        errors.name = 'Campo obligatorio'
    }
    return errors;
}

export const FormFilter = ({setShow}:Props) => {

    const [step, setStep] = useState(0);
    const {mutate: newFilter, isSuccess, reset, isLoading} = useNewFilter();

    const form = useFormik({
        initialValues:{
            name: '',
            showZone: false,
            showUser: false,
            exclude: false,
            isSpecial: false
        },
        validate: validateForm,
        onSubmit: () => {
            setStep((step) => step+1)
        }
    })

    const hanldeSubmit = (filterEvents: Array<FilterEvent>) => {
        if(!isLoading){
            newFilter({
                ...form.values,
                filterEvents
            });
        }
    }

    useEffect(() => {
        if (isSuccess) {
            reset();
            setStep(0);
            form.resetForm();
            setShow(false);
        }
    }, [isSuccess])

    return (
        <>
            <Progressbar
                keyi='newFilter-progress'
                options={['Basic', 'Eventos']}
                step={step}
            />

            {
                (step ===0) &&
                <form className='form' onSubmit={form.handleSubmit}>
                    <div className="form__container">
                        <label htmlFor="name" className='block'>Nombre</label>
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
                            <span className="switch__span">Mostrar zonas</span>
                            <input
                                className="switch__input"
                                type="checkbox"
                                name='showZone'
                                onChange={form.handleChange}
                                checked={form.values.showZone}
                            />
                            <i className="switch__icon"></i>
                        </label>
                    </div>
                    <div className='form__container'>
                        <label className="switch">
                            <span className="switch__span">Mostrar usuarios</span>
                            <input
                                className="switch__input"
                                type="checkbox"
                                name='showUser'
                                onChange={form.handleChange}
                                checked={form.values.showUser}
                            />
                            <i className="switch__icon"></i>
                        </label>
                    </div>
                    <div className='form__container'>
                        <label className="switch">
                            <span className="switch__span">Excluir eventos</span>
                            <input
                                className="switch__input"
                                type="checkbox"
                                name='exclude'
                                onChange={form.handleChange}
                                checked={form.values.exclude}
                            />
                            <i className="switch__icon"></i>
                        </label>
                    </div>
                    <div className='form__container'>
                        <label className="switch">
                            <span className="switch__span">Para reporte especial</span>
                            <input
                                className="switch__input"
                                type="checkbox"
                                name='isSpecial'
                                onChange={form.handleChange}
                                checked={form.values.isSpecial}
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
                (step === 1)&&
                <Events
                    setStep={setStep}
                    filterEvents={[]}
                    handleSubmit={hanldeSubmit}
                />
            }
        </>
    )
}
