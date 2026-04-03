# FIGMA_BACKUP.md — 피그마 디자인 구조 백업

> 파일: `oFLJ2axFXArO7k30WZYxed` (Batch 1 공유용)
> 백업 일시: 2026-04-03
> 캔버스: 4/4 (node 1:7)
> MCP 도구로 추출한 메타데이터 원본 저장

---

## 화면 목록 (5개 프레임)

| 프레임명 | Node ID | 크기 | 설명 |
|----------|---------|------|------|
| Home | 1:176 | 360×800 | 홈 — 멘토 카드 목록, 검색바, 필터, 하단 네비게이션 |
| Home_filter | 1:195 | 360×800 | 홈 + 필터 바텀 모달 오버레이 |
| Mento detail | 1:259 | 360×1068 | 멘토 상세 페이지 |
| Reservation | 1:318 | 360×1220 | 예약(상담 신청) — 달력, 시간 슬롯, 상담 내용 입력 |
| Reservation_finish | 1:232 | 360×800 | 예약 완료 화면 |

---

## 화면별 컴포넌트 구조

### 1. Home (1:176)

```
Home (360×800)
├── Component 9 [TopBar] (0,0) 360×94       — 상단 앱바
├── Main Content (0,94) 360×169
│   └── Hero Section (20,32) 320×125
│       ├── Hero Title (0,0) 320×58         — 히어로 텍스트
│       └── Search bar (0,74) 320×51        — 검색바 컴포넌트
├── Section Header (20,287) 320×34
│   ├── Section Title (0,5.5) 67×23         — 섹션 제목
│   └── Filter Button Container (257,0) 63×34
│       └── Filter Button (8,8) 47×18
│           ├── Filter Text (0,0) 25×18     — "필터" 텍스트
│           └── Icon (29,0) 18×18           — 필터 아이콘
├── Frame 2085663268 (20,345) 320×206       — 멘토 카드 1
├── Frame 2085663269 (20,563) 320×206       — 멘토 카드 2
└── Menu Bar (0,714) 360×86
    └── Menu Options (20,12) 320×46
        ├── Component 3 (24,0) 54×46        — 홈 탭
        ├── Component 4 (133,0) 54×46       — 히스토리 탭
        └── Component 2 (242,0) 54×46       — 프로필 탭
```

### 2. Home_filter (1:195)

```
Home_filter (360×800)
├── [Home과 동일한 기본 레이아웃]
├── Background (0,0) 360×800               — 반투명 오버레이
└── Bottom Modal (0,461) 360×339
    ├── Bottom modal 360X339               — 모달 배경 (rounded)
    ├── Filter Title (166,16) 28×21        — "필터" 타이틀
    └── Filter Options (20,61) 320×233
        ├── Filter Row (0,0) 320×37
        │   ├── Choice Chip (0,0) 156×37   — 필터 옵션 chip
        │   └── Frame 2085663269 (164,0) 156×37
        ├── Filter Row (0,49) 320×37       — 두 번째 줄
        ├── Filter Row (0,98) 320×37       — 세 번째 줄
        ├── Filter Row (0,147) 320×37      — 네 번째 줄
        └── Frame 2085663270 (0,196) 156×37 — 단독 chip
```

**필터 옵션 추정 (5줄 × 최대 2개 = 총 9개 chip):**
- 연구분야별 필터 (AI, 하드웨어, 바이오 등)
- 상담 유형별 필터 (컨택전략, 내부정보, 진로 등)

### 3. Mento detail (1:259) — 스크롤 페이지

