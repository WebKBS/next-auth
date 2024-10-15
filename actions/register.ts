"use server";

import { z } from "zod";
import { RegisterSchema } from "@/schemas";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "유효성 검사 실패!" };
  }

  // await new Promise((resolve) => setTimeout(resolve, 3000));

  console.log(values);

  return { success: "전송 완료!" };
};
