import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    // pages는 NextAuth의 페이지 경로를 설정
    // 고정으로 된 디자인 외 새로운 페이지를 만들어 사용할 수 있음
    signIn: "/auth/login",
    error: "/auth/error",
  },

  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    // async signIn({ user }) {
    //   const existingUser = await getUserById(user.id);
    //
    //   // 만약 사용자가 없거나 이메일 인증이 되어있지 않다면 로그인을 거부
    //   if (!existingUser || !existingUser.emailVerified) {
    //     return false;
    //   }
    //
    //   return true;
    // },
    async session({ session, token }) {
      console.log("session token", token); // session token은 jwt token과 동일

      if (token.sub && session.user) {
        session.user.id = token.sub; // session.user.id에 jwt token의 sub를 할당
      } // session.user.id가 없다면 jwt token의 sub를 할당해서 커스텀으로 사용

      if (token.role && session.user) {
        return { ...session, user: { ...session.user, role: token.role } };
      } // jwt token의 role이 있다면 session.user.role에 할당

      return session;
    },
    async jwt({ token }) {
      // console.log("jwt token", token); // jwt sub는 사용자의 고유 식별자 === user.id

      if (!token.sub) return token; // jwt token에 sub이 없다면 그대로 반환

      const existingUser = await db.user.findUnique({
        where: { id: token.sub },
      }); // jwt token의 sub로 사용자를 찾음

      if (!existingUser) return token; // 사용자가 없다면 그대로 반환

      token.role = existingUser.role; // jwt token에 사용자의 role을 할당

      return token;
    },
  },

  adapter: PrismaAdapter(db), // PrismaAdapter를 사용하도록 설정
  session: { strategy: "jwt", maxAge: 60 * 60 }, // 세션 설정 - jwt 전략 사용 및 만료 시간 1시간
  ...authConfig, // 구조분해를 통해 authConfig의 내용을 가져옴
});
