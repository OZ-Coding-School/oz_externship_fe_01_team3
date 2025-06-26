import { RouterProvider } from 'react-router'
import './App.css'
import { Header } from '@/components/common/Header'
import RadioType from '@/components/examQuestions/RadioType'
import CheckBoxType from './components/examQuestions/CheckBoxType'
import OxType from './components/examQuestions/OxType'
import ReorderQuestion from './components/examQuestions/ReorderQuestion'
import { router } from './pages/routes'
<<<<<<< HEAD
<<<<<<< HEAD
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ExampleListContainer from './components/examList/ExampleContainer'

function App() {
  const queryClient = new QueryClient()
=======
import RadioType from './components/examQuestions/RadioType'
=======
>>>>>>> f251cb9 (리베이스 충돌 해결 #2)

function App() {
  const test = [
    { id: 1, test: '나는야 승준티비 대빵이지' },
    { id: 2, test: '나는야 지향티비 열정걸이지' },
    { id: 3, test: '나는야 우수티비 매우 우수하지' },
    { id: 4, test: '나는야 성진티비 입대하지' },
  ]
>>>>>>> 5395a56 (리베이스 충돌 해결)

  const test2 = [
    { id: 1, OX: true, test: '맞아요' },
    { id: 2, OX: false, test: '아니에요' },
  ]
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
      <br />
      <br />
      <br />
      <RadioType options={test} questionId="w"></RadioType>
<<<<<<< HEAD
>>>>>>> 5395a56 (리베이스 충돌 해결)
=======
      <br />
      <br />
      <br />
      <CheckBoxType options={test} questionId="a"></CheckBoxType>
      <br />
      <br />
      <br />
      <OxType options={test2} questionId="w"></OxType>
      <br />
      <br />
      <br />
      <ReorderQuestion options={test} questionId="s"></ReorderQuestion>
>>>>>>> f251cb9 (리베이스 충돌 해결 #2)
    </div>
  )
}

export default App
