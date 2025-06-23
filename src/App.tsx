import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { Header } from '@/components/common/Header'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <Header />
      </div>
    </QueryClientProvider>
  )
}

export default App
