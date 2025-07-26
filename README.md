# 쪽지시험 시스템 - Team 3
안녕하세요! 오즈코딩스쿨 쪽지시험 파트 3팀입니다 

## 👥 팀원

| 역할 | 이름 | 담당 |
|------|------|------|
| 팀장 | 이승준 | 쪽지시험 리스트, 쪽지시험 목록, 프로젝트 관리 |
| 개발자 | 정우수 | 쪽지시험 결과 페이지, 마이페이지 |
| 개발자 | 원지향 | 로그인, 회원가입, 유효성 검사 |

## 🛠 기술 스택

### Frontend
- **React 19.1.0** - UI 라이브러리
- **TypeScript 5.8.3** - 타입 안정성
- **Vite 6.3.5** - 빌드 도구
- **React Router 7.6.2** - 라우팅
- **Tailwind CSS 4.1.10** - 스타일링

### State Management & Data Fetching
- **Zustand 5.0.5** - 상태 관리
- **TanStack Query 5.80.7** - 서버 상태 관리
- **Axios 1.10.0** - HTTP 클라이언트

### Development Tools
- **ESLint 9.25.0** - 코드 린팅
- **Prettier 3.5.3** - 코드 포맷팅
- **Lucide React 0.515.0** - 아이콘 라이브러리

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

| 브랜치 | 목적 | 설명 |
|--------|------|------|
| `main` | 프로덕션 | 실제 서비스 배포용 |
| `develop` | 개발 통합 | 기능 개발 완료 후 병합 |
| `feature/*` | 기능 개발 | 개별 기능 개발 |
| `hotfix/*` | 긴급 수정 | 프로덕션 버그 긴급 수정 |
| `release/*` | 배포 준비 | 배포 전 최종 테스트 |

### 브랜치 네이밍 규칙
```
feature/auth-login          # 인증 로그인 기능
feature/exam-list           # 시험 목록 기능
feature/student-register    # 수강생 등록 기능
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
| Type | 설명 | 예시 |
|------|------|------|
| `feat` | 새로운 기능 | `feat: 로그인 기능 추가` |
| `fix` | 버그 수정 | `fix: 로그인 에러 수정` |
| `docs` | 문서 수정 | `docs: README 업데이트` |
| `style` | 코드 포맷팅 | `style: 코드 스타일 수정` |
| `refactor` | 코드 리팩토링 | `refactor: 컴포넌트 분리` |
| `test` | 테스트 추가/수정 | `test: 로그인 테스트 추가` |
| `chore` | 빌드/설정 변경 | `chore: 의존성 업데이트` |

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
├── components/          # 재사용 가능한 컴포넌트
│   ├── common/         # 공통 컴포넌트
│   └── examList/       # 시험 목록 관련 컴포넌트
├── hooks/              # 커스텀 훅
├── pages/              # 페이지 컴포넌트
├── stores/             # Zustand 스토어
├── types/              # TypeScript 타입 정의
├── lib/                # 유틸리티 함수
└── context/            # React Context
```

## 🔐 인증 시스템

- **로그인/회원가입**: 
- **마이페이지**: 
- **쪽지시험 응시페이지**:
- **쪽지시험 결과페이지**:

## 📋 주요 기능

### 1. 인증 시스템
- 로그인/회원가입
- JWT 토큰, 리프레시 토큰 기반 인증

### 2. 쪽지시험 시스템
- 시험 목록 조회 (전체/응시완료/미응시)
- 시험 응시
- 결과 확인

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

---

**Team 3** - 쪽지시험 시스템 개발팀
