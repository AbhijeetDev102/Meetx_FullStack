import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { GlobalContextProvider } from './context/GlobalContext.jsx'

createRoot(document.getElementById('root')).render(
    <GlobalContextProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </GlobalContextProvider>

)
