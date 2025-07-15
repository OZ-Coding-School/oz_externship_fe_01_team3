# 쪽지시험 시스템 - Team 3

안녕하세요! 오즈코딩스쿨 쪽지시험 파트 3팀입니다

## 👥 팀원

| 역할   | 이름   | 담당                                          |
| ------ | ------ | --------------------------------------------- |
| 팀장   | 이승준 | 쪽지시험 리스트, 쪽지시험 응시, 프로젝트 관리 |
| 개발자 | 정우수 | 쪽지시험 결과 페이지, 마이페이지, AWS         |
| 개발자 | 원지향 | 로그인, 회원가입, 소셜로그인                  |

## 🛠 기술 스택

### Frontend Core

- **React 19.1.0** - 최신 UI 라이브러리
- **TypeScript 5.8.3** - 타입 안전성 보장
- **Vite 6.3.5** - 차세대 빌드 도구
- **React Router 7.6.2** - 클라이언트 사이드 라우팅
- **Tailwind CSS 4.1.10** - 유틸리티 기반 스타일링

### State Management & Data Fetching

- **Zustand 5.0.5** - 경량 상태 관리
- **TanStack Query 5.80.7** - 서버 상태 관리 및 캐싱
- **Axios 1.10.0** - HTTP 클라이언트

### Form & Cookie Management

- **React Hook Form 7.59.0** - 고성능 폼 라이브러리
- **js-cookie 3.0.5** - 쿠키 관리 유틸리티

### Development & Testing

- **MSW 2.10.3** - Mock Service Worker (API 모킹)
- **ESLint 9.25.0** - 코드 품질 관리
- **Prettier 3.5.3** - 코드 포맷팅 (Tailwind 플러그인 포함)
- **TypeScript ESLint 8.34.0** - TypeScript 전용 린팅

### UI & Icons

- **Lucide React 0.515.0** - 모던 아이콘 라이브러리

## 🌿 브랜치 전략

### Git Flow 기반 브랜치 구조

```
main (production)
├── develop (integration)
├── feature/기능명
├── hotfix/긴급수정
└── release/배포준비
```

### 브랜치별 역할

| 브랜치      | 목적      | 설명                    |
| ----------- | --------- | ----------------------- |
| `main`      | 프로덕션  | 실제 서비스 배포용      |
| `develop`   | 개발 통합 | 기능 개발 완료 후 병합  |
| `feature/*` | 기능 개발 | 개별 기능 개발          |
| `hotfix/*`  | 긴급 수정 | 프로덕션 버그 긴급 수정 |
| `release/*` | 배포 준비 | 배포 전 최종 테스트     |

### 브랜치 네이밍 규칙

```
feature/auth-login          # 인증 로그인 기능
feature/exam-list           # 시험 목록 기능
feature/student-register    # 수강생 등록 기능
feature/example-list-api    # 예제 리스트 API (현재 브랜치)
hotfix/login-error          # 로그인 에러 수정
release/v1.0.0              # v1.0.0 배포 준비
```

## 📝 커밋 컨벤션

### Conventional Commits 형식

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Type 종류

| Type       | 설명             | 예시                           |
| ---------- | ---------------- | ------------------------------ |
| `feat`     | 새로운 기능      | `feat: 로그인 기능 추가`       |
| `fix`      | 버그 수정        | `fix: 로그인 에러 수정`        |
| `docs`     | 문서 수정        | `docs: README 업데이트`        |
| `style`    | 코드 포맷팅      | `style: 코드 스타일 수정`      |
| `refactor` | 코드 리팩토링    | `refactor: 컴포넌트 분리`      |
| `test`     | 테스트 추가/수정 | `test: 로그인 테스트 추가`     |
| `chore`    | 빌드/설정 변경   | `chore: package.json 업데이트` |

### 커밋 예시

```bash
# 기능 추가
feat(auth): 로그인 페이지 UI 구현

# 버그 수정
fix(exam): 시험 목록 무한 스크롤 에러 수정

# 문서 수정
docs: 프로젝트 설정 가이드 추가

# 리팩토링
refactor(components): ExamCard 컴포넌트 분리
```

## 📁 프로젝트 구조

