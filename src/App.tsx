import { RouterProvider } from 'react-router'
import './App.css'
import { Header } from '@/components/common/Header'
import { router } from './pages/routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient()

  return (
    <div>
      template
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Header />
      </QueryClientProvider>
    </div>
  )
}

export default App
