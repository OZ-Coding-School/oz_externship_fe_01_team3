import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router'
import './App.css'
import { router } from './pages/routes'
import { Header } from '@/components/common/Header'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Header />
    </QueryClientProvider>
  )
}

export default App
