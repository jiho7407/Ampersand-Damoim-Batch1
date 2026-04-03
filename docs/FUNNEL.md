# FUNNEL.md — 퍼널 & A/B 테스트 설계

---

## 퍼널 전체 흐름

```
[랜딩] → [연구실 탐색] → [대학원생 카드] → [상담 신청] → [대기 리스트 등록]
  /             /explore        /mentor/[id]     /request         /waitlist
```

---

## 대학원생 카드 A/B 테스트

URL 파라미터 `?type=A|B|C|D`로 구분.
랜딩 → explore 진입 시 4개 유형 중 하나를 랜덤 배정 (세션 유지).

### 카드 유형별 상세

#### Type A: 컨택 전략형

- **타이틀:** "컨택 메일, 이렇게 쓰면 답장 옵니다"
- **태그:** `#메일작성법` `#타이밍` `#후속연락` `#교수성향파악`
- **소개 예시:** "저는 3개 연구실 컨택 후 모두 면담까지 진행했어요. 메일 제목부터 본문 구조, 보내는 시기까지 알려드릴게요."
- **가설:** 컨택 경험이 없는 초보 지원자에게 가장 높은 전환율

#### Type B: 연구실 내부정보형

- **타이틀:** "교수님 성격, 랩 분위기, 인건비 — 직접 물어보세요"
- **태그:** `#교수성격` `#랩분위기` `#인건비` `#워라밸` `#졸업요건`
- **소개 예시:** "연구실 들어오기 전엔 아무도 알려주지 않는 것들이 있어요. 인건비 실수령액, 교수님이 실제로 어떤 분인지, 야근 문화..."
- **가설:** 연구실 선택 단계에서 가장 높은 관심

#### Type C: 합격·커리어형

- **타이틀:** "여기 졸업하면 어디 가나요? 현실 진로를 알려드려요"
- **태그:** `#졸업후진로` `#취업` `#박사진학` `#산학협력` `#스펙관리`
- **소개 예시:** "저희 랩 졸업생 대부분이 대기업 AI팀이나 스타트업 리서처로 갔어요. 논문 몇 편 써야 나갈 수 있는지도 솔직히 말씀드릴게요."
- **가설:** 진로 불확실성이 높은 지원자에게 효과적

#### Type D: 현실 공감형

- **타이틀:** "저도 학점 3.0대였어요 — 비상위권 입학 경험 공유"
- **태그:** `#학점낮음` `#스펙부족` `#타대지원` `#현실조언` `#멘탈관리`
- **소개 예시:** "서울대 출신도 아니고, 학점도 높지 않았어요. 그래도 카이스트 들어왔습니다. 어떻게 했는지 솔직하게 다 얘기해드릴게요."
- **가설:** 정보 소외 계층 (타대, 비상위권) 타겟에게 가장 공감

---

## 이벤트 트래킹 상세

### 이벤트 목록

```
landing_view          — 랜딩 페이지 진입
landing_cta_click     — "내 관심 연구실 찾기" 클릭

explore_view          — 연구실 탐색 진입
explore_filter_use    — 필터 사용 (학교/학과)
lab_card_click        — 연구실 카드 클릭 (lab_id 포함)

mentor_view           — 대학원생 카드 페이지 진입
mentor_card_type      — 카드 유형 (A/B/C/D)
mentor_cta_click      — "상담 신청하기" 클릭

request_view          — 상담 신청 페이지 진입
request_duration_select — 상담 시간 선택 (15min/30min)
payment_button_click  — "결제하기" 버튼 클릭 ★핵심

waitlist_view         — 대기 리스트 페이지 진입
waitlist_signup       — 이메일 등록 완료
```

### 세션 ID 생성

```typescript
// 페이지 첫 진입 시
const getSessionId = () => {
  if (typeof window === "undefined") return "";
  let sid = localStorage.getItem("peer_intel_sid");
  if (!sid) {
    sid = crypto.randomUUID();
    localStorage.setItem("peer_intel_sid", sid);
  }
  return sid;
};
```

---

## 전환율 계산 방법

```
랜딩 CTA 클릭률    = landing_cta_click / landing_view
연구실 카드 클릭률  = lab_card_click / explore_view
멘토 CTA 클릭률    = mentor_cta_click / mentor_view
결제 클릭률        = payment_button_click / request_view  ★
연락처 전환율      = waitlist_signup / waitlist_view
```

---

## A/B 테스트 배정 로직

```typescript
// explore 페이지 진입 시 배정
const assignCardType = () => {
  const existing = sessionStorage.getItem("card_type");
  if (existing) return existing as "A" | "B" | "C" | "D";

  const types = ["A", "B", "C", "D"] as const;
  const assigned = types[Math.floor(Math.random() * 4)];
  sessionStorage.setItem("card_type", assigned);
  return assigned;
};
```

멘토 카드 페이지 목록에서 배정된 유형의 카드를 상단에 노출.
