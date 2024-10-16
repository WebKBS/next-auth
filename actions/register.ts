"use server";

import { z } from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import db from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "유효성 검사 실패!" };
  }

  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const { email, password, name } = validatedFields.data;

  // 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(password, 10);

  // 이미 존재하는 이메일인지 확인
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "이미 존재하는 이메일입니다." };
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  // TODO: 이메일 확인 보내기

  return { success: "전송 완료!" };
};
