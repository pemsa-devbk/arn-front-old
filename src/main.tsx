import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'sweetalert2/src/sweetalert2.scss'
import 'react-toastify/dist/ReactToastify.css'
import './styles/style.scss'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

postMessage({ payload: 'removeLoading' }, '*')
