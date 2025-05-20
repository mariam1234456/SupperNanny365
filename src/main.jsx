import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
import './index.css'
import App from './App.jsx'
import TokenContextProvider from './Context/TokenContext.jsx'
import { GenderProvider } from './Context/GenderContext.jsx'

createRoot(document.getElementById('root')).render(
  <TokenContextProvider>
  <GenderProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </GenderProvider>
  </TokenContextProvider>,
)
