import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

import './index.css'
import App from '@/App.tsx'
import { ToastBoxProvider } from './context/ToastBoxProvider'

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  const { worker } = await import('./mock/browser')

  return worker.start({
    onUnhandledRequest: 'bypass',
  })
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ToastBoxProvider>
        <App />
      </ToastBoxProvider>
    </StrictMode>
  )
})
