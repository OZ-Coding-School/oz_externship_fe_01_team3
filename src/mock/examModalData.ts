import type { ModalSuccessResponse } from '@/types/examList/examModal'

export const mockModalSuccessResponse: ModalSuccessResponse = {
  id: 1,
  generation: {
    id: 1,
  },
  test: {
    id: 123,
    title: '프론트엔드 기초 쪽지시험',
    subject: {
      id: 1,
      title: '프론트엔드 기초',
    },
    thumbnail_img_url:
      'https://cdn.example.com/images/frontend_basic_quiz_thumbnail.png',
  },
  duration_time: 60,
  questions_snapshot_json: [
    {
      question_id: 1,
      type: '단일선택',
      question: 'HTML의 기본 구조를 이루는 태그는?',
      prompt: null,
      blank_count: null,
      options_json: ['A. <html>', 'B. <head>', 'C. <body>', 'D. <div>'],
      point: 5,
    },
    {
      question_id: 2,
      type: 'ox',
      question: 'CSS는 프로그래밍 언어이다.',
      prompt: null,
      blank_count: null,
      options_json: ['O', 'X'],
      point: 5,
    },
    {
      question_id: 3,
      type: '순서정렬',
      question: '다음 HTML 요소들을 웹 페이지에 표시되는 순서대로 정렬하세요.',
      prompt: null,
      blank_count: null,
      options_json: ['<head>', '<html>', '<body>', '<title>'],
      point: 5,
    },
    {
      question_id: 4,
      type: '주관식',
      question: '다음 문장의 빈칸을 채우세요',
      prompt: 'HTML에서 문서의 제목을 설정할 때 사용하는 태그는 <____>이다.',
      blank_count: 1,
      options_json: [],
      point: 5,
    },
    {
      question_id: 5,
      type: '빈칸식',
      question: '다음 문장의 빈칸을 채우세요.',
      prompt:
        'HTML의 <____> 태그는 문서의 제목을 정의하고, <____> 태그 안에 위치한다.',
      blank_count: 2,
      options_json: [],
      point: 5,
    },
    {
      question_id: 6,
      type: '다중선택',
      question: '다음 중 CSS에서 글자 색상과 관련된 속성을 모두 고르세요.',
      prompt: null,
      blank_count: null,
      options_json: [
        'A. color',
        'B. background-color',
        'C. font-size',
        'D. text-align',
      ],
      point: 5,
    },
  ],
}
