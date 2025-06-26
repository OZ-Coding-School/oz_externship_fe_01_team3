import type { ModalSuccessResponse } from '@/types/examList/examModal'

export const mockModalSuccessResponse: ModalSuccessResponse = {
  test_id: 4,
  title: '프론트엔드 기초 쪽지시험',
  thumbnail_img_url: '/images/examList/html.png',
  elapsed_time: 30,
  cheating_count: 0,
  questions: [
    {
      question_id: 1,
      type: '객관식',
      question: 'HTML의 기본 구조를 이루는 태그는?',
      options: ['<html>', '<head>', '<body>', '<div>'],
      point: 5,
    },
    {
      question_id: 2,
      type: 'O/X',
      question: 'CSS는 프로그래밍 언어이다.',
      options: ['O', 'X'],
      point: 5,
    },
  ],
}
