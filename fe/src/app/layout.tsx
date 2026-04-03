import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Peer Intel — 연구실 내부 정보, 재학생에게 직접 묻다",
  description:
    "이공계 대학원 연구실 컨택, 아는 선배 없어도 됩니다. 재학 중인 대학원생과 15분 전화로 연구실 내부 정보를 얻으세요.",
  openGraph: {
    title: "Peer Intel",
    description: "연구실 컨택, 아는 선배 없어도 됩니다",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} h-full`}>
      <body className="min-h-full bg-white text-slate-900 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
