import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router'
import './App.css'
import { Header } from '@/components/common/Header'
import { router } from './pages/routes'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      template
      <RouterProvider router={router} />
      <Header />
    </QueryClientProvider>
  )
}

export default App
