"use client";

import { createClient } from "@/lib/supabase/client";

export type FunnelEventName =
  | "landing_view"
  | "landing_cta_click"
  | "explore_view"
  | "explore_filter_use"
  | "lab_card_click"
  | "mentor_view"
  | "mentor_card_type"
  | "mentor_cta_click"
  | "request_view"
  | "request_duration_select"
  | "payment_button_click"
  | "waitlist_view"
  | "waitlist_signup";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let sid = localStorage.getItem("peer_intel_sid");
  if (!sid) {
    sid = crypto.randomUUID();
    localStorage.setItem("peer_intel_sid", sid);
  }
  return sid;
}

export async function track(
  event: FunnelEventName,
  metadata?: Record<string, unknown>
): Promise<void> {
  try {
    const supabase = createClient();
    const sessionId = getSessionId();

    await supabase.from("funnel_events").insert({
      event,
      session_id: sessionId,
      metadata: metadata ?? {},
    });
  } catch {
    // 트래킹 실패는 사용자 경험에 영향 없이 무시
  }
}

export function assignCardType(): "A" | "B" | "C" | "D" {
  if (typeof window === "undefined") return "A";
  const existing = sessionStorage.getItem("card_type");
  if (existing && ["A", "B", "C", "D"].includes(existing)) {
    return existing as "A" | "B" | "C" | "D";
  }
  const types = ["A", "B", "C", "D"] as const;
  const assigned = types[Math.floor(Math.random() * 4)];
  sessionStorage.setItem("card_type", assigned);
  return assigned;
}

export function getCardType(): "A" | "B" | "C" | "D" | null {
  if (typeof window === "undefined") return null;
  const type = sessionStorage.getItem("card_type");
  if (type && ["A", "B", "C", "D"].includes(type)) {
    return type as "A" | "B" | "C" | "D";
  }
  return null;
}
