# DESIGN.md — 디자인 시스템 & 비주얼 가이드

> Claude Code가 UI를 구현할 때 참고하는 디자인 가이드

---

## 브랜드 방향

**키워드:** 신뢰, 투명, 학술적이되 접근하기 쉬운

**피해야 할 것:**

- 화려한 그라데이션 (스타트업 느낌 과잉)
- 너무 딱딱한 포털 느낌 (정부 사이트 느낌)
- 일반적인 보라/파랑 SaaS 템플릿

**지향하는 것:**

- 깔끔하고 읽기 좋은 인터페이스
- 정보 밀도가 적절한 카드 레이아웃
- 신뢰감을 주는 색상 (인디고/슬레이트 계열)

---

## 컬러 시스템

```css
:root {
  /* Primary */
  --color-primary: #3730a3; /* indigo-700 */
  --color-primary-light: #6366f1; /* indigo-500 */
  --color-primary-bg: #eef2ff; /* indigo-50 */

  /* Neutral */
  --color-text: #0f172a; /* slate-900 */
  --color-text-sub: #475569; /* slate-600 */
  --color-text-muted: #94a3b8; /* slate-400 */
  --color-border: #e2e8f0; /* slate-200 */
  --color-bg: #ffffff;
  --color-bg-subtle: #f8fafc; /* slate-50 */

  /* Accent */
  --color-accent: #0ea5e9; /* sky-500 */
  --color-success: #10b981; /* emerald-500 */
  --color-warning: #f59e0b; /* amber-500 */
}
```

---

## 타이포그래피

```css
/* 폰트: Pretendard (한국어) + 시스템 폰트 fallback */
font-family:
  "Pretendard",
  -apple-system,
  BlinkMacSystemFont,
  sans-serif;

/* 스케일 */
--text-xs: 0.75rem; /* 12px - 보조 라벨 */
--text-sm: 0.875rem; /* 14px - 본문 보조 */
--text-base: 1rem; /* 16px - 본문 */
--text-lg: 1.125rem; /* 18px - 소제목 */
--text-xl: 1.25rem; /* 20px - 카드 제목 */
--text-2xl: 1.5rem; /* 24px - 섹션 헤드 */
--text-3xl: 1.875rem; /* 30px - 페이지 헤드 */
--text-4xl: 2.25rem; /* 36px - 히어로 */
--text-5xl: 3rem; /* 48px - 히어로 대형 */
```

**폰트 로드 (next/font):**

```typescript
// Pretendard는 로컬 폰트로 처리
import localFont from "next/font/local";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});
```

> Pretendard 없으면 Noto Sans KR로 대체 가능

---

## 컴포넌트 가이드

### 버튼

```tsx
/* Primary CTA */
<Button className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 py-3 rounded-lg font-semibold text-base">
  내 관심 연구실 찾기 →
</Button>

/* Secondary */
<Button variant="outline" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
  더 알아보기
</Button>
```

### 연구실 카드

```
┌─────────────────────────────────────┐
│  KAIST · 전산학부                     │ ← 학교/학과 (muted)
│  김○○ 교수                            │ ← 교수명 (bold, xl)
│                                      │
│  자연어처리  LLM  멀티모달              │ ← 태그 (badge)
│                                      │
│  재학 대학원생 7명 상담 가능             │ ← 하단 정보
│  인건비 양호 · 논문 실적 우수  →        │ ← 태그 + 화살표
└─────────────────────────────────────┘
```

### 멘토 카드 (A/B/C/D 유형별 강조점만 다름)

```
┌─────────────────────────────────────┐
│  KAIST 대학원생 #7            ★ 4.8  │
│  자연어처리 · 박사과정 3년차            │
│                                      │
│  "메일 작성법, 교수 답장 받는 법"       │ ← 카드 유형별 타이틀
│                                      │
│  #메일작성법  #타이밍  #후속연락        │ ← 상담 주제 태그
│                                      │
│  저는 3개 연구실 컨택 후 모두...       │ ← 소개 2줄 (truncate)
│                                      │
│  상담 47회 완료          상담 신청하기 →│
└─────────────────────────────────────┘
```

### 가격 표시 (Step 4)

```
┌──────────────────┐  ┌──────────────────┐
│   15분 상담        │  │   30분 상담        │
│                   │  │                   │
│   15,000원        │  │   30,000원        │
│                   │  │                   │
│  기본 컨택 전략    │  │  심층 내부 정보    │
│  + 메일 피드백    │  │  + 합격 전략      │
└──────────────────┘  └──────────────────┘
```

---

## 레이아웃

```
/* 최대 너비 */
--container-sm:  640px;
--container-md:  768px;
--container-lg: 1024px;
--container-xl: 1280px;

/* 기본 패딩 */
--page-px: 1rem;          /* 모바일 */
@sm: --page-px: 1.5rem;
@lg: --page-px: 2rem;
```

### 그리드 시스템

- 연구실 카드: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- 멘토 카드: `grid-cols-1 md:grid-cols-2`
- 문제 섹션: `grid-cols-1 md:grid-cols-3`

---

## 모바일 우선 체크리스트

- [ ] 터치 타겟 최소 44×44px
- [ ] 텍스트 최소 14px (한국어 가독성)
- [ ] CTA 버튼 full-width on mobile
- [ ] 카드 1열 on mobile
- [ ] 스크롤 시 CTA sticky (선택)
