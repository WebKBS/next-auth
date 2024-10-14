"use server";

import { z } from "zod";
import { LoginSchema } from "@/schemas";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "유효성 검사 실패!" };
  }

  // await new Promise((resolve) => setTimeout(resolve, 3000));

  console.log(values);

  return { success: "전송 완료!" };
};
