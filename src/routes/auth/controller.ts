import type { Context } from "hono";
import { sign } from "hono/jwt";
import { env } from "@/config/env";
import { loginUser, findUserByEmailOrThrow, updateUserPassword } from "./service";
import { createNewUser } from "../users/service";

export const loginHandler = async (c: Context) => {
  const data = await c.req.json();
  const user = await loginUser(data);
  const token = await sign({ sub: user.id }, env.auth.secret);
  return c.json({ token });
};

export const registerHandler = async (c: Context) => {
  const data = await c.req.json();
  const user = await createNewUser(data);
  const token = await sign({ sub: user.id }, env.auth.secret);
  return c.json({ token }, 201);
};

export const forgotPasswordHandler = async (c: Context) => {
  const data = await c.req.json();
  await findUserByEmailOrThrow(data.email);
  // TODO: Send reset password email
  return c.json({ message: "Reset email sent" });
};

export const resetPasswordHandler = async (c: Context) => {
  const { password } = await c.req.json();
  // TODO: Verify reset token
  // For now, just update password with a mock user id
  await updateUserPassword(1, password);
  return c.json({ message: "Password reset successful" });
};