```
Mento detail (360×1068)
├── Component 9 [TopBar] (0,0) 360×94
└── Container (0,118) 360×950
    ├── Mentor Details (20,0) 320×604
    │   ├── Mentor Info (0,0) 320×70
    │   │   ├── Mentor Image (0,0) 70×70        — 프로필 이미지 (rounded)
    │   │   └── Mentor Text Info (90,3.5) 230×63
    │   │       ├── Mentor Name (0,0) 47×23      — 닉네임
    │   │       └── Mentor Sub Info (0,25) 151×38
    │   │           ├── Mentor Position (0,0)    — 직위/소속
    │   │           └── Mentor Year (0,20)       — 재학 기간
    │   └── Mentor Introduction (0,102) 320×502
    │       ├── Introduction Text Container (0,0) 320×80
    │       │   ├── Introduction Title          — "소개" 제목
    │       │   └── Introduction Text           — 소개 본문
    │       ├── Specs Container (0,104) 320×252
    │       │   ├── Specs Title                 — "스펙" 제목
    │       │   └── Specs Info Container (0,26) 320×226
    │       │       ├── GPA Container (0,0) 156×70
    │       │       ├── Major Container (164,0) 156×70
    │       │       ├── Internship Container (0,78) 156×70
    │       │       ├── Publication Container (164,78) 156×70
    │       │       ├── Application Container (0,156) 156×70  — 지원 방법
    │       │       └── Acceptance Container (164,156) 156×70 — 입학 연도
    │       └── Lab Container (0,380) 320×122
    │           ├── Lab Title                   — "연구실" 제목
    │           └── Lab Info Container (0,26) 320×96
    │               ├── Lab Info Text           — 연구실 이름
    │               └── Lab Professors Container (16,44) 288×36
    │                   ├── Professor Info Container — 교수명
    │                   └── Field Info Container     — 연구분야
    ├── Separator (0,636) 360×10                — 구분선
    ├── Consultation Container (20,678) 320×154
    │   ├── Consultation Details Container (0,0) 320×80
    │   │   ├── Consultation Title              — "상담 가능 주제" 제목
    │   │   └── Consultation Details            — 주제 설명
    │   └── Consultation Times Container (0,104) 320×50
    │       ├── Consultation Times Title        — "가능 시간" 제목
    │       └── Time Slots Container (0,26) 199×24
    │           ├── Component 11 (0,0) 61×24    — 시간 슬롯 chip
    │           ├── Component 7 (69,0) 61×24
    │           └── Component 10 (138,0) 61×24
    └── Component 11 [CTA Button] (0,864) 360×86 — "상담 신청하기" 버튼
```

### 4. Reservation (1:318) — 상담 예약

```
Reservation (360×1220)
├── Header (0,0) 360×702
│   ├── Component 9 [TopBar] (0,0) 360×94
│   ├── Calendar Container (20,118) 320×363
│   │   ├── Instructions (0,0) 320×23           — "날짜를 선택해주세요"
│   │   └── Date Selector (0,35) 320×328
│   │       └── Month Container (8,16) 304×296
│   │           ├── Month Navigation (60,0) 184×24
│   │           │   ├── Icon (left arrow)
│   │           │   ├── Current Month           — "2025년 4월"
│   │           │   └── Icon (right arrow)
│   │           └── Days Container (0,36) 304×260
│   │               └── Week Row × 6 (각 304×40)
│   │                   └── Day Component × 7 (각 40×40)
│   ├── Morning Slot Container (20,505) 320×63
│   │   ├── Morning Slot Label                  — "오전"
│   │   └── Morning Time Slots (0,26) 320×37
│   │       ├── Time Slot × 4 (각 72×37)       — 09:00, 10:00, 11:00, 12:00
│   └── Afternoon Slot Container (20,592) 320×110
│       ├── Afternoon Slot Label                — "오후"
│       └── Afternoon Time Slots (0,26) 320×84
│           └── Time Slot × 7 (각 72×37)       — 13:00~19:00
├── Divider (0,734) 360×10
├── Input (20,776) 320×326
│   ├── Consultation Details Container (0,0) 320×306
│   │   ├── Label                               — "상담 내용을 입력해주세요"
│   │   └── Consultation Details Input (0,22) 320×284
│   │       └── Consultation Details Text (12,16) — placeholder 텍스트
│   └── Character Counter Container (0,310) 320×16
│       └── Character Counter (12,0)            — "0/500"
└── Component 11 [CTA] (0,1134) 360×86          — "예약하기" 버튼
```

