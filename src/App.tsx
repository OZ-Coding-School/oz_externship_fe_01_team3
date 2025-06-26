import { RouterProvider } from 'react-router'
import './App.css'
import { Header } from '@/components/common/Header'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ExampleListContainer from './components/examList/ExampleContainer'
import RadioType from './components/examQuestions/RadioType'
import CheckBoxType from './components/examQuestions/CheckBoxType'
import { router } from './pages/routes'
import OxType from './components/examQuestions/OxType'
import QuestionTitle from './components/examQuestions/QuestionTitle'
import QusetionWrapper from './components/examQuestions/QuestionWrapper'
import ExamWrapper from './components/examQuestions/ExamWrapper'

function App() {
  const queryClient = new QueryClient()
  const test = [
    {
      question_id: 3,
      type: '라디오',
      question: 'React에서 상태(state)를 선언할 때 사용하는 Hook은?',
      options: ['useEffect', 'useState', 'useRef', 'useMemo'],
      point: 5,
    },
  ]

  const test3 = [
    {
      question_id: 2,
      type: 'O/X',
      question: 'CSS는 프로그래밍 언어이다.',
      options: ['O', 'X'],
      point: 5,
    },
  ]

  const test2 = [
    {
      question_id: 1,
      type: '객관식',
      question: 'HTML의 기본 구조를 이루는 태그는?',
      options: ['<html>', '<head>', '<body>', '<div>'],
      point: 5,
    },
  ]

  /*
    number: number
  question: string
  score: number
  type: string
  */
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
      <div className="p-[40px]">
        <ExamWrapper>
          <QusetionWrapper>
            <QuestionTitle
              score={test2[0].point}
              question={test2[0].question}
              type={test2[0].type}
              number={test2[0].question_id}
            ></QuestionTitle>
            <CheckBoxType
              options={test2[0].options}
              question_Id={test2[0].question_id}
            ></CheckBoxType>
          </QusetionWrapper>
          <QusetionWrapper>
            <QuestionTitle
              score={test3[0].point}
              question={test3[0].question}
              type={test3[0].type}
              number={test3[0].question_id}
            ></QuestionTitle>
            <OxType
              question_Id={test3[0].question_id}
              options={test3[0].options}
            />
          </QusetionWrapper>
          <QusetionWrapper>
            <QuestionTitle
              score={test[0].point}
              question={test[0].question}
              type={test[0].type}
              number={test[0].question_id}
            ></QuestionTitle>
            <RadioType
              question_Id={test[0].question_id}
              options={test[0].options}
            />
          </QusetionWrapper>
        </ExamWrapper>
      </div>
    </div>
  )
}

export default App
