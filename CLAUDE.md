# Peer Intel — CLAUDE.md

> 이공계 대학원 지원자와 재학 대학원생을 1:1 전화로 연결해 **연구실 내부 정보의 정보 비대칭을 해소**하는 유료 상담 플랫폼.
> 현재 단계: **Pretotype MVP** (가짜 결제 포함 5단계 퍼널 검증)

---

## 1. 프로젝트 개요

### 핵심 가설

> "학부생은 연구실 내부 정보를 얻기 위해 돈을 지불할 의향이 있다"

### 검증 퍼널 (5단계)

```
랜딩 → 연구실 선택 → 대학원생 카드 → 상담 신청 → 가짜 결제(이메일 수집)
```

### 성공 기준

- 결제 버튼 클릭률 **15% 이상** → 유료 모델 본격 개발
- 연락처 전환율 **70% 이상** → 진성 수요 확인

---

## 2. 기술 스택

| 영역          | 선택                                      | 이유                   |
| ------------- | ----------------------------------------- | ---------------------- |
| Framework     | **Next.js 15** (App Router)               | SSR/ISR, Vercel 최적화 |
| Language      | **TypeScript**                            | 타입 안전성            |
| Styling       | **Tailwind CSS v4**                       | 빠른 프로토타이핑      |
| UI Components | **shadcn/ui**                             | 커스터마이징 용이      |
| Database      | **Supabase** (PostgreSQL)                 | 실시간 + Auth 내장     |
| Analytics     | **Vercel Analytics** + 커스텀 이벤트 로깅 | 퍼널 추적              |
| Deployment    | **Vercel**                                | 자동 배포              |
| 이메일 수집   | **Supabase DB**                           | 대기 리스트 저장       |

---

## 3. 디렉토리 구조

```
peer-intel/
├── CLAUDE.md                    ← 이 파일
├── docs/
│   ├── PRD.md                   ← 제품 요구사항
│   ├── FUNNEL.md                ← 퍼널 상세 설계
│   └── DATA_SCHEMA.md          ← DB 스키마
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx             ← 랜딩 (Step 1)
│   │   ├── explore/
│   │   │   └── page.tsx         ← 연구실 탐색 (Step 2)
│   │   ├── mentor/
│   │   │   └── [id]/
│   │   │       └── page.tsx     ← 대학원생 카드 (Step 3)
│   │   ├── request/
│   │   │   └── page.tsx         ← 상담 신청 (Step 4)
│   │   └── waitlist/
│   │       └── page.tsx         ← 가짜 결제 → 대기 리스트 (Step 5)
│   ├── components/
│   │   ├── ui/                  ← shadcn/ui 컴포넌트
│   │   ├── funnel/              ← 퍼널 전용 컴포넌트
│   │   │   ├── LabCard.tsx
│   │   │   ├── MentorCard.tsx
│   │   │   └── PaymentFake.tsx
│   │   └── analytics/
│   │       └── FunnelTracker.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   └── server.ts
│   │   ├── analytics.ts         ← 이벤트 트래킹 함수
│   │   └── mock-data.ts         ← Pretotype용 목 데이터
│   └── types/
│       └── index.ts
├── .env.local.example
└── package.json
```

---

## 4. 퍼널 상세 설계

### Step 1: 랜딩 페이지 (`/`)

**목표:** 문제 공감 유도 → 연구실 선택으로 전환

**측정:** `landing_cta_click` 이벤트 (클릭률 30% 목표)

**핵심 카피:**

- 헤드라인: "연구실 컨택, 아는 선배 없어도 됩니다"
- 서브: "재학 중인 대학원생과 15분 전화로, 아무도 알려주지 않는 연구실 내부 정보를 얻으세요"
- CTA: "내 관심 연구실 찾기"

**섹션 구성:**

1. Hero (헤드라인 + CTA)
2. 문제 섹션 (3가지 페인포인트 카드)
3. 솔루션 설명 (3단계 플로우)
4. 사회적 증거 (베타 신청자 수 카운터 — 가짜여도 됨)
5. 최종 CTA

---

### Step 2: 연구실 탐색 (`/explore`)

**목표:** 관심 연구실 선택 → 대학원생 카드로 전환

**측정:** `lab_card_click` 이벤트 (클릭률 50% 목표)

**UI:**

- 학교/학과 필터 (더미 데이터)
- 연구실 카드 그리드 (교수명, 학교, 연구분야, 재학생 수)
- 검색바

**목 데이터 연구실 (최소 12개):**

- 수도권 이공계 대학 중심
- KAIST, 서울대, 연세대, 포스텍, UNIST 등 혼합

---

### Step 3: 대학원생 카드 (`/mentor/[id]`)

**목표:** 상담 신청으로 전환

**측정:** `mentor_card_click`, `request_click` 이벤트

**A/B 테스트 카드 유형 (URL param: `?type=A|B|C|D`):**

- **A: 컨택 전략형** — "메일 작성법, 교수 답장 받는 법"
- **B: 연구실 내부정보형** — "교수 성격, 랩 분위기, 인건비"
- **C: 합격·커리어형** — "졸업 후 진로, 취업, 박사 진학"
- **D: 현실 공감형** — "스펙 부족 전략, 비상위권 진학 경험"

**카드 정보:**

- 닉네임 (익명, "연세대 대학원생 #23")
- 연구분야
- 재학 기간
- 상담 가능 주제 태그
- 별점 / 상담 횟수 (목 데이터)
- "상담 신청하기" 버튼

---

### Step 4: 상담 신청 (`/request`)

**목표:** 결제 버튼 클릭으로 전환

