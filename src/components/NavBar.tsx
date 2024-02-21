import React from 'react'
import { Link, LinkProps, Outlet, useMatch, useResolvedPath } from 'react-router-dom';
import Icons from '../assets/icons.svg';

interface Option {
    toEspecific: string;
    icon: string;
    text: string;
}

interface Props {
    title: string;
    options: Array<Option>;
}
export const NavBar = ({ title, options }: Props) => {

    return (
        <>
            <nav className='nav' aria-labelledby=''>

                <div className='nav__header'>
                    <h2 className='nav__header-title'>{title}</h2>
                </div>

                <ul className='side-nav'>
                    {
                        options.map((option, idx) => (
                            <ItemBar key={`NAV-${idx}`} to={`${option.toEspecific}`}>
                                <svg className='side-nav__icon'>
                                    <use xlinkHref={`${Icons}#icon-${option.icon}`}></use>
                                </svg>
                                <span>{option.text}</span>
                            </ItemBar>
                        ))
                    }

                </ul>
                <div className='nav__footer'>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

const ItemBar = ({ children, to, ...props }: LinkProps) => {    
    let resolved = useResolvedPath(to)
    let match = useMatch({ path: resolved.pathname, end: true })
    return (
        <li className={`side-nav__item ${match && 'side-nav__item--active'}`}>
            <Link to={to} className="side-nav__link">
                {children}
            </Link>
        </li>
    )
}
