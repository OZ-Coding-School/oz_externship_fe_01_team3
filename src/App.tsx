import { RouterProvider } from 'react-router'
import './App.css'
import { Header } from '@/components/common/Header'
import { router } from './pages/routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ExampleListContainer from './components/examList/ExampleContainer'
import RadioType from './components/examQuestions/RadioType'
import CheckBoxType from './components/examQuestions/CheckBoxType'
import ReorderQuestion from './components/examQuestions/ReorderQuestion'

function App() {
  const queryClient = new QueryClient()
function App() {
  const test = [
    { id: 1, test: '나는야 승준티비 대빵이지' },
    { id: 2, test: '나는야 지향티비 열정걸이지' },
    { id: 3, test: '나는야 우수티비 매우 우수하지' },
    { id: 4, test: '나는야 성진티비 입대하지' },

  const test2 = [
    { id: 1, OX: 'O', test: '맞아요' },
    { id: 2, OX: 'X', test: '틀려요' },
  ]
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
      <br />
      <br />
      <br />
      <RadioType options={test} questionId="w"></RadioType>
      <br />
      <br />
      <br />
      <CheckBoxType options={test2} questionId="a"></CheckBoxType>
      <br />
      <br />
      <br />
      <ReorderQuestion options={test} questionId="s"></ReorderQuestion>
    </div>
  )
}

export default App
