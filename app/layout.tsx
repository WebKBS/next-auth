import type { Metadata } from "next";
import "./globals.css";
import db from "@/lib/db";

export const metadata: Metadata = {
  title: "Next Auth 만들기",
  description: "Next.js로 인증 시스템 만들기",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await db.user.findMany();
  console.log("user", user);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