### 5. Reservation_finish (1:232)

```
Reservation_finish (360×800)
├── StatusBar (0,0) 360×54                      — iOS 상태바
│   ├── Left Side: 시간 표시
│   ├── Dynamic Island
│   └── Right Side: 신호/와이파이/배터리
└── Container (47,314) 266×173
    ├── Iconex/Filled/Send (103,0) 60×60        — 전송 아이콘 (완료 아이콘)
    └── Container (0,76) 266×97
        ├── Title (0,0) 266×23                  — "예약이 완료되었습니다"
        └── Description Container (0,39) 266×58
            ├── Description (53,0) 160×36       — 완료 설명 텍스트
            └── Subtitle (64.5,40) 137×18       — 서브 텍스트
```

---

## 디자인 라이브러리 컴포넌트 (1:404 Design Library 섹션)

### 컴포넌트 심볼 목록

| 컴포넌트 | Node ID | 크기 | 변형 |
|----------|---------|------|------|
| TopBar | 1:407 | 360×94 | Property 1=1 (기본), Property 1=2 |
| Navigation bar | 1:445 | 360×86 | - |
| CTA 1 (Primary) | 1:450 | 360×86 | - |
| CTA 2 (Secondary) | 1:452 | 360×86 | - |
| Main CTA Button | 1:455 | 320×56 | Default / Hover / Loading |
| Sub CTA Button | 1:466 | 320×55 | Default / Hover |
| Nav Tab | 1:473~1:488 | 54×46 | Home/History/Profile × Default/Selected |
| Search bar | 1:651 | 320×51 | Default / Typing |
| Choice Chip | 1:659 | 72×37 | Default / Selected |
| Day (달력) | 1:664~1:672 | 40×40 | Day / Day_Number / Day_Selected / Day_Disable |
| Profile Card | 1:675 | 320×206 | Default / Selected |
| Badge | 1:614~1:618 | 58×24 | recommendation / Default / Hot |
| Loading | 1:595~1:607 | 24×24 | 3단계 애니메이션 |
| Icon | 다수 | 24×24 | 각종 아이콘 (화살표, 검색, 별, 필터, 달력, 홈 등) |

### 타이포그래피 스케일 (Spectral)

| 이름 | 용도 |
|------|------|
| Heading | 페이지 타이틀 |
| Body 1 | 본문 주요 텍스트 |
| Body 1-1 | 본문 보조 |
| Body 2 | 작은 본문 |
| Body 2-1 | 작은 본문 보조 |
| Caption 1 | 캡션/라벨 |
| Caption 1-1 | 작은 캡션 |

---

## 피그마 → 서비스 페이지 매핑

| 피그마 화면 | 서비스 경로 | 비고 |
|------------|------------|------|
| Home | `/explore` | 연구실/멘토 탐색 (랜딩은 별도 구현) |
| Home_filter | `/explore` (필터 모달) | 바텀시트 오버레이 |
| Mento detail | `/mentor/[id]` | 대학원생 상세 카드 |
| Reservation | `/request` | 상담 신청 (날짜+시간+내용) |
| Reservation_finish | `/waitlist` 완료 | 예약 완료 → 대기리스트 등록 |

---

## 구현 시 참고사항

1. **모바일 전용 디자인**: 360px 너비 기준, 세로 스크롤 (overflow-y)
2. **TopBar (Component 9)**: 앱 헤더 — 뒤로가기 + 타이틀 + 우측 액션
3. **Bottom CTA (Component 11)**: 하단 고정 버튼 360×86, safe area 고려
4. **Menu Bar**: 탭 네비게이션 3개 (홈/히스토리/프로필)
5. **Profile Card (320×206)**: 멘토 카드 — 홈에서 2개 노출
6. **Choice Chip (72×37)**: 필터 선택용 pill 버튼
7. **Day Component (40×40)**: 달력 날짜 — 선택됨/비활성 상태 포함
8. **시간 슬롯 (72×37)**: Choice Chip과 동일 컴포넌트 재사용 추정
