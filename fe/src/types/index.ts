export interface Lab {
  id: string;
  professor: string;
  university: string;
  department: string;
  researchArea: string;
  researchAreaTags: string[];
  mentorCount: number;
  tags: string[];
  slug: string;
}

export interface Mentor {
  id: string;
  labId: string;
  nickname: string;
  cardType: "A" | "B" | "C" | "D";
  researchArea: string;
  degree: "MS" | "PhD" | "MS/PhD";
  yearsInLab: number;
  consultTopics: string[];
  rating: number;
  consultCount: number;
  intro: string;
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
