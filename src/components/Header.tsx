import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import Icons from '../assets/icons.svg';
import { ipcRenderer } from 'electron'


export const Header = () => {

  const exitAPP = () => {
    ipcRenderer.send("exit")
  }
  const minimizeAPP = () => {
    ipcRenderer.send("minimeze")
  }
  const maximizeAPP = () => {
    ipcRenderer.send("maximize")
  }

  return (
    <>

      <main className='app'>
        <header className='header draggable'>
          <div className='header-menu'>
            <Link className="header-item" to={"/"}>Inicio</Link>
            <Link className="header-item" to={'/task'} >Tareas</Link>
            <Link className="header-item" to={"/report"}>Reportes</Link>
            <Link className="header-item" to={"/setting"}>Configuración</Link>
          </div>

          <div className='header-actions'>
            <svg className='icon header-item' onClick={minimizeAPP}>
              <use xlinkHref={`${Icons}#icon-minus`}></use>
            </svg>
            <svg className='icon header-item' onClick={maximizeAPP}>
              <use xlinkHref={`${Icons}#icon-square`}></use>
            </svg>
            <svg className='icon header-item' onClick={exitAPP}>
              <use xlinkHref={`${Icons}#icon-x`}></use>
            </svg>
          </div>
        </header>


        <div className='main'>
          <div className='container'>

            <Outlet />

          </div>
        </div>

      </main>
    </>
  )
}
