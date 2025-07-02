import CheckBoxType from '@/components/examQuestions/CheckBoxType'
import OxType from '@/components/examQuestions/OxType'
import QuestionEmptyText from '@/components/examQuestions/QuestionEmptyText'
import QuestionHeader from '@/components/examQuestions/QuestionHeader'
import QuestionResultSubBanner from '@/components/examQuestions/QuestionResultSubBanner'
import QuestionTextarea from '@/components/examQuestions/QuestionTextarea'
import QuestionTitle from '@/components/examQuestions/QuestionTitle'
import RadioType from '@/components/examQuestions/RadioType'
import ReorderQuestion from '@/components/examQuestions/ReorderQuestion'
import examResultData from '@/mock/examResultData'

export default function ExamResult() {
  return (
    <>
      <QuestionHeader
        title={examResultData.deployment.test.title}
        subTitle={`임시 서브 타이틀 / 부정 행위 ${examResultData.cheating_count}`}
        showOption={false}
      />
      <QuestionResultSubBanner />
      <div className="mt-20 ml-90 flex flex-col gap-25">
        {examResultData.deployment.questions_snapshot_json.map(
          (question, index) => {
            const userAnswer =
              examResultData.answers_json[question.question_id.toString()] ?? []

            let questionComponent = null

            const COMMON_PROPS = {
              disabled: true,
              student_answer: userAnswer,
              correct_answer: question.answer,
              explanation: question.explanation,
              is_result: true,
            }

            switch (question.type) {
              case 'multiple_choice_single':
                questionComponent = (
                  <RadioType
                    {...COMMON_PROPS}
                    options={question.options_json}
                    question_Id={question.question_id}
                  />
                )
                break
              case 'multiple_choice_multiple':
                questionComponent = (
                  <CheckBoxType
                    {...COMMON_PROPS}
                    options={question.options_json}
                    question_Id={question.question_id}
                  />
                )
                break
              case 'ox':
                questionComponent = (
                  <OxType
                    {...COMMON_PROPS}
                    options={question.options_json}
                    question_Id={question.question_id}
                  />
                )
                break
              case 'ordering':
                questionComponent = (
                  <ReorderQuestion
                    options_json={question.options_json}
                    question_Id={question.question_id}
                    {...COMMON_PROPS}
                  />
                )
                break
              case 'fill_in_blank':
                questionComponent = (
                  <QuestionTextarea
                    {...COMMON_PROPS}
                    question_Id={question.question_id}
                    prompt={question.prompt as string}
                  />
                )
                break
              case 'short_answer':
                questionComponent = (
                  <QuestionEmptyText
                    {...COMMON_PROPS}
                    blank_count={question.blank_count ?? 0}
                    prompt={question.prompt as string}
                  />
                )
                break
              default:
                questionComponent = (
                  <div className="text-red-500">
                    지원하지 않는 문제 타입입니다.
                  </div>
                )
            }
            return (
              <div key={question.question_id} className="mb-8">
                <QuestionTitle
                  number={index + 1}
                  question={question.question}
                  score={question.point}
                  type={question.type}
                />
                {questionComponent}
              </div>
            )
          }
        )}
      </div>
      <div className="flex items-center justify-center">
        <button
          className="mt-30 mb-24 flex h-16 w-23 cursor-pointer items-center justify-center rounded-[4px] border border-[#4e01b3] bg-[#6201E0] px-4 py-7 text-xl font-semibold text-purple-100 hover:bg-[#4E01B3] active:bg-[#3B0186]"
          onClick={() => {
            console.log(123)
          }}
        >
          완료
        </button>
      </div>
    </>
  )
}
