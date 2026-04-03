"use client";

import { useEffect } from "react";
import Link from "next/link";
import { track } from "@/lib/analytics";

export default function LandingPage() {
  useEffect(() => {
    track("landing_view");
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-indigo-700 text-white px-5 pt-16 pb-14">
        <div className="max-w-lg mx-auto">
          <p className="text-indigo-300 text-sm font-medium mb-3">
            이공계 대학원 지원자를 위한 정보 플랫폼
          </p>
          <h1 className="text-3xl font-bold leading-snug mb-4">
            연구실 컨택,<br />아는 선배 없어도 됩니다
          </h1>
          <p className="text-indigo-100 text-base leading-relaxed mb-8">
            재학 중인 대학원생과 15분 전화로, 아무도 알려주지 않는 연구실
            내부 정보를 얻으세요.
          </p>
          <Link
            href="/explore"
            onClick={() => track("landing_cta_click")}
            className="block w-full bg-white text-indigo-700 text-center font-semibold text-base py-3.5 rounded-xl hover:bg-indigo-50 transition-colors"
          >
            내 관심 연구실 찾기 →
          </Link>
          <p className="text-indigo-300 text-xs text-center mt-3">
            현재 베타 오픈 중 · 무료로 시작하세요
          </p>
        </div>
      </section>

      {/* 수치 */}
      <section className="bg-indigo-800 text-white px-5 py-5">
        <div className="max-w-lg mx-auto grid grid-cols-3 divide-x divide-indigo-600">
          {[
            { value: "127명", label: "베타 신청자" },
            { value: "15분", label: "평균 상담 시간" },
            { value: "15,000원", label: "상담 비용" },
          ].map((stat) => (
            <div key={stat.label} className="text-center px-3">
              <p className="text-xl font-bold text-white">{stat.value}</p>
              <p className="text-indigo-300 text-xs mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 문제 섹션 */}
      <section className="px-5 py-12 bg-slate-50">
        <div className="max-w-lg mx-auto">
          <p className="text-indigo-600 text-sm font-semibold mb-2">PROBLEM</p>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            대학원 정보,<br />어디서 구하고 계신가요?
          </h2>
          <p className="text-slate-500 text-sm mb-8">
            기존 방법들은 모두 한계가 있습니다.
          </p>

          <div className="space-y-4">
            {[
              {
                icon: "💬",
                title: "김박사넷 익명 후기",
                desc: "신뢰도 낮은 익명 텍스트, 최근 정보 찾기 어렵고 맥락도 없어요.",
              },
              {
                icon: "📋",
                title: "하이그래드넷·에브리타임",
                desc: "공고 게시판 수준이거나, 대학원생 접근 자체가 막혀있어요.",
              },
              {
                icon: "💰",
                title: "유료 컨설팅",
                desc: "50~200만 원 수준. 접근하기 어렵고 연구실 내부 정보는 부족해요.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-5 border border-slate-100 flex gap-4"
              >
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="font-semibold text-slate-800 mb-1">
                    {item.title}
                  </p>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 솔루션 */}
      <section className="px-5 py-12 bg-white">
        <div className="max-w-lg mx-auto">
          <p className="text-indigo-600 text-sm font-semibold mb-2">SOLUTION</p>
          <h2 className="text-2xl font-bold text-slate-900 mb-8">
            재학생에게<br />직접 물어보세요
          </h2>

          <div className="space-y-6">
            {[
              {
                step: "01",
                title: "관심 연구실 선택",
                desc: "KAIST, 서울대, 연세대, 포스텍 등 원하는 연구실을 찾아요.",
              },
              {
                step: "02",
                title: "재학 대학원생 선택",
                desc: "컨택 전략, 연구실 내부 정보, 진로 등 원하는 주제의 멘토를 골라요.",
              },
              {
                step: "03",
                title: "15분 전화 상담",
                desc: "15,000원으로 아무도 알려주지 않는 연구실 내부 정보를 얻어요.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-700 text-white flex items-center justify-center font-bold text-sm">
                  {item.step}
                </div>
                <div className="pt-1">
                  <p className="font-semibold text-slate-800 mb-1">
                    {item.title}
                  </p>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 사회적 증거 */}
      <section className="px-5 py-12 bg-indigo-50">
        <div className="max-w-lg mx-auto">
          <p className="text-indigo-600 text-sm font-semibold mb-2 text-center">
            EARLY ACCESS
          </p>
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">
            이미 127명이<br />신청했습니다
          </h2>
          <p className="text-slate-500 text-sm text-center mb-8">
            베타 기간 중 먼저 신청하신 분들께 우선 연결 기회를 드립니다.
          </p>

          <div className="space-y-4 mb-8">
            {[
              {
                q: "서울대 컨택 메일 보내도 답장이 없어요",
                a: "교수님이 어떤 키워드에 반응하는지 알려드렸더니 답장 받으셨어요.",
              },
              {
                q: "인건비가 얼마인지, 야근 문화는 어떤지 궁금해요",
                a: "실수령액부터 연구실 분위기까지 솔직하게 얘기해드렸어요.",
              },
              {
                q: "학점이 낮은데 KAIST 갈 수 있을까요?",
                a: "전략적으로 접근하면 충분히 가능하다는 걸 경험으로 증명했어요.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="bg-white rounded-2xl p-5 border border-indigo-100"
              >
                <p className="text-slate-700 text-sm font-medium mb-2">
                  ❝ {item.q}
                </p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  → {item.a}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/explore"
            onClick={() => track("landing_cta_click")}
            className="block w-full bg-indigo-700 text-white text-center font-semibold text-base py-3.5 rounded-xl hover:bg-indigo-800 transition-colors"
          >
            내 관심 연구실 찾기 →
          </Link>
          <p className="text-slate-400 text-xs text-center mt-3">
            지금 신청하면 베타 기간 무료로 시작하세요
          </p>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="px-5 py-8 border-t border-slate-100 bg-white">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-slate-800 font-semibold mb-1">Peer Intel</p>
          <p className="text-slate-400 text-xs">
            이공계 대학원 진학 정보 비대칭 해소 프로젝트
          </p>
        </div>
      </footer>
    </main>
  );
}
