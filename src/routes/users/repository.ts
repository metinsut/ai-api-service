import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import type { User, NewUser } from "@/lib/db/schema/users";

export const findAllUsers = async (): Promise<User[]> => {
  return db.select().from(users);
};

export const findUserById = async (id: number): Promise<User | null> => {
  const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return user || null;
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return user || null;
};

export const createUser = async (data: NewUser): Promise<User> => {
  const [user] = await db.insert(users).values(data).returning();
  return user;
};

export const updateUserById = async (id: number, data: Partial<NewUser>): Promise<User | null> => {
  const [user] = await db
    .update(users)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(users.id, id))
    .returning();
  return user || null;
};

export const updatePassword = async (userId: number, hashedPassword: string): Promise<void> => {
  await db
    .update(users)
    .set({
      password: hashedPassword,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId));
};

export const deleteUserById = async (id: number): Promise<void> => {
  await db.delete(users).where(eq(users.id, id));
};
