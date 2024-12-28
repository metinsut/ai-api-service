import { hash, verify } from "@/lib/crypto";
import type { User } from "@/lib/db/schema/users";
import { UnauthorizedError } from "@/lib/errors";
import type { LoginInput } from "./schema";
import { findUserByEmail, updatePassword } from "../users/repository";

export const loginUser = async ({ email, password }: LoginInput): Promise<User> => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const isValid = await verify(password, user.password);
  if (!isValid) {
    throw new UnauthorizedError("Invalid credentials");
  }

  return user;
};

export const findUserByEmailOrThrow = async (email: string): Promise<User> => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new UnauthorizedError("User not found");
  }
  return user;
};

export const updateUserPassword = async (userId: number, password: string): Promise<void> => {
  const hashedPassword = await hash(password);
  await updatePassword(userId, hashedPassword);
};
