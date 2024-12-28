import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { hash, verify } from "@/lib/crypto";
import type { LoginInput, RegisterInput } from "./schema";
import type { User } from "@/lib/db/schema/users";

export const loginUser = async ({ email, password }: LoginInput): Promise<User | null> => {
  const user = await findUserByEmail(email);
  if (!user) return null;

  const isValid = await verify(password, user.password);
  if (!isValid) return null;

  return user;
};

export const registerUser = async ({ name, email, password }: RegisterInput): Promise<User> => {
  const hashedPassword = await hash(password);

  const [user] = await db
    .insert(users)
    .values({
      name,
      email,
      password: hashedPassword,
    })
    .returning();

  return user;
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return user || null;
};

export const updateUserPassword = async (userId: number, newPassword: string): Promise<void> => {
  const hashedPassword = await hash(newPassword);

  await db
    .update(users)
    .set({
      password: hashedPassword,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId));
};
