import React, { useEffect, useState } from 'react'
import { useContacts } from '@/hooks/contact'
import { hanldeErrors } from '@/helpers/erros';
import { Pagination } from '../Pagination';
import { Row } from './Row';

interface Props {
    textSearch: string;
    showResults: number;
}

export const Table = ({showResults, textSearch}:Props) => {
    const { data, isLoading, isError, error } = useContacts();

    const filterName = (contact: any) => {
        return contact.contact.toLowerCase().includes(textSearch.toLowerCase());
    }

    const filterIsContact = (contact: any) => {
        if(contact.isContactReport){
            return 'report'.includes(textSearch.toLowerCase());
        }
        return 'normal'.includes(textSearch.toLowerCase());
    }

    const filterType = (contact: any) => {
        if(contact.typeContact === 1){
            return 'correo'.includes(textSearch.toLowerCase());
        }else if(contact.typeContact === 4){
            return 'whatsapp'.includes(textSearch.toLowerCase());
        }
        return 'telegram'.includes(textSearch.toLowerCase());
    }

    const [pager, setPager] = useState(1);


    useEffect(() => {
      setPager(1);
    }, [textSearch])
    

  

    return (
        <table className='table task-color'>
            <thead>
                <tr>
                    <th className='table-head'>Contacto</th>
                    <th className='table-head'>Tipo de contacto</th>
                    <th className='table-head'>alias</th>
                    <th className='table-head'>Contacto a reportar</th>
                </tr>
            </thead>
            <tbody className='table-task'>
                {
                    isLoading ?
                        <tr>
                            <td className='text-center' colSpan={10}>Loading...</td>
                        </tr>
                        :
                        isError
                            ?
                            <tr>
                                <td className='text-center' colSpan={10}>{hanldeErrors(error)}</td>
                            </tr>
                            :
                            data!.filter((contact) => filterName(contact) || filterIsContact(contact) || filterType(contact)).slice(((pager - 1) * showResults), pager * showResults).map(contact => (
                                <Row 
                                    contact={contact}
                                />
                            ))
                }
            </tbody>
            <Pagination
                elements={
                    (error || isLoading)
                        ?
                        0
                        :
                        data!.filter((contact) => filterName(contact) || filterIsContact(contact) || filterType(contact)).length
                }
                page={pager}
                setPager={setPager}
                showResults={showResults}
            />
        </table>
    )
}
