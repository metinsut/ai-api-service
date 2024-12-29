import { db } from "@/lib/db";
import { employees } from "@/lib/db/schema/employees";
import { eq } from "drizzle-orm";
import type { Employee, NewEmployee } from "@/lib/db/schema/employees";

export const findAllEmployees = async (): Promise<Employee[]> => {
  return db.select().from(employees);
};

export const findEmployeeById = async (id: number): Promise<Employee | null> => {
  const [employee] = await db.select().from(employees).where(eq(employees.id, id)).limit(1);
  return employee || null;
};

export const findEmployeeByEmail = async (email: string): Promise<Employee | null> => {
  const [employee] = await db.select().from(employees).where(eq(employees.email, email)).limit(1);
  return employee || null;
};

export const createEmployee = async (data: NewEmployee): Promise<Employee> => {
  const [employee] = await db.insert(employees).values(data).returning();
  return employee;
};

export const updateEmployeeById = async (
  id: number,
  data: Partial<NewEmployee>,
): Promise<Employee | null> => {
  const [employee] = await db
    .update(employees)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(employees.id, id))
    .returning();
  return employee || null;
};

export const deleteEmployeeById = async (id: number): Promise<void> => {
  await db.delete(employees).where(eq(employees.id, id));
};
