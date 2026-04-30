import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
});

const dm = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm",
});

export const metadata: Metadata = {
  title: "Ye Yint Myint Myat — Frontend Developer",
  description:
    "Portfolio of Ye Yint Myint Myat, Frontend Developer skilled in React, Next.js, TypeScript and UI/UX design.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dm.variable}`}>
      <body className="font-dm antialiased">{children}</body>
    </html>
  );
}
