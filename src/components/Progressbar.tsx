import React from 'react'

interface Props {
    options: Array<string>;
    step: number;
    keyi: string;
}
export const Progressbar = ({ options, step, keyi }: Props) => {
    return (
        <ul className='progressbar'>
            {
                options.map((option, idx) => (
                    <li key={`${keyi}-${idx}`} className={`progressbar-item ${(idx <= step) && 'active'}`}>
                        <span className='progressbar-item--icon'>{idx+1}</span>
                        <span className='progressbar-item--text'>{options[idx]}</span>
                    </li>
                ))
            }
        </ul>
    )
}
