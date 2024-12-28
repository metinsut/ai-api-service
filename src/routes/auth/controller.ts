import type { Context } from "hono";
import { sign } from "hono/jwt";
import { env } from "@/config/env";
import { UnauthorizedError } from "@/lib/errors";
import { loginUser, findUserByEmail, updateUserPassword } from "./service";
import { userService } from "../users/service";

export const login = async (c: Context) => {
  const data = await c.req.json();
  const user = await loginUser(data);

  if (!user) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const token = await sign({ sub: user.id }, env.auth.secret);
  return c.json({ token });
};

export const register = async (c: Context) => {
  const data = await c.req.json();
  const user = await userService.createUser(data);
  const token = await sign({ sub: user.id }, env.auth.secret);
  return c.json({ token }, 201);
};

export const forgotPassword = async (c: Context) => {
  const data = await c.req.json();
  const user = await findUserByEmail(data.email);

  if (!user) {
    throw new UnauthorizedError("Email not found");
  }

  // TODO: Send reset password email
  // For now, just return success
  return c.json({ message: "Reset email sent" });
};

export const resetPassword = async (c: Context) => {
  const { password } = await c.req.json();
  //   const token = c.get("bearerAuth.token");

  // TODO: Verify reset token
  // For now, just update password with a mock user id
  await updateUserPassword(1, password);
  return c.json({ message: "Password reset successful" });
};
