import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "이메일 입력이 잘못되었습니다.",
  }),
  password: z.string().min(1, {
    message: "비밀번호를 입력해주세요.",
  }),
});
