import React from 'react'
import { useField } from 'formik'

interface Props{
    children: any,
    name: string;
}
export const Switch = ({ children, ...props }: Props) => {

    const [field, meta] = useField({...props, type: 'checkbox'});
    return (
        <label className='switch'>
            <span  className="switch__span">Algo asi</span>
            <input className="switch__input" type="checkbox" {...field} {...props} />
            <i className="switch__icon"></i>
        </label>
    )
}
