import { RouterProvider } from 'react-router'
import './App.css'
import { Header } from '@/components/common/Header'
import { router } from './pages/routes'

function App() {
  return (
    <div>
      template
      <RouterProvider router={router} />
      <Header />
    </div>
  )
}

export default App
