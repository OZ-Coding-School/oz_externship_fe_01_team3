import type { ExamResult } from '@/types/examResult/examResult'

const examResultData: ExamResult = {
  id: 1,
  cheating_count: 1,
  answers_json: {
    '1': ['A'],
    '2': ['x'],
    '3': ['<html>', '<head>', '<body>', '<title>'],
    '4': ['title'],
    '5': [''],
  },
  deployment: {
    id: 10,
    test: {
      id: 5,
      title: 'CSS 기초 진단 평가',
      thumbnail_img_url: 'https://example.com/images/css-test.jpg',
    },
    questions_snapshot_json: [
      {
        question_id: 1,
        type: 'multiple_choice_single', // 객관식 단일 선택
        question: 'HTML의 기본 구조를 이루는 태그는?',
        prompt: null,
        blank_count: null,
        options_json: ['A. <html>', 'B. <head>', 'C. <body>', 'D. <div>'],
        answer: ['A'],
        point: 5,
        explanation:
          'HTML 문서는 항상 <html> 태그로 시작하여 웹페이지의 전체 구조를 감쌉니다. 이 태그는 문서의 루트 요소로, <head>와 <body>를 포함합니다.',
      },
      {
        question_id: 2,
        type: 'ox', // ox문제
        question: 'CSS는 프로그래밍 언어이다.',
        prompt: null,
        blank_count: null,
        options_json: ['O', 'X'],
        answer: ['X'],
        point: 5,
        explanation:
          'CSS는 스타일을 정의하는 선언형 언어이며, 조건문이나 반복문과 같은 로직을 포함하지 않아 일반적으로 프로그래밍 언어로 분류되지 않습니다.',
      },
      {
        question_id: 3,
        type: 'ordering', // 순서 정렬
        question:
          '다음 HTML 요소들을 웹 페이지에 표시되는 순서대로 정렬하세요.',
        prompt: null,
        blank_count: null,
        options_json: ['<head>', '<html>', '<body>', '<title>'],
        answer: ['<html>', '<head>', '<body>', '<title>'],
        point: 10,
        explanation:
          'HTML 문서는 <html> 태그로 시작하고, 그 안에 <head>와 <body>가 위치합니다. 일반적으로 <head>는 <body>보다 먼저 선언되며, <title>은 <head> 내부에 들어가므로 <html> → <head> → <body> → <title> 순서로 표시되면 안 되고, 구조상 <title>은 <head> 안에 먼저 위치해야 합니다. 정답은 문서 구조의 논리적 순서를 반영해야 합니다.',
      },
      {
        question_id: 4,
        type: 'fill_in_blank', // 빈칸 채우기
        question: '다음 문장의 빈칸을 채우세요.',
        prompt: 'HTML에서 문서의 제목을 설정할 때 사용하는 태그는 <____>이다.',
        blank_count: 1,
        options_json: [],
        answer: ['title'],
        point: 5,
        explanation:
          '<title> 태그는 웹 브라우저의 탭이나 검색 엔진 결과에 표시되는 문서의 제목을 정의하는 데 사용됩니다. 이 태그는 <head> 태그 내부에 위치해야 합니다.',
      },
      {
        question_id: 5,
        type: 'short_answer', // 주관식 단답형
        question: '다음 문장의 빈칸을 채우세요.',
        prompt:
          'HTML의 <____> 태그는 문서의 제목을 정의하고, <____> 태그 안에 위치한다.',
        blank_count: 2,
        options_json: [],
        answer: ['<title>', '<head>'],
        point: 5,
        explanation:
          'color 속성은 HTML 요소의 텍스트 색상을 지정하는 데 사용됩니다. 예를 들어, color: red;는 텍스트 색상을 빨간색으로 설정합니다.',
      },
      {
        question_id: 6,
        type: 'multiple_choice_multiple',
        question: '다음 중 CSS에서 글자 색상과 관련된 속성을 모두 고르세요.',
        prompt: null,
        blank_count: null,
        options_json: [
          'A. color',
          'B. background-color',
          'C. font-size',
          'D. text-align',
        ],
        answer: ['A', 'B'],
        point: 5,
        explanation:
          'color는 글자 색상을 지정하고, background-color는 배경 색상을 지정합니다. font-size와 text-align은 각각 글자 크기와 정렬에 관한 속성입니다.',
      },
    ],
  },
}

export default examResultData
