# DATA_SCHEMA.md — DB 스키마 & 목 데이터 명세

---

## Supabase 테이블

### waitlist

```sql
create table public.waitlist (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  email         text not null unique,
  phone         text,
  interest      text,          -- 관심 분야 (자유 입력)
  mentor_type   char(1),       -- A/B/C/D
  lab_id        text,          -- 클릭한 연구실 ID
  mentor_id     text,          -- 클릭한 멘토 ID
  created_at    timestamptz default now()
);

-- RLS
alter table waitlist enable row level security;
-- INSERT only (누구나 등록 가능, 본인 데이터 조회 불가)
create policy "insert_only" on waitlist for insert with check (true);
```

### funnel_events

```sql
create table public.funnel_events (
  id          uuid primary key default gen_random_uuid(),
  event       text not null,
  session_id  text not null,
  metadata    jsonb default '{}',
  created_at  timestamptz default now()
);

create index idx_funnel_events_event on funnel_events (event);
create index idx_funnel_events_session on funnel_events (session_id);
create index idx_funnel_events_created on funnel_events (created_at);

-- RLS
alter table funnel_events enable row level security;
create policy "insert_only" on funnel_events for insert with check (true);
```

---

## TypeScript 타입 정의

```typescript
// types/index.ts

export interface Lab {
  id: string;
  professor: string; // "김○○ 교수"
  university: string; // "KAIST"
  department: string; // "전산학부"
  researchArea: string; // "머신러닝, 컴퓨터비전"
  researchAreaTags: string[];
  mentorCount: number; // 현재 재학생 수 (멘토 가능)
  tags: string[]; // ["인건비 양호", "논문 실적 우수"]
  slug: string; // URL slug
}

export interface Mentor {
  id: string;
  labId: string;
  nickname: string; // "KAIST 대학원생 #7"
  cardType: "A" | "B" | "C" | "D";
  researchArea: string;
  degree: "MS" | "PhD" | "MS/PhD";
  yearsInLab: number;
  consultTopics: string[];
  rating: number; // 4.0~5.0
  consultCount: number; // 완료된 상담 수
  intro: string; // 2~3줄 자기소개
}

export interface WaitlistEntry {
  name: string;
  email: string;
  phone?: string;
  interest?: string;
  mentorType?: string;
  labId?: string;
  mentorId?: string;
}

export interface FunnelEvent {
  event: string;
  sessionId: string;
  metadata?: Record<string, unknown>;
}
```

---

## 목 데이터 명세 (mock-data.ts)

### 연구실 목록 (12개)

| id      | 학교     | 학과             | 교수 | 연구분야                 |
| ------- | -------- | ---------------- | ---- | ------------------------ |
| lab-001 | KAIST    | 전산학부         | 김○○ | 자연어처리, LLM          |
| lab-002 | KAIST    | 전기및전자공학부 | 이○○ | 반도체설계, SoC          |
| lab-003 | 서울대   | 컴퓨터공학부     | 박○○ | 컴퓨터비전, 의료AI       |
| lab-004 | 서울대   | 전기정보공학부   | 최○○ | 로보틱스, 강화학습       |
| lab-005 | 연세대   | 컴퓨터과학과     | 정○○ | 분산시스템, 클라우드     |
| lab-006 | 연세대   | 전기전자공학부   | 한○○ | 신호처리, 통신           |
| lab-007 | 포스텍   | 컴퓨터공학과     | 윤○○ | 보안, 시스템소프트웨어   |
| lab-008 | 포스텍   | 기계공학과       | 조○○ | 자율주행, 제어           |
| lab-009 | UNIST    | AI대학원         | 강○○ | 그래프신경망, 추천시스템 |
| lab-010 | UNIST    | 전기전자공학부   | 임○○ | 배터리, 에너지재료       |
| lab-011 | 고려대   | 컴퓨터학과       | 신○○ | 바이오인포매틱스         |
| lab-012 | 성균관대 | 소프트웨어학과   | 오○○ | 소프트웨어공학, DevOps   |

### 태그 풀 (연구실별 2~4개)

```
"인건비 양호", "인건비 우수", "졸업 후 대기업 多",
"자유로운 분위기", "체계적 지도", "논문 실적 우수",
"해외 학회 지원", "산학 프로젝트 多", "박사 진학률 높음",
"워라밸 보장", "주 1회 미팅", "코딩 테스트 중요",
"타대 지원자 환영", "학부 연구 경험 우대"
```

### 멘토 목록 (24개, 연구실당 2명)

각 연구실에 카드유형 A, B 또는 C, D를 1개씩 배정.

닉네임 형식: `{학교} 대학원생 #{두자리숫자}`
별점: 4.2~5.0 사이 랜덤
상담 횟수: 3~47 사이 랜덤
