"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { track } from "@/lib/analytics";
import { createClient } from "@/lib/supabase/client";
import type { WaitlistEntry } from "@/types";

function WaitlistContent() {
  const searchParams = useSearchParams();
  const mentorId = searchParams.get("mentorId") ?? "";
  const labId = searchParams.get("labId") ?? "";
  const cardType = searchParams.get("type") ?? "";

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<WaitlistEntry>({
    name: "",
    email: "",
    phone: "",
    interest: "",
    mentorType: cardType,
    labId,
    mentorId,
  });

  useEffect(() => {
    track("waitlist_view", { mentor_id: mentorId, card_type: cardType });
  }, [mentorId, cardType]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError("이름과 이메일은 필수입니다.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      await supabase.from("waitlist").insert({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone?.trim() || null,
        interest: form.interest?.trim() || null,
        mentor_type: form.mentorType || null,
        lab_id: form.labId || null,
        mentor_id: form.mentorId || null,
      });

      await track("waitlist_signup", {
        card_type: cardType,
        lab_id: labId,
        mentor_id: mentorId,
      });

      setSubmitted(true);
    } catch {
      // Supabase 연결 실패해도 감사 화면은 보여줌 (Pretotype)
      await track("waitlist_signup", {
        card_type: cardType,
        lab_id: labId,
        mentor_id: mentorId,
        fallback: true,
      });
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return <ThankYouScreen />;
  }

  return (
    <main className="min-h-screen bg-white">
      {/* 헤더 */}
      <div className="bg-indigo-700 text-white px-5 pt-12 pb-8">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            🎉
          </div>
          <h1 className="text-xl font-bold mb-2">거의 다 왔어요!</h1>
          <p className="text-indigo-200 text-sm leading-relaxed">
            현재 베타 테스트 중입니다.
            <br />
            무료로 먼저 이용해보실 수 있도록 오픈 알림을 드릴게요.
          </p>
        </div>
      </div>

      {/* 폼 */}
      <div className="max-w-lg mx-auto px-5 py-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              이름 <span className="text-indigo-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="홍길동"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              이메일 <span className="text-indigo-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              전화번호{" "}
              <span className="text-slate-400 text-xs font-normal">선택</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="010-0000-0000"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              관심 분야{" "}
              <span className="text-slate-400 text-xs font-normal">
                선택 · 어떤 정보가 궁금하신가요?
              </span>
            </label>
            <textarea
              name="interest"
              value={form.interest}
              onChange={handleChange}
              placeholder="예: 서울대 AI 연구실 인건비와 졸업 후 진로가 궁금합니다"
              rows={3}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent resize-none"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-base transition-all ${
                loading
                  ? "bg-slate-300 text-slate-400 cursor-not-allowed"
                  : "bg-indigo-700 text-white hover:bg-indigo-800 shadow-lg shadow-indigo-200"
              }`}
            >
              {loading ? "등록 중..." : "오픈 알림 신청하기"}
            </button>
          </div>

          <p className="text-slate-400 text-xs text-center">
            이메일 주소는 오픈 알림 외의 목적으로 사용되지 않습니다.
          </p>
        </form>
      </div>
    </main>
  );
}

function ThankYouScreen() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-5">
      <div className="max-w-lg w-full text-center">
        <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
          ✉️
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-3">
          신청이 완료됐어요!
        </h1>
        <p className="text-slate-500 text-sm leading-relaxed mb-2">
          베타 오픈 시 가장 먼저 알려드릴게요.
        </p>
        <p className="text-slate-400 text-sm mb-8">
          관심 연구실 재학생과의 연결을 준비 중입니다.
        </p>

        <div className="bg-indigo-50 rounded-2xl p-5 mb-8 text-left">
          <p className="text-indigo-700 text-sm font-semibold mb-2">
            📣 주변에도 알려주세요
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            대학원 정보로 고민하는 친구에게 이 서비스를 소개해주세요. 더 많은
            대학원생 멘토를 확보하는 데 큰 도움이 됩니다.
          </p>
        </div>

        <a
          href="/"
          className="block w-full bg-indigo-700 text-white text-center font-semibold py-3.5 rounded-xl hover:bg-indigo-800 transition-colors"
        >
          처음으로 돌아가기
        </a>
      </div>
    </main>
  );
}

export default function WaitlistPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <WaitlistContent />
    </Suspense>
  );
}
