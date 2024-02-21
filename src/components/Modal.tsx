import React, {useRef } from 'react';
import Icons from '../assets/icons.svg';

interface Props{
    title: string;
    children: JSX.Element | JSX.Element[];
    showModal: React.Dispatch<React.SetStateAction<boolean>>;
    show: boolean;
    subtitle: string;
}
export const Modal = ({title, children, showModal, show, subtitle}:Props) => {

    const ref = useRef<HTMLDivElement>(null);

    const closeModal = () => {
        showModal(false);
        ref.current?.classList.toggle('show-modal')
    }

    return (
        <div id='modal' ref={ref} className={`modal-container ${show&& 'show-modal'}`}>
            <div className='modal-shade'></div>
            <div className='modal small-modal'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h4 className='modal-title'>{title}</h4>
                        <p>{subtitle}</p>
                        <button className='close-modal' onClick={closeModal}>
                            <svg className='icon'>
                                <use xlinkHref={`${Icons}#icon-x`}></use>
                            </svg>
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}
