import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ye Yint Myint Myat — Frontend Developer",
  description:
    "Portfolio of Ye Yint Myint Myat, Frontend Developer skilled in React, Next.js, TypeScript and UI/UX design.",
  openGraph: {
    title: "Ye Yint Myint Myat — Frontend Developer",
    description:
      "Portfolio of Ye Yint Myint Myat, Frontend Developer skilled in React, Next.js, TypeScript and UI/UX design.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-dm antialiased">{children}</body>
    </html>
  );
}
