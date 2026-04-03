# TASKS.md — Claude Code 작업 목록

> 우선순위 순서대로 실행. 각 태스크 완료 시 체크.

---

## 🔴 Phase 1: 기반 세팅

### T-01. 프로젝트 초기화

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

- [ ] Next.js 15, TypeScript, Tailwind v4, App Router 설정
- [ ] shadcn/ui 설치: `npx shadcn@latest init`
- [ ] 필요한 shadcn 컴포넌트: `button`, `input`, `card`, `badge`, `dialog`, `label`, `select`
- [ ] `cn` 유틸 확인 (`lib/utils.ts`)

### T-02. 타입 정의 작성

- [ ] `src/types/index.ts` — `Lab`, `Mentor`, `WaitlistEntry`, `FunnelEvent` 타입 (DATA_SCHEMA.md 참고)

### T-03. 목 데이터 작성

- [ ] `src/lib/mock-data.ts` — 연구실 12개, 멘토 24개 (DATA_SCHEMA.md 명세 참고)
- [ ] 실제로 읽기 좋은 구체적 소개문 작성 (너무 AI스럽지 않게)

### T-04. Supabase 클라이언트 설정

- [ ] `npm install @supabase/supabase-js @supabase/ssr`
- [ ] `src/lib/supabase/client.ts` — 브라우저용
- [ ] `src/lib/supabase/server.ts` — 서버 컴포넌트용

### T-05. 분석 트래킹 함수

- [ ] `src/lib/analytics.ts` — `track(event, metadata?)` 함수
- [ ] Supabase `funnel_events` 테이블에 INSERT
- [ ] 실패해도 사용자 경험에 영향 없도록 try-catch 처리

---

## 🟠 Phase 2: 퍼널 페이지 구현

### T-06. 공통 레이아웃

- [ ] `src/app/layout.tsx` — 폰트, 메타태그, Analytics
- [ ] 네비게이션 없음 (단방향 퍼널)
- [ ] 모바일 우선 반응형

### T-07. Step 1: 랜딩 페이지 (`/`)

참고: CLAUDE.md Section 4 > Step 1

- [ ] Hero 섹션 (헤드라인 + CTA 버튼)
- [ ] 문제 섹션 (3가지 페인포인트)
- [ ] 솔루션 플로우 (3단계 시각화)
- [ ] 사회적 증거 섹션
- [ ] 하단 CTA
- [ ] `landing_view`, `landing_cta_click` 이벤트

**디자인 방향:**

- 신뢰감 있는 톤 (학술적이되 딱딱하지 않게)
- 컬러: 남색/인디고 계열 메인, 흰 배경
- 핵심 수치 강조 (15,000원, 15분, 인증된 재학생)

### T-08. Step 2: 연구실 탐색 (`/explore`)

참고: CLAUDE.md Section 4 > Step 2

- [ ] 페이지 상단 설명 텍스트
- [ ] 학교 필터 (KAIST / 서울대 / 연세대 / 포스텍 / UNIST / 고려대 / 전체)
- [ ] 연구실 카드 그리드 (3열 데스크탑, 1열 모바일)
- [ ] 각 카드: 교수명, 학교, 연구분야 태그, 재학생 수, "자세히 보기" 버튼
- [ ] A/B 테스트 카드유형 배정 (sessionStorage)
- [ ] `explore_view`, `lab_card_click` 이벤트

### T-09. Step 3: 대학원생 카드 (`/mentor/[id]`)

참고: CLAUDE.md Section 4 > Step 3, FUNNEL.md A/B 테스트

- [ ] 상단: 연구실 정보 요약
- [ ] 멘토 카드 리스트 (해당 연구실 멘토 2명)
- [ ] 카드 유형별 다른 강조점 (A/B/C/D)
- [ ] 각 카드: 닉네임, 연구분야, 상담 주제 태그, 별점, 상담 횟수, 소개
- [ ] "상담 신청하기" 버튼 → `/request?mentorId=xxx&type=X`
- [ ] `mentor_view`, `mentor_card_type`, `mentor_cta_click` 이벤트

### T-10. Step 4: 상담 신청 (`/request`)

참고: CLAUDE.md Section 4 > Step 4

- [ ] 선택한 멘토 요약 카드 (URL params에서 복원)
- [ ] 상담 시간 선택: 15분(15,000원) / 30분(30,000원)
- [ ] 가격 강조 표시
- [ ] "결제하기" 버튼 → `/waitlist`로 이동
- [ ] `request_view`, `request_duration_select`, `payment_button_click` 이벤트

### T-11. Step 5: 대기 리스트 (`/waitlist`)

참고: CLAUDE.md Section 4 > Step 5

- [ ] 상단 메시지: "현재 베타 테스트 중입니다..." 문구
- [ ] 폼: 이름(필수), 이메일(필수), 전화번호(선택), 관심분야(선택 텍스트)
- [ ] 제출 → Supabase `waitlist` 테이블 INSERT
- [ ] 완료 화면: 감사 메시지 + 공유 유도
- [ ] `waitlist_view`, `waitlist_signup` 이벤트

---

## 🟡 Phase 3: 마무리

### T-12. 메타데이터 & SEO

- [ ] 각 페이지 `metadata` export
- [ ] OG 이미지 설정 (텍스트 기반이라도 OK)

### T-13. 에러 핸들링

- [ ] `not-found.tsx`
- [ ] `error.tsx`
- [ ] Supabase 오류 시 fallback 처리

### T-14. 빌드 & 배포 확인

- [ ] `npm run build` 에러 없음
- [ ] `npm run type-check` 에러 없음
- [ ] 모바일 레이아웃 확인 (375px)
- [ ] Vercel 배포 (`vercel --prod`)

---

## 💡 구현 시 주의사항

1. **목 데이터는 구체적으로:** "연구 분위기가 좋아요" X → "주 1회 전체 미팅, 평소엔 자율적으로 연구. 교수님이 학생 의견 많이 존중하는 편" O

2. **가짜 결제 화면은 신뢰감 있게:** 너무 허술하면 실험 오염. "베타 테스트" 프레임을 명확히.

3. **이벤트 트래킹은 누락 없이:** 각 페이지 마운트 시 view 이벤트, 버튼 클릭 시 click 이벤트.

4. **A/B 유형은 세션 내 유지:** 새로고침해도 같은 유형 보여야 함 (sessionStorage).

5. **반응형 필수:** 학부생 타겟 = 모바일 우선.
