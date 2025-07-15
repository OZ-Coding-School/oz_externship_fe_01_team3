import { useState } from 'react'
import { useLocation, useParams } from 'react-router'
import Cheating from '@/components/examQuestions/Cheating'
import CheckBoxType from '@/components/examQuestions/CheckBoxType'
import OxType from '@/components/examQuestions/OxType'
import QuestionAlert from '@/components/examQuestions/QuestionAlert'
import QuestionEmptyText from '@/components/examQuestions/QuestionEmptyText'
import QuestionHeader from '@/components/examQuestions/QuestionHeader'
import QuestionTextarea from '@/components/examQuestions/QuestionTextarea'
import QuestionTitle from '@/components/examQuestions/QuestionTitle'
import RadioType from '@/components/examQuestions/RadioType'
import ReorderQuestion from '@/components/examQuestions/ReorderQuestion'
import type { ModalSuccessResponse } from '@/types/examList/examModal'
import Button from '@/components/common/Button'
import useCheatingWatcher from '@/hooks/examTaking/useCheatingWatcher'

export default function ExamTakingPage() {
  const { id } = useParams()
  const location = useLocation()
  const examData: ModalSuccessResponse = location.state

  const [cheating, setCheating] = useState(0)
  const [hidden, setHidden] = useState(true)
  const triggerCheating = () => {
    setCheating((prev) => {
      if (prev >= 3) return prev // 3 이상이면 더 안 올림
      const newCount = prev + 1
      setHidden(false)

      if (newCount >= 3) {
        // TODO: 자동 제출
        //TODO: 3회는 결과 페이지로 이동 되게 모달의 X,제출
      }

      return newCount
    })
  }
  useCheatingWatcher(triggerCheating)
  console.log({ id })

  if (!examData) return <h2>시험 정보를 찾을 수 없습니다...</h2>

  return (
    <div className="flex w-full flex-col justify-center">
      <Cheating
        cheatingCount={cheating}
        hidden={hidden}
        onClose={() => setHidden(true)}
      />
      <QuestionHeader
        time={examData?.duration_time}
        title={examData?.test?.title}
        subTitle={examData?.test?.subject.title}
        showOption
        cheating={cheating}
      />

      <div className="flex justify-center">
        <QuestionAlert
          className="mt-8 mb-20"
          message="탭이나 창을 이동하면 부정행위로 간주되어 시험이 중단될 수 있어요. 3초 이상 돌아오지 않으면 부정행위가 추가로 기록됩니다."
        />
      </div>

      <div className="flex w-full justify-center">
        <div className="flex w-[1200px] flex-col items-start justify-start gap-[100px]">
          {(examData.questions_snapshot_json || []).map((data) => {
            const getExamType = () => {
              switch (data.type) {
                case '단일선택':
                  return (
                    <RadioType
                      question_Id={data.question_id}
                      options={data.options_json}
                    />
                  )
                case '다중선택':
                  return (
                    <CheckBoxType
                      question_Id={data.question_id}
                      disabled={false}
                      options={data.options_json}
                    />
                  )
                case 'ox':
                  return (
                    <OxType
                      question_Id={data.question_id}
                      options={data.options_json}
                    />
                  )
                case '순서정렬':
                  return (
                    <ReorderQuestion
                      question_Id={data.question_id}
                      options_json={data.options_json}
                    />
                  )
                case '빈칸식':
                  return (
                    <QuestionEmptyText
                      blank_count={data.blank_count ?? 0}
                      prompt={data.prompt ?? ''}
                    />
                  )
                case '주관식':
                  return (
                    <QuestionTextarea
                      prompt={data.prompt ?? ''}
                      question_Id={data.question_id}
                    />
                  )
              }
            }

            return (
              <div
                key={data.question_id}
                className="flex h-auto w-[1000px] flex-col gap-5"
              >
                <QuestionTitle
                  number={data.question_id}
                  question={data.question}
                  score={data.point}
                  type={data.type}
                />
                {getExamType()}
              </div>
            )
          })}
        </div>
      </div>
      <div className="mt-[162px] mb-[100px] flex w-screen items-center justify-center">
        <Button
          type="submit"
          className="h-[62px] w-[126px] rounded border border-[#4E01B3] bg-[#721AE3] pt-[16px] pr-[29px] pb-[16px] pl-[29px] leading-[140%] font-semibold tracking-[-0.03em] text-[#EFE6FC]"
        >
          제출하기
        </Button>
      </div>
    </div>
  )
}
