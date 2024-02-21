import React from 'react'
import { hanldeErrors } from '@/helpers/erros';
import { useNavigate, useParams } from 'react-router-dom';
import { useFiles, useResendFile } from '../../hooks/general';
import axios from 'axios';
import Swal from 'sweetalert2';
import Icons from '../../assets/icons.svg';


export const Files = () => {

    const navigate = useNavigate();
    const { id, name } = useParams<{ id: string, name: string }>();
    const { data, isLoading, isError, error, refetch } = useFiles(id!);
    const {mutate} = useResendFile();

    const downloadFile = (file: string) => {
        axios({
            url: `https://arn.pem-sa.com.mx/general/doc-task/${id}/${file}`,
            method: 'GET',
            responseType: 'blob'
        })
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', file);
                document.body.appendChild(link);
                link.click();
            })
            .catch(err => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al descargar el archivo',
                })
            })
    }

    const resendFile = (file: string) => {
        mutate({idTask: id!, file})
    }

    return (
        <div className='view'>
            <section className='title-view'>
                <h2>Documentos de la tarea {name}</h2>
                <button className='btn-text btn-header' onClick={() => refetch()}>
                    Actualizar
                </button>
                <button className='btn-text btn-header' onClick={() => navigate(-1)}>
                    Atras
                </button>
            </section>
            {
                isLoading &&
                <p>cargando</p>
            }
            {
                isError &&
                <p>{hanldeErrors(error)}</p>
            }
            {
                data
                    ?
                    (data.length === 0)
                        ?
                        <p>Not files</p>
                        :
                        <div className='card-container'>
                            {
                                data.map(file => (
                                    <div className='card' key={`${id}-${file}`}>
                                        <div className='card__header'>
                                            <svg className='icon'>
                                                <use xlinkHref={`${Icons}#icon-file-${(file.split('.')[1] === 'pdf') ? 'pdf' : (file.split('.')[1] === 'xlsx') ? 'xlsx' : 'png'}`}></use>
                                            </svg>
                                        </div>
                                        <div className='card__body'>
                                            <p>{file.split('.')[0]}</p>
                                        </div>
                                        <div className='card__foother'>
                                            <button 
                                                className='btn btn-card' 
                                                onClick={() => downloadFile(file)}
                                            >
                                                Descargar
                                            </button>
                                            <button 
                                                className='btn btn-card' 
                                                onClick={() => resendFile(file)}
                                            >
                                                Reenviar
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    :
                    <p>Error data</p>
            }
        </div>
    )
}
