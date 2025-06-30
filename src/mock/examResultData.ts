import type { ExamResult } from '@/types/examResult/examResult'

const examResultData: ExamResult = {
  id: 1,
  title: 'TypeScript 쪽지시험',
  thumbnail: '',
  totalQuestions: 7,
  questions: [
    {
      questionId: 101,
      type: 'multiple_choice',
      question:
        'TypeScript 타입 좁히기 규칙에서, 안전하게 협동하는 상황에 타입 간 값 할당 방식은 무엇인가요?',
      prompt: null,
      options: [
        '타입 간 관계가 없으면 할당이 불가',
        '타입이 같은 경우만 할당 가능',
        '값의 타입이 대상 타입의 서브 타입이면 할당 가능',
        '값의 타입이 대상 타입의 슈퍼 타입이면 할당 가능',
      ],
      studentAnswer: ['값의 타입이 대상 타입의 슈퍼 타입이면 할당 가능'],
      correctAnswer: ['값의 타입이 대상 타입의 서브 타입이면 할당 가능'],
      point: 10,
      explanation:
        '값의 타입이 대상 타입의 서브 타입이어야 안전하게 할당됩니다. 반대의 경우 런타임 오류 가능성이 있습니다.',
      isCorrect: false,
    },
    {
      questionId: 102,
      type: 'single_choice',
      question: '다음 중 TypeScript의 특징으로 올바른 것을 모두 골라주세요.',
      prompt: null,
      options: [
        '동적 타입 검사',
        '런타임에 타입 검사',
        '인터프리터 기반 실행',
        '자바스크립트와의 완벽한 호환',
      ],
      studentAnswer: ['자바스크립트와의 완벽한 호환'],
      correctAnswer: ['자바스크립트와의 완벽한 호환'],
      point: 10,
      explanation:
        'TypeScript는 컴파일 시점에 정적 타입 검사를 하며, 자바스크립트로 트랜스파일되어 호환됩니다.',
      isCorrect: true,
    },
    {
      questionId: 103,
      type: 'multiple_choice',
      question:
        'TypeScript 타입 좁히기 규칙에서, 안전하게 협동하는 상황에 타입 간 값 할당 방식은 무엇인가요? 안전하게 허용되는 값-속성 타입 간의 관계는 무엇인가요?',
      prompt: null,
      options: [
        '동일 타입일 때만 가능',
        '값의 타입이 대상 타입의 서브 타입일 때 가능',
        '값의 타입이 대상 타입의 슈퍼 타입일 때 가능',
        '어떤 타입이든 가능',
      ],
      studentAnswer: [
        '값의 타입이 대상 타입의 서브 타입일 때 가능',
        '값의 타입이 대상 타입의 슈퍼 타입일 때 가능',
      ],
      correctAnswer: [
        '값의 타입이 대상 타입의 서브 타입일 때 가능',
        '값의 타입이 대상 타입의 슈퍼 타입일 때 가능',
      ],
      point: 10,
      explanation: '안전한 타입 할당을 위해선 서브타입 관계가 필요합니다.',
      isCorrect: true,
    },
    {
      questionId: 104,
      type: 'subjective',
      question:
        'TypeScript 타입 좁히기 규칙에서, 안전하게 협동하는 상황에 타입 간 값 할당 방식은 무엇인가요?',
      prompt: null,
      studentAnswer: ['값의 타입이 대상 타입의 슈퍼 타입이면 가능하다'],
      correctAnswer: ['값의 타입이 대상 타입의 서브 타입일 때 가능하다'],
      point: 10,
      explanation:
        '값의 타입이 대상 타입의 서브타입일 때 안전한 협동이 가능하므로 올바른 답변이 아닙니다.',
      isCorrect: false,
    },
    {
      questionId: 105,
      type: 'subjective',
      question:
        'TypeScript 타입 좁히기 규칙에서, 안전하게 협동하는 상황에 타입 간 값 할당 방식은 무엇인가요?',
      prompt: null,
      blankCount: 2,
      studentAnswer: [
        '할당이 항상 허용되려면, 타입간의 관계가 있어야 한다',
        'interface 또는 type 키워드를 사용하여 구조를 명확히 해야 함',
      ],
      correctAnswer: [
        '값의 타입이 대상 타입의 서브 타입이면 가능하다',
        'interface 또는 type 키워드를 사용하여 구조를 명확히 해야 함',
      ],
      point: 10,
      explanation: '서브타입 관계 및 구조 정의가 타입 협동의 핵심입니다.',
      isCorrect: true,
    },
    {
      questionId: 106,
      type: 'ox',
      question: 'TypeScript에서 any 타입을 사용하면 모든 타입과 호환된다.',
      prompt: null,
      options: ['O', 'X'],
      studentAnswer: ['O'],
      correctAnswer: ['O'],
      point: 5,
      explanation: '`any`는 모든 타입과 호환되지만, 타입 안정성을 해칩니다.',
      isCorrect: true,
    },
    {
      questionId: 107,
      type: 'multiple_choice',
      question:
        '코드가 실행되기까지의 과정을 순서 없이 모아놨어요. 올바른 순서를 정렬해볼까요?',
      prompt: null,
      options: [
        '자바스크립트 코드 실행',
        'TypeScript 파일 작성',
        'TypeScript 파일 저장',
        'TypeScript 파일 컴파일',
      ],
      studentAnswer: ['A', 'C', 'B', 'D'],
      correctAnswer: ['B', 'C', 'D', 'A'],
      point: 10,
      explanation:
        'TypeScript는 작성 → 저장 → 컴파일 → 실행의 순서로 동작합니다.',
      isCorrect: false,
    },
  ],
  cheatingCount: 0,
}

export default examResultData
