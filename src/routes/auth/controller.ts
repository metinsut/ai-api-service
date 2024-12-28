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
  const { newPassword } = await c.req.json();
  const user = c.get("user");
  await updateUserPassword(user.id, newPassword);
  return c.json({ message: "Password reset successful" });
};

export const logoutHandler = async (c: Context) => {
  c.set("user", null);
  return c.json({ message: "Logged out" });
};
