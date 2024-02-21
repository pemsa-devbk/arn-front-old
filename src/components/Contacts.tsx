import React, { useState } from 'react'
import Icons from '../assets/icons.svg';
import { Contact } from '@/interfaces/ResponseHttp';
import { useFormik } from 'formik';
import { useAddContact, useContacts, useDeleteContact } from '@/hooks/general';
import { usePairContacts, useSyncContacts } from '../hooks/general';
import Swal from 'sweetalert2';

interface Props {
  idTask: string;
  typeTask: string;
}

export const Contacts = ({ idTask, typeTask }: Props) => {

  const { mutate: addContact } = useAddContact(typeTask);
  const { mutate: prContacts } = usePairContacts();
  const { mutate: syContacts } = useSyncContacts();


  const { mutate: removeContact, isSuccess } = useDeleteContact(typeTask);
  const { data: taskContact, isLoading: isLC, isError: isEC } = useContacts(idTask);

  const formContact = useFormik({
    initialValues: {
      contact: '',
      type: '1',
      alias: ''
    },
    onSubmit: (values) => {
      addContact({ idTask, contact: { ...values, type: Number(values.type) } });
    }
  });

  const deleteContact = (contact: Contact) => {
    removeContact({ idTask, contact: { type: contact.typeContact, contact: contact.contact } })
  }

  const pairContacts = () => {
    prContacts(idTask);
  }
  const syncContacts = () => {
    Swal.fire({
      title: 'Desea sincronizar los contactos',
      text: 'Se eliminaran los contactos que no se encuentren en Monitoring Works',
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        syContacts(idTask);     
      }
    })
  }

  const [type, setType] = useState(2);


  return (
    <>
      <div className='options'>
        <button
          className={`${type === 1 && 'active'}`}
          type='button'
          onClick={() => setType(1)}
        >
          Contactos
        </button>
        <button
          className={`${type === 2 && 'active'}`}
          type='button'
          onClick={() => setType(2)}
        >
          Nuevo contacto
        </button>
      </div>
      {
        (type === 1)
          ?
          <div className='contacts'>
            {
              isLC
                ?
                'Cargando...'
                :
                isEC
                  ?
                  'Error'
                  :
                  taskContact!.map(contact => (
                    <div className='contact' key={`${idTask}-${contact.contact}`}>
                      <button type='button' className='contact-close' onClick={() => deleteContact(contact)}>
                        <svg className='icon'>
                          <use xlinkHref={`${Icons}#icon-x`}></use>
                        </svg>
                      </button>
                      <p>
                        {
                          (contact.typeContact === 1)
                            ?
                            'Correo principal'
                            :
                            (contact.typeContact === 2)
                              ?
                              'Correo copia'
                              :
                              (contact.typeContact === 3)
                                ?
                                'Correo copia oculta'
                                :
                                (contact.typeContact === 4)
                                  ?
                                  'WhatsApp'
                                  :
                                  'Telegram'
                        }
                      </p>
                      <span>{contact.contact}</span>
                    </div>
                  ))
            }
          </div>
          :
          <form className='form' onSubmit={formContact.handleSubmit}>
            <div className='form__container'>
              <label htmlFor="">Identificador de contacto</label>
              <input
                name='contact'
                type={(Number(formContact.values.type) <= 3) ? 'email' : 'text'}
                onChange={formContact.handleChange}
              />
            </div>
            <div className='form__container'>
              <label htmlFor="">Tipo de contacto</label>
              <select name="type" id="" onChange={formContact.handleChange}>
                <option value="1">Correo principal</option>
                <option value="2">Correo copia</option>
                <option value="3">Correo copia oculta</option>
                <option value="5">Telegram</option>
                <option value="4">WhatsApp</option>
              </select>
            </div>
            <div className='form__container'>
              <label htmlFor="">Alias de contacto (opcional)</label>
              <input
                type="text"
                name='alias'
                onChange={formContact.handleChange}
              />
            </div>
            <div className='form__container'>
              <button type='submit' className='btn btn-text btn-header'>Guardar</button>
              <button type='button' className='btn btn-text btn-header' onClick={() => pairContacts()}>Adicionar MW</button>
              <button type='button' className='btn btn-text btn-header' onClick={() => syncContacts()}>Sincronizar MW</button>

            </div>
          </form>
      }


    </>
  )
}
