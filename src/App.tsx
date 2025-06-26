import { RouterProvider } from 'react-router'
import './App.css'
import { Header } from '@/components/common/Header'
import { router } from './pages/routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ExampleListContainer from './components/examList/ExampleContainer'
import Button from './components/common/Button'

function App() {
  const queryClient = new QueryClient()

  return (
    <div>
      template
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Header />
        <Button
          className="bg-amber-200 w-[40px] h-[20px]"
          disabled={false}
          type="submit"
        >
          sdas
        </Button>
        <ExampleListContainer />
      </QueryClientProvider>
    </div>
  )
}

export default App
