import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

import './index.css'
import App from '@/App.tsx'
import { ToastBoxProvider } from './context/ToastBoxProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastBoxProvider>
      <App />
    </ToastBoxProvider>
  </StrictMode>
)
