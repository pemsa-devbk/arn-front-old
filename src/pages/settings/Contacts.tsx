import React, { useState } from 'react'
import { Table } from '@/components/contact/Table';
import { useContacts } from '@/hooks/contact';

export const Contacts = () => {
    const { refetch, isError } = useContacts();
    const [textSearch, setTextSearch] = useState('');
    const [showResults, setShowResults] = useState(5);
    return (
        <div className='view'>
            <section className='title-view'>
                <h2>Tareas globales</h2>

                <button className='btn-text btn-header' onClick={() => refetch()}>
                    Actualizar
                </button>
            </section>

            <section className='table-container content'>

                <article className='table__options'>
                    <div className='search'>
                        <input
                            type="text"
                            value={textSearch}
                            className="inp__text-search"
                            disabled={isError}
                            onChange={({ target }) => setTextSearch(target.value)}
                            placeholder="Buscar..."
                        />
                    </div>
                    <div>
                        <label>Número de resultados</label>
                        <select name="" id="" onChange={({ target }) => setShowResults(Number(target.value))}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                </article>

                <article className='table-content'>
                    <Table
                        showResults={showResults}
                        textSearch={textSearch}
                    />
                </article>
            </section>
        </div>
    )
}
