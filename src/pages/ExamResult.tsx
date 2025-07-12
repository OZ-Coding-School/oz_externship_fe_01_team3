import CheckBoxType from '@/components/examQuestions/CheckBoxType'
import OxType from '@/components/examQuestions/OxType'
import QuestionEmptyText from '@/components/examQuestions/QuestionEmptyText'
import QuestionHeader from '@/components/examQuestions/QuestionHeader'
import QuestionResultSubBanner from '@/components/examQuestions/QuestionResultSubBanner'
import QuestionTextarea from '@/components/examQuestions/QuestionTextarea'
import QuestionTitle from '@/components/examQuestions/QuestionTitle'
import RadioType from '@/components/examQuestions/RadioType'
import ReorderQuestion from '@/components/examQuestions/ReorderQuestion'
import { useExamResultQuery } from '@/hooks/examResult/useExamResultQuery'

import type {
  ExamQuestion,
  CommonPropsType,
} from '@/types/examResult/examResult'
import { useParams } from 'react-router'

const getContext = (
  type: string,
  question: ExamQuestion,
  COMMON_PROPS: CommonPropsType
) => {
  switch (type) {
    case 'multiple_choice_single':
      return (
        <RadioType
          {...COMMON_PROPS}
          options={question.options_json}
          question_Id={question.question_id}
        />
      )
    case 'multiple_choice_multiple':
      return (
        <CheckBoxType
          {...COMMON_PROPS}
          options={question.options_json}
          question_Id={question.question_id}
        />
      )
    case 'ox':
      return (
        <OxType
          {...COMMON_PROPS}
          options={question.options_json}
          question_Id={question.question_id}
        />
      )
    case 'ordering':
      return (
        <ReorderQuestion
          {...COMMON_PROPS}
          options_json={question.options_json}
          question_Id={question.question_id}
        />
      )
    case 'fill_in_blank':
      return (
        <QuestionTextarea
          {...COMMON_PROPS}
          question_Id={question.question_id}
          prompt={question.prompt as string}
        />
      )
    case 'short_answer':
      return (
        <QuestionEmptyText
          {...COMMON_PROPS}
          blank_count={question.blank_count ?? 0}
          prompt={question.prompt as string}
        />
      )
    default:
      return <div className="text-red-500">지원하지 않는 문제 타입입니다.</div>
  }
}

export default function ExamResult() {
  const { quizId } = useParams<{ quizId: string }>()

  const { data, isLoading, isError, error } = useExamResultQuery(quizId || '')

  const handleComplete = () => {
    console.log('123')
  }

  if (isLoading) return <p className="text-center"> 결과 불러오는 중...</p>
  if (isError)
    return <p className="text-center text-red-500">에러: {error.message}</p>
  if (!data) {
    return <p className="text-center text-red-500">데이터가 없습니다.</p>
  }

  const { deployment, cheating_count, answers_json } = data

  return (
    <>
      <QuestionHeader
        title={deployment?.test.title}
        subTitle={`임시 서브 타이틀 / 부정 행위 ${cheating_count}`}
        showOption={false}
      />
      <QuestionResultSubBanner />
      <div className="mt-20 ml-90 flex flex-col gap-25">
        {deployment?.questions_snapshot_json.map(
          (question: ExamQuestion, index: number) => {
            const userAnswer =
              answers_json[question?.question_id?.toString()] ?? []

            const COMMON_PROPS: CommonPropsType = {
              disabled: true,
              student_answer: userAnswer,
              correct_answer: question?.answer,
              explanation: question?.explanation,
              is_result: true,
            }

            return (
              <div key={question.question_id} className="mb-8">
                <QuestionTitle
                  number={index + 1}
                  question={question.question}
                  score={question.point}
                  type={question.type}
                />
                {getContext(question.type, question, COMMON_PROPS)}
              </div>
            )
          }
        )}
      </div>
      <div className="flex items-center justify-center">
        <button
          className="mt-30 mb-24 flex h-16 w-23 cursor-pointer items-center justify-center rounded-[4px] border border-[#4e01b3] bg-[#6201E0] px-4 py-7 text-xl font-semibold text-purple-100 hover:bg-[#4E01B3] active:bg-[#3B0186]"
          onClick={handleComplete}
        >
          완료
        </button>
      </div>
    </>
  )
}