```
src/
├── API/                    # API 관련 설정
│   └── axiosInstance.ts   # Axios 인스턴스 설정
├── components/            # 재사용 가능한 컴포넌트
│   ├── AuthForm/         # 인증 폼 관련 컴포넌트
│   ├── ChangePassword/   # 비밀번호 변경 컴포넌트
│   ├── common/           # 공통 컴포넌트
│   │   ├── examList/     # 시험 목록 관련 공통 컴포넌트
│   │   ├── StudentCourseRegister/ # 수강생 등록 관련
│   │   ├── Button.tsx    # 공통 버튼
│   │   ├── Header.tsx    # 헤더
│   │   ├── Footer.tsx    # 푸터
│   │   └── Timer.tsx     # 타이머
│   ├── examList/         # 시험 목록 컴포넌트
│   ├── examQuestions/    # 시험 문제 관련 컴포넌트
│   ├── Login/            # 로그인 관련 컴포넌트
│   ├── register/         # 회원가입 관련 컴포넌트
│   └── userInfo/         # 사용자 정보 관련 컴포넌트
├── context/              # React Context
│   ├── ToastBoxContext.tsx
│   └── ToastBoxProvider.tsx
├── hooks/                # 커스텀 훅
│   ├── examList/         # 시험 목록 관련 훅
│   ├── examResult/       # 시험 결과 관련 훅
│   ├── examTaking/       # 시험 응시 관련 훅
│   ├── FindIdPw/         # 아이디/비밀번호 찾기 훅
│   ├── login/            # 로그인 관련 훅
│   └── mypage/           # 마이페이지 관련 훅
├── lib/                  # 유틸리티 함수
│   ├── cookie.ts         # 쿠키 관리
│   ├── token.ts          # 토큰 관리
│   └── examtakingpageOptions.ts # 시험 응시 옵션
├── mock/                 # MSW 모킹 데이터
│   ├── browser.ts        # MSW 브라우저 설정
│   ├── server.ts         # MSW 서버 설정
│   ├── handlers/         # API 핸들러
│   ├── examListData.ts   # 시험 목록 모킹 데이터
│   ├── examModalData.ts  # 시험 모달 모킹 데이터
│   └── examResultData.ts # 시험 결과 모킹 데이터
├── pages/                # 페이지 컴포넌트
│   ├── ExamResult.tsx    # 시험 결과 페이지
│   ├── ExamTakingPage.tsx# 시험 응시 페이지
│   ├── LandingPage.tsx   # 랜딩 페이지
│   ├── Login.tsx         # 로그인 페이지
│   ├── Register.tsx      # 회원가입 페이지
│   └── routes.tsx        # 라우팅 설정
├── stores/               # Zustand 스토어
│   ├── useAuthStore.ts   # 인증 상태 관리
│   └── useLoginStore.ts  # 로그인 상태 관리
└── types/                # TypeScript 타입 정의
    ├── common/           # 공통 타입
    ├── examList/         # 시험 목록 타입
    ├── examResult/       # 시험 결과 타입
    ├── login/            # 로그인 타입
    ├── mock/             # 모킹 데이터 타입
    └── mypage/           # 마이페이지 타입
```

## 🔐 인증 시스템

- **로그인/회원가입**: React Hook Form 기반 유효성 검사, 소셜 로그인 (카카오, 네이버)
- **마이페이지**: 프로필 수정, 비밀번호 변경, 계정 삭제
- **쪽지시험 응시페이지**: 타이머, 부정행위 감지, 자동 저장
- **쪽지시험 결과페이지**: 점수 분석, 오답 노트, 성과 통계

## 📋 주요 기능

### 1. 인증 시스템

- 로그인/회원가입 (이메일, 소셜 로그인)
- JWT 토큰, 쿠키 기반 인증
- 비밀번호 찾기/변경

### 2. 쪽지시험 시스템

- 시험 목록 조회 (전체/응시완료/미응시)
- 무한 스크롤링 시험 목록
- 시험 응시 (타이머, 부정행위 감지)
- 결과 확인 및 오답 노트

### 3. 마이페이지

- 프로필 관리
- 응시 기록 조회
- 성적 통계

## 🧪 개발 환경

### MSW (Mock Service Worker)

- 실제 백엔드 API 구조 반영
- 개발 환경에서 안정적인 데이터 제공
- MSW와 실제 API 병행 운영

### 코드 품질 관리

- **ESLint**: 120줄 상세 설정으로 엄격한 코드 품질 관리
- **Prettier**: Tailwind CSS 플러그인 포함 자동 포맷팅
- **TypeScript**: 엄격 모드로 타입 안전성 보장

## 🤝 협업 가이드

### 1. 코드 리뷰

- 모든 PR은 팀원 2명 이상의 리뷰 필요
- 코드 품질과 기능 검증 후 병합

### 2. 이슈 관리

- GitHub Issues 활용
- 라벨을 통한 이슈 분류

### 3. 커뮤니케이션

- 멘토링 미팅: 주 2회 (화요일, 목요일)
- 데일리 스크럼: 매일 오전 10시 30분
- 기술 공유: 금요일 주 1회

### 4. 협업 특징

- **코드 스타일 통일**: ESLint/Prettier로 일관된 코드 스타일 유지
- **개발 환경 표준화**: MSW로 팀원 모두 동일한 개발 환경 구축
- **체계적 구조 설계**: 기능별 모듈화로 유지보수성 극대화

---

**Team 3** - 쪽지시험 시스템 개발팀 🚀
