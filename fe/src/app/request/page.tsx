"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { track } from "@/lib/analytics";
import { getMentorById, getLabById } from "@/lib/mock-data";

function RequestContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mentorId = searchParams.get("mentorId") ?? "";
  const labId = searchParams.get("labId") ?? "";
  const cardType = searchParams.get("type") ?? "A";

  const mentor = getMentorById(mentorId);
  const lab = getLabById(labId);

  const [selected, setSelected] = useState<"15min" | "30min" | null>(null);

  useEffect(() => {
    track("request_view", { mentor_id: mentorId, card_type: cardType });
  }, [mentorId, cardType]);

  function handleDurationSelect(duration: "15min" | "30min") {
    setSelected(duration);
    track("request_duration_select", { duration, mentor_id: mentorId });
  }

  function handlePayment() {
    if (!selected) return;
    track("payment_button_click", {
      duration: selected,
      price: selected === "15min" ? 15000 : 30000,
      mentor_id: mentorId,
      lab_id: labId,
      card_type: cardType,
    });
    router.push(
      `/waitlist?mentorId=${mentorId}&labId=${labId}&type=${cardType}&duration=${selected}`
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-slate-100 px-5 pt-12 pb-5">
        <div className="max-w-lg mx-auto">
          <Link
            href={`/mentor/${labId}`}
            className="text-slate-400 text-sm mb-4 block"
          >
            ← 돌아가기
          </Link>
          <h1 className="text-xl font-bold text-slate-900">상담 신청</h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-5 py-6 space-y-5">
        {/* 선택된 멘토 요약 */}
        {mentor && lab ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <p className="text-xs text-slate-400 mb-1">선택한 멘토</p>
            <p className="font-bold text-slate-900">{mentor.nickname}</p>
            <p className="text-slate-500 text-sm mt-0.5">
              {lab.university} · {lab.department}
            </p>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs text-amber-500 font-semibold">
                ★ {mentor.rating.toFixed(1)}
              </span>
              <span className="text-slate-300 text-xs">|</span>
              <span className="text-xs text-slate-500">
                상담 {mentor.consultCount}회 완료
              </span>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <p className="text-sm text-slate-400">멘토 정보를 불러오는 중...</p>
          </div>
        )}

        {/* 상담 시간 선택 */}
        <div>
          <p className="text-sm font-semibold text-slate-800 mb-3">
            상담 시간을 선택해주세요
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                key: "15min" as const,
                duration: "15분",
                price: "15,000원",
                features: ["기본 컨택 전략", "메일 피드백", "핵심 질문 3가지"],
              },
              {
                key: "30min" as const,
                duration: "30분",
                price: "30,000원",
                features: ["심층 내부 정보", "합격 전략 전반", "후속 질문 가능"],
              },
            ].map((option) => (
              <button
                key={option.key}
                onClick={() => handleDurationSelect(option.key)}
                className={`rounded-2xl border-2 p-4 text-left transition-all ${
                  selected === option.key
                    ? "border-indigo-700 bg-indigo-50"
                    : "border-slate-200 bg-white hover:border-indigo-300"
                }`}
              >
                <p className="text-base font-bold text-slate-900 mb-1">
                  {option.duration}
                </p>
                <p
                  className={`text-xl font-bold mb-3 ${
                    selected === option.key
                      ? "text-indigo-700"
                      : "text-slate-700"
                  }`}
                >
                  {option.price}
                </p>
                <ul className="space-y-1">
                  {option.features.map((f) => (
                    <li key={f} className="text-xs text-slate-500 flex gap-1">
                      <span className="text-indigo-400">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </div>

        {/* 안내 */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <p className="text-amber-800 text-xs leading-relaxed">
            💡 결제 후 48시간 내로 상담 가능 시간을 문자로 안내드립니다.
            베타 기간 중에는 무료로 먼저 체험하실 수 있어요.
          </p>
        </div>

        {/* 결제 버튼 */}
        <button
          onClick={handlePayment}
          disabled={!selected}
          className={`w-full py-4 rounded-xl font-bold text-base transition-all ${
            selected
              ? "bg-indigo-700 text-white hover:bg-indigo-800 shadow-lg shadow-indigo-200"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >
          {selected
            ? `${selected === "15min" ? "15,000원" : "30,000원"} 결제하기`
            : "상담 시간을 선택해주세요"}
        </button>

        <p className="text-slate-400 text-xs text-center">
          결제 정보는 안전하게 암호화되어 처리됩니다
        </p>
      </div>
    </main>
  );
}

export default function RequestPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <RequestContent />
    </Suspense>
  );
}
