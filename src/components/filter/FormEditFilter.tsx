import React, { useEffect, useState } from 'react'
import { useFilter, useUpdateFilter } from '../../hooks/filter';
import { Progressbar } from '../Progressbar';
import { useFormik } from 'formik';
import { Events } from './Events';
import { FilterEvent } from '@/interfaces/ResponseHttp';
import { hanldeErrors } from '@/helpers/erros';


interface Props {
    show: boolean;
    idFilter: number;
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

export const FormEditFilter = ({ idFilter, setShow, show }: Props) => {

    const { data: filter, isLoading, isError, error } = useFilter(idFilter);
    const {mutate: updateFilter, isSuccess} = useUpdateFilter();
    const [step, setStep] = useState(0);

    const form = useFormik({
        initialValues:{
            name: filter?.name || '',
            showZone: filter?.showZone || false,
            showUser: filter?.showUser || false,
            exclude: filter?.exclude || false,
            isSpecial: filter?.isSpecial || false
        },
        validate: validateForm,
        onSubmit: () => {
            setStep((step) => step+1)
        },
        enableReinitialize: true
    })

    const hanldeSubmit = (filterEvents: Array<FilterEvent>) => {
        let data = {};
        Object.entries(form.values).forEach( dt => {
            //@ts-ignore
            if(filter[dt[0]] !== dt[1]){
                data = {...data, [dt[0]]: dt[1]};
            }  
        })
        if(JSON.stringify(filter?.filterEvents) !== JSON.stringify(filterEvents)){
            data = {...data, filterEvents}
        }
        
        updateFilter({
            idFilter,
            filter: data
        })

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
                keyi='editFilter-progress'
                options={['Basic', 'Eventos']}
                step={step}
            />
            {
                isLoading
                    ?
                    <p>Cargando</p>
                    :
                    isError
                        ?
                        <p>{hanldeErrors(error)}</p>
                        :
                        (step === 0)
                            ?
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
                            :
                            <Events
                                setStep={setStep}
                                filterEvents={filter!.filterEvents}
                                handleSubmit={hanldeSubmit}
                            />
            }
        </>
    )
}
