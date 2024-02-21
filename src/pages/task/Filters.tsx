import React, { useState } from 'react'
import { useFilters } from '@/hooks/filter'
import { Table } from '@/components/filter/Table';
import { Filter } from '@/interfaces/ResponseHttp';
import { Modal } from '@/components/Modal';
import { FilterWithEvents } from '../../interfaces/ResponseHttp';
import { FormFilter } from '@/components/filter/FormFilter';
import { FormEditFilter } from '@/components/filter/FormEditFilter';

export const Filters = () => {

    const { isError, refetch } = useFilters();
    const [showModalNew, setShowModalNew] = useState(false);
    const [textSearch, setTextSearch] = useState('');
    const [showResults, setShowResults] = useState(5);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalView, setShowModalView] = useState(false);
    const [filterActive, setFilterActive] = useState({
        name: '',
        idFilter: 0
    });

    const openModalEdit = (idFilter: number, name: string) => {
        setFilterActive({idFilter, name});
        setShowModalEdit(() => true);
    }

    const openModalView = (idFilter: number, name: string) => {
        // setTaskActive(task);
        setShowModalView(() => true);
    }

    return (
        <div className='view'>

            <Modal title='Nuevo Filtro' showModal={setShowModalNew} show={showModalNew} subtitle='RELLENE TODOS LOS CAMPOS PARA IR AL SIGUIENTE PASO'>
                <FormFilter
                    setShow={setShowModalNew}
                />
            </Modal>

            <Modal
                title={`Editar ${filterActive.name}`}
                showModal={setShowModalEdit}
                show={showModalEdit}
                subtitle='RELLENE TODOS LOS CAMPOS PARA IR AL SIGUIENTE PASO'
            >
                <FormEditFilter
                    idFilter={filterActive.idFilter}
                    show={showModalEdit}
                    setShow={setShowModalEdit}
                />
            </Modal>


            <section className='title-view'>
                <h2>Filtros de eventos</h2>
                <button className='btn-text btn-header' onClick={() => setShowModalNew(true)}>
                    Nuevo filtro
                </button>
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
                        textSearch={textSearch}
                        showResults={showResults}
                        openModalEdit={openModalEdit}
                        openModalView={openModalView}
                    />
                </article>
            </section>
        </div>
    )
}
