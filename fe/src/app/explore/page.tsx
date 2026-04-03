"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { track, assignCardType } from "@/lib/analytics";
import { labs } from "@/lib/mock-data";
import type { Lab } from "@/types";

const UNIVERSITIES = ["전체", "KAIST", "서울대", "연세대", "포스텍", "UNIST", "고려대", "성균관대"];

export default function ExplorePage() {
  const [selectedUniv, setSelectedUniv] = useState("전체");
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    assignCardType(); // A/B 유형 세션에 배정
    track("explore_view");
  }, []);

  const filtered = labs.filter((lab) => {
    const matchUniv = selectedUniv === "전체" || lab.university === selectedUniv;
    const matchSearch =
      search === "" ||
      lab.professor.includes(search) ||
      lab.researchArea.includes(search) ||
      lab.department.includes(search);
    return matchUniv && matchSearch;
  });

  function handleFilterChange(univ: string) {
    setSelectedUniv(univ);
    setShowFilter(false);
    track("explore_filter_use", { university: univ });
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* 헤더 */}
      <header className="bg-white border-b border-slate-100 px-5 pt-12 pb-5 sticky top-0 z-10">
        <div className="max-w-lg mx-auto">
          <h1 className="text-xl font-bold text-slate-900 mb-4">
            관심 연구실을 찾아보세요
          </h1>
          {/* 검색바 */}
          <div className="relative mb-3">
            <input
              type="text"
              placeholder="교수명, 연구분야로 검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-100 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <span className="absolute right-3 top-3 text-slate-400">🔍</span>
          </div>
          {/* 학교 필터 */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {UNIVERSITIES.map((univ) => (
              <button
                key={univ}
                onClick={() => handleFilterChange(univ)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  selectedUniv === univ
                    ? "bg-indigo-700 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {univ}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 결과 */}
      <section className="px-5 py-5">
        <div className="max-w-lg mx-auto">
          <p className="text-slate-500 text-xs mb-4">
            {filtered.length}개 연구실
          </p>

          <div className="space-y-4">
            {filtered.map((lab) => (
              <LabCard key={lab.id} lab={lab} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-400 text-sm">
                검색 결과가 없습니다.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function LabCard({ lab }: { lab: Lab }) {
  return (
    <Link
      href={`/mentor/${lab.id}`}
      onClick={() => track("lab_card_click", { lab_id: lab.id, university: lab.university })}
      className="block bg-white rounded-2xl p-5 border border-slate-100 hover:border-indigo-200 hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs text-slate-400 mb-0.5">
            {lab.university} · {lab.department}
          </p>
          <p className="text-lg font-bold text-slate-900">{lab.professor}</p>
        </div>
        <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full font-medium flex-shrink-0 ml-2">
          재학생 {lab.mentorCount}명
        </span>
      </div>

      {/* 연구분야 태그 */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {lab.researchAreaTags.map((tag) => (
          <span
            key={tag}
            className="text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* 특징 태그 */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {lab.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="text-indigo-500 text-sm">→</span>
      </div>
    </Link>
  );
}
