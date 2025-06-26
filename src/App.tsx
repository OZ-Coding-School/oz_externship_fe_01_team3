import { RouterProvider } from 'react-router'
import './App.css'
import { Header } from '@/components/common/Header'
import { router } from './pages/routes'
<<<<<<< HEAD
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ExampleListContainer from './components/examList/ExampleContainer'

function App() {
  const queryClient = new QueryClient()
=======
import RadioType from './components/examQuestions/RadioType'

function App() {
  const test = [
    { id: 1, test: '나는야 승준티비 대빵이지' },
    { id: 2, test: '나는야 지향티비 열정걸이지' },
    { id: 3, test: '나는야 우수티비 매우 우수하지' },
    { id: 4, test: '나는야 성진티비 입대하지' },
  ]
>>>>>>> 5395a56 (리베이스 충돌 해결)

  return (
    <div>
      template
<<<<<<< HEAD
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Header />
        <ExampleListContainer />
      </QueryClientProvider>
=======
      <RouterProvider router={router} />
      <Header />
      <RadioType options={test} questionId="w"></RadioType>
>>>>>>> 5395a56 (리베이스 충돌 해결)
    </div>
  )
}

export default App