**측정:** `payment_button_click` 이벤트 (**핵심 지표, 15% 목표**)

**UI:**

- 선택한 멘토 요약 카드
- 상담 유형 선택 (15분 / 30분)
- 가격 표시: **15,000원 / 30,000원**
- "결제하기" 버튼

---

### Step 5: 가짜 결제 → 대기 리스트 (`/waitlist`)

**목표:** 이메일/연락처 수집

**측정:** `waitlist_signup` 이벤트 (전환율 70% 목표)

**문구:**

> "현재 베타 테스트 중입니다. 무료로 먼저 이용해보실 수 있도록 오픈 알림을 드릴게요."

**수집 정보:** 이름, 이메일, (선택) 전화번호, 관심 분야

---

## 5. 분석 이벤트 스키마

모든 이벤트를 `funnel_events` 테이블에 저장.

```typescript
// lib/analytics.ts
type FunnelEvent =
  | "landing_view"
  | "landing_cta_click"
  | "explore_view"
  | "lab_card_click"
  | "mentor_view"
  | "mentor_card_type" // A/B/C/D
  | "request_view"
  | "payment_button_click" // ★ 핵심 지표
  | "waitlist_view"
  | "waitlist_signup";

interface EventPayload {
  event: FunnelEvent;
  session_id: string; // 익명 세션 (localStorage UUID)
  metadata?: Record<string, unknown>;
  timestamp: string;
}
```

**`track(event, metadata?)` 함수를 만들어 모든 퍼널 페이지에서 호출할 것.**

---

## 6. 데이터베이스 스키마 (Supabase)

```sql
-- 대기 리스트
create table waitlist (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  phone text,
  interest text,              -- 관심 분야
  mentor_type text,           -- 클릭한 카드 유형 (A/B/C/D)
  lab_id text,                -- 관심 연구실
  created_at timestamptz default now()
);

-- 퍼널 이벤트 (분석용)
create table funnel_events (
  id uuid primary key default gen_random_uuid(),
  event text not null,
  session_id text not null,
  metadata jsonb,
  created_at timestamptz default now()
);

-- 인덱스
create index on funnel_events (event, created_at);
create index on funnel_events (session_id);
```

---

## 7. 목 데이터 가이드라인

`lib/mock-data.ts`에 정적 데이터로 관리.

**연구실 데이터 (12개 이상):**

```typescript
interface Lab {
  id: string;
  professor: string; // "김○○"
  university: string; // "KAIST"
  department: string; // "전산학부"
  researchArea: string; // "머신러닝, 컴퓨터비전"
  mentorCount: number; // 재학 대학원생 수
  tags: string[]; // ["인건비 양호", "논문 실적 우수"]
}
```

**멘토 데이터 (24개 이상, 연구실당 2명):**

```typescript
interface Mentor {
  id: string;
  labId: string;
  nickname: string; // "연세대 대학원생 #23"
  cardType: "A" | "B" | "C" | "D";
  researchArea: string;
  yearsInLab: number;
  consultTopics: string[];
  rating: number; // 4.5~5.0
  consultCount: number; // 5~30
  intro: string; // 1~2줄 소개
}
```

---

## 8. 개발 우선순위

### Phase 1 (지금 바로) — Pretotype

- [ ] Next.js 프로젝트 세팅 (shadcn/ui 포함)
- [ ] Supabase 연결 (waitlist + funnel_events 테이블)
- [ ] 목 데이터 작성
- [ ] 5단계 퍼널 페이지 구현
- [ ] 분석 이벤트 트래킹
- [ ] Vercel 배포

### Phase 2 (검증 후)

- 실제 대학원생 인증 시스템
- 전화 상담 연결 (Zoom/Google Meet 링크 자동 생성)
- 결제 연동 (토스페이먼츠)
- 리뷰 시스템

---

## 9. 코딩 규칙

### 일반

- **TypeScript strict mode** 사용
- `any` 타입 금지
- 컴포넌트는 함수형, 이름은 PascalCase
- 파일명은 kebab-case (단, 컴포넌트는 PascalCase)
- 불필요한 `console.log` 커밋 금지

### Next.js

- App Router 사용 (pages/ 금지)
- Server Component 기본, 클라이언트 상태 필요 시 `'use client'`
- 환경변수는 `.env.local` (절대 하드코딩 금지)
- `NEXT_PUBLIC_` prefix: 클라이언트 노출 변수만

### Tailwind

- 인라인 스타일 금지, Tailwind 클래스 사용
- 반복 패턴은 `cn()` 유틸로 정리
- 반응형: mobile-first (`sm:`, `md:`, `lg:`)

### Supabase

- 서버 컴포넌트: `lib/supabase/server.ts`
- 클라이언트 컴포넌트: `lib/supabase/client.ts`
- Row Level Security(RLS) 활성화

### 분석

- 모든 퍼널 전환 지점에 `track()` 호출
- 페이지 진입 시 `{page}_view` 이벤트 필수

---

## 10. 환경 변수

`.env.local.example`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Analytics (선택)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=
```

---

## 11. 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버
npm run dev

# 타입 체크
npm run type-check

# 빌드
npm run build
```

---

## 12. 참고 문서

- `docs/PRD.md` — 전체 제품 요구사항 문서
- `docs/FUNNEL.md` — 퍼널 A/B 테스트 상세
- `docs/DATA_SCHEMA.md` — DB 스키마 전체

---

_이 파일은 Claude Code가 프로젝트 컨텍스트를 파악하기 위한 단일 진실 공급원(Single Source of Truth)입니다. 변경 사항은 항상 이 파일에 반영하세요._
