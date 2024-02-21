import React from 'react'
import { useAssignListReport, useUnassignListReport } from '../../hooks/contact';

interface Props {
    contact: {
        idContact: number,
        contact: string,
        typeContact: number,
        alias: string,
        isContactReport: boolean
    }
}

export const Row = ({ contact }: Props) => {
    const {mutate: add, isLoading: isLA} = useAssignListReport();
    const {mutate: remove, isLoading: isLR} = useUnassignListReport();
    return (
        <tr className='table__col-single' key={`contact-${contact.idContact}`}>
            <td className='table-text'>{contact.contact}</td>
            <td className='table-text'>{(contact.typeContact === 1) ? 'Correo' : (contact.typeContact === 4) ? 'WhatsApp' : 'Telegram'}</td>
            <td className='table-text'>{contact.alias ? contact.alias : 'Sin alias'}</td>
            <td>
                {
                    contact.isContactReport
                        ?
                        <button
                            className={`btn-text btn-table-state btn-table-state--active ${isLR && 'btn-block'}`}
                            onClick={() => remove(contact.idContact)}
                            disabled={isLR}
                        >
                            Inhabiltar
                        </button>
                        :
                        <button
                            className={`btn btn-text btn-table-state btn-table-state--inactive  ${isLA && 'btn-block'}`}
                            onClick={() => add(contact.idContact)}
                            disabled={isLA}
                        >
                            Habiltar
                        </button>
                }
            </td>
        </tr>
    )
}
