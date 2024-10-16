import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db), // PrismaAdapter를 사용하도록 설정
  session: { strategy: "jwt" }, // 세션 설정 - jwt 전략 사용
  ...authConfig, // 구조분해를 통해 authConfig의 내용을 가져옴
});
