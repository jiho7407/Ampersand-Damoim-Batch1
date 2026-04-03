"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { track, getCardType } from "@/lib/analytics";
import { getLabById, getMentorsByLabId } from "@/lib/mock-data";
import type { Mentor } from "@/types";

const CARD_TYPE_CONFIG = {
  A: {
    title: "컨택 메일, 이렇게 쓰면 답장 옵니다",
    color: "bg-sky-50 border-sky-200",
    badge: "text-sky-700 bg-sky-100",
    label: "컨택 전략",
  },
  B: {
    title: "교수님 성격, 랩 분위기, 인건비 — 직접 물어보세요",
    color: "bg-emerald-50 border-emerald-200",
    badge: "text-emerald-700 bg-emerald-100",
    label: "내부 정보",
  },
  C: {
    title: "여기 졸업하면 어디 가나요? 현실 진로를 알려드려요",
    color: "bg-amber-50 border-amber-200",
    badge: "text-amber-700 bg-amber-100",
    label: "진로·커리어",
  },
  D: {
    title: "저도 학점 3.0대였어요 — 비상위권 입학 경험 공유",
    color: "bg-rose-50 border-rose-200",
    badge: "text-rose-700 bg-rose-100",
    label: "현실 공감",
  },
};

export default function MentorPage() {
  const params = useParams();
  const labId = params.id as string;
  const lab = getLabById(labId);
  const mentors = getMentorsByLabId(labId);
  const cardType = getCardType() ?? "A";

  useEffect(() => {
    track("mentor_view", { lab_id: labId });
    track("mentor_card_type", { card_type: cardType, lab_id: labId });
  }, [labId, cardType]);

  if (!lab) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-5">
        <div className="text-center">
          <p className="text-slate-400 text-sm">연구실을 찾을 수 없습니다.</p>
          <Link href="/explore" className="text-indigo-600 text-sm mt-2 block">
            ← 연구실 목록으로
          </Link>
        </div>
      </main>
    );
  }

  // 배정된 카드 유형 우선 정렬
  const sortedMentors = [...mentors].sort((a, b) => {
    if (a.cardType === cardType) return -1;
    if (b.cardType === cardType) return 1;
    return 0;
  });

  return (
    <main className="min-h-screen bg-slate-50 pb-8">
      {/* 헤더 */}
      <header className="bg-indigo-700 text-white px-5 pt-12 pb-6">
        <div className="max-w-lg mx-auto">
          <Link href="/explore" className="text-indigo-300 text-sm mb-4 block">
            ← 연구실 목록
          </Link>
          <p className="text-indigo-300 text-xs mb-1">
            {lab.university} · {lab.department}
          </p>
          <h1 className="text-xl font-bold mb-2">{lab.professor}</h1>
          <p className="text-indigo-200 text-sm">{lab.researchArea}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {lab.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-indigo-200 bg-indigo-600 px-2.5 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* 멘토 카드 */}
      <section className="px-5 py-6">
        <div className="max-w-lg mx-auto">
          <p className="text-slate-500 text-xs mb-4">
            이 연구실 재학 대학원생 {mentors.length}명
          </p>

          <div className="space-y-5">
            {sortedMentors.map((mentor) => (
              <MentorCard
                key={mentor.id}
                mentor={mentor}
                labId={labId}
                isHighlighted={mentor.cardType === cardType}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function MentorCard({
  mentor,
  labId,
  isHighlighted,
}: {
  mentor: Mentor;
  labId: string;
  isHighlighted: boolean;
}) {
  const config = CARD_TYPE_CONFIG[mentor.cardType];

  return (
    <div
      className={`bg-white rounded-2xl border overflow-hidden ${
        isHighlighted ? "border-indigo-300 shadow-md" : "border-slate-100"
      }`}
    >
      {isHighlighted && (
        <div className="bg-indigo-700 text-white text-xs font-medium px-4 py-1.5 text-center">
          ✨ 추천 멘토
        </div>
      )}
      <div className="p-5">
        {/* 상단 정보 */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="font-bold text-slate-900">{mentor.nickname}</p>
            <p className="text-slate-500 text-xs mt-0.5">
              {mentor.degree === "MS" ? "석사과정" : mentor.degree === "PhD" ? "박사과정" : "석박통합"}{" "}
              {mentor.yearsInLab}년차 · {mentor.researchArea}
            </p>
          </div>
          <div className="text-right flex-shrink-0 ml-2">
            <p className="text-sm font-bold text-amber-500">★ {mentor.rating.toFixed(1)}</p>
            <p className="text-xs text-slate-400">상담 {mentor.consultCount}회</p>
          </div>
        </div>

        {/* 카드 타입 타이틀 */}
        <div className={`rounded-xl px-4 py-3 mb-3 border ${config.color}`}>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${config.badge} mr-2`}>
            {config.label}
          </span>
          <p className="text-slate-800 text-sm font-medium mt-2">
            {config.title}
          </p>
        </div>

        {/* 상담 주제 태그 */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {mentor.consultTopics.map((topic) => (
            <span
              key={topic}
              className="text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full"
            >
              #{topic}
            </span>
          ))}
        </div>

        {/* 소개 */}
        <p className="text-slate-600 text-sm leading-relaxed mb-5 line-clamp-3">
          {mentor.intro}
        </p>

        {/* CTA */}
        <Link
          href={`/request?mentorId=${mentor.id}&labId=${labId}&type=${mentor.cardType}`}
          onClick={() =>
            track("mentor_cta_click", {
              mentor_id: mentor.id,
              lab_id: labId,
              card_type: mentor.cardType,
            })
          }
          className="block w-full bg-indigo-700 text-white text-center font-semibold text-sm py-3 rounded-xl hover:bg-indigo-800 transition-colors"
        >
          상담 신청하기 →
        </Link>
      </div>
    </div>
  );
}
