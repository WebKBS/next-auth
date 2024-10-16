// import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";
import Credentials from "@auth/core/providers/credentials";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        // zod 유효성 성공시
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          // 이메일로 사용자 찾기
          const user = await getUserByEmail(email);

          // 사용자가 없거나 비밀번호가 없으면 null 반환
          if (!user || !user.password) {
            return null;
          }

          // 비밀번호 일치 여부 확인
          const passwordsMatch = await bcrypt.compare(password, user.password);

          // 비밀번호가 일치하면 사용자 반환
          if (passwordsMatch) {
            return user;
          }
        }

        // 사용자가 없거나 비밀번호가 일치하지 않으면 null 반환
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
