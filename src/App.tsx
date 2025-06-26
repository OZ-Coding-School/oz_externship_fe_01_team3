import { RouterProvider } from 'react-router'
import './App.css'
import { Header } from '@/components/common/Header'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ExampleListContainer from './components/examList/ExampleContainer'
import { router } from './pages/routes'


function App() {
  const queryClient = new QueryClient()
  return (
    <div>
      template
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Header />
        <ExampleListContainer />
      </QueryClientProvider>
      <RouterProvider router={router} />
      <Header />
    </div>
  )
}

export default App
