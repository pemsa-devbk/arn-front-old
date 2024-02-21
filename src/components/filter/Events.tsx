import React, { useState } from 'react'
import { useFormik } from 'formik';
import { FilterEvent } from '../../interfaces/ResponseHttp';
import Icons from '../../assets/icons.svg';
import { TableAlarms } from '../TableAlarms';
import { TableEvents } from '../TableEvents';
import { useAlarms, useEvents } from '@/hooks/monitoring';



interface Props {
    setStep: React.Dispatch<React.SetStateAction<number>>;
    filterEvents: Array<FilterEvent>;
    handleSubmit: (filterEvents: Array<FilterEvent>) => void;
}

const validateForm = (values: any) => {
    const errors = {};
    if (!values.filterEvents) {
        //@ts-ignore
        errors.filterEvents = 'Campo obligatorio';
    } else if (values.filterEvents.length === 0) {
        //@ts-ignore
        errors.filterEvents = 'Ingrese al menos una cuenta';
    }
    return errors;
}
export const Events = ({ filterEvents, handleSubmit, setStep }: Props) => {

    const { refetch: refetchAlarms } = useAlarms();
    const { refetch: refetchEvents } = useEvents();



    const [typeFl, setTypeFl] = useState(1);
    const [textSearch, setTextSearch] = useState('');


    const form = useFormik({
        initialValues: {
            filterEvents
        },
        validate: validateForm,
        onSubmit: (values) => {
            handleSubmit(values.filterEvents);
        },
        enableReinitialize: true
    })

    const addFilterEvent = (type: number, code: string) => {
        if (form.values.filterEvents.findIndex(filter => filter.code === code && filter.type === type) === -1) {
            form.setFieldValue('filterEvents', [...form.values.filterEvents, { type, code }]);
        }
    }

    const deleteFilter = (type: number, code: string) => {
        form.setFieldValue('filterEvents', [...form.values.filterEvents.filter(filter => !(filter.code === code && filter.type === type))])
    }

    const refetch = () => {
        refetchAlarms();
        refetchEvents();
    }


    return (
        <form className='form' onSubmit={form.handleSubmit}>
            <div className='form__container'>
                <label>Filtros:</label>
                {form.errors.filterEvents ? <div className='form-error'>{form.errors.filterEvents.toString()}</div> : null}
                <div className='list-accounts'>
                    {
                        form.values.filterEvents.map(filter => (
                            <div
                                key={`filter-event-${filter.code}`}
                                className='list-accounts__item'
                            >
                                <div className='list-accounts__item-container'>
                                    <p className='list-accounts__item-content'>
                                        {filter.code}
                                    </p>
                                    <button
                                        type='button'
                                        className='list-accounts__item-delete'
                                        onClick={() => deleteFilter(filter.type, filter.code)}
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
                    className={`${typeFl === 1 && 'active'}`}
                    type='button'
                    onClick={() => setTypeFl(1)}
                >
                    Alarma
                </button>
                <button
                    className={`${typeFl === 2 && 'active'}`}
                    type='button'
                    onClick={() => setTypeFl(2)}
                >
                    Evento
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
                    typeFl === 1
                        ?
                        <TableAlarms
                            showResults={3}
                            textSearch={textSearch}
                            addFilterEvent={addFilterEvent}
                        />
                        :
                        <TableEvents
                            showResults={3}
                            textSearch={textSearch}
                            addFilterEvent={addFilterEvent}
                        />
                }
            </article>
            <div className='form-steps'>
                <button type='submit' className='form-steps--save'>Next</button>
                <button type='button' onClick={() => setStep((step) => step - 1)} className='form-steps--back'>Atras</button>
            </div>
        </form>
    )
}
