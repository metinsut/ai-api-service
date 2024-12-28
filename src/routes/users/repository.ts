import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import type { NewUser, User } from "@/lib/db/schema";
import { hash } from "@/lib/crypto";
import { eq } from "drizzle-orm";

export class UserRepository {
  async create(data: NewUser): Promise<User> {
    const hashedPassword = await hash(data.password);
    const [user] = await db
      .insert(users)
      .values({ ...data, password: hashedPassword })
      .returning();
    return user;
  }

  async findById(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async update(id: number, data: Partial<NewUser>): Promise<User> {
    const [user] = await db.update(users).set(data).where(eq(users.id, id)).returning();
    return user;
  }

  async delete(id: number): Promise<User> {
    const [user] = await db.delete(users).where(eq(users.id, id)).returning();
    return user;
  }

  async findAll(): Promise<User[]> {
    return db.select().from(users);
  }
}

export const userRepository = new UserRepository();
