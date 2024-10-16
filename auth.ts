import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async session({ session, token }) {
      console.log("session token", token); // session token은 jwt token과 동일

      if (token.sub && session.user) {
        session.user.id = token.sub; // session.user.id에 jwt token의 sub를 할당
      } // session.user.id가 없다면 jwt token의 sub를 할당해서 커스텀으로 사용
      return session;
    },
    async jwt({ token }) {
      console.log("jwt token", token); // jwt sub는 사용자의 고유 식별자 === user.id

      return token;
    },
  },

  adapter: PrismaAdapter(db), // PrismaAdapter를 사용하도록 설정
  session: { strategy: "jwt", maxAge: 60 * 60 }, // 세션 설정 - jwt 전략 사용
  ...authConfig, // 구조분해를 통해 authConfig의 내용을 가져옴
});
