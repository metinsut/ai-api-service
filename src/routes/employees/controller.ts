import type { Context } from "hono";
import { faker } from "@faker-js/faker";
import type { NewEmployee } from "@/lib/db/schema/employees";
import {
  getAllEmployees,
  getEmployeeById,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
} from "./service";

export const seedEmployeesHandler = async (c: Context) => {
  try {
    const employees: NewEmployee[] = Array.from({ length: 1000 }, () => ({
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      gender: faker.helpers.arrayElement(["Male", "Female", "Other"]),
      avatar: faker.image.avatar(),
      company: faker.company.name(),
      department: faker.commerce.department(),
      position: faker.person.jobTitle(),
      language: faker.helpers.arrayElement([
        "English",
        "Spanish",
        "French",
        "German",
        "Chinese",
        "Arabic",
        "Turkish",
        "Kurdish",
        "Farsi",
        "Japanese",
        "Korean",
        "Italian",
        "Portuguese",
        "Dutch",
        "Russian",
        "Polish",
        "Swedish",
        "Norwegian",
      ]),
      university: faker.company.name(),
      country: faker.location.country(),
      birthDate: faker.date.birthdate(),
    }));

    const createdEmployees = await Promise.all(
      employees.map((employee) => createNewEmployee(employee)),
    );

    return c.json({
      message: "Successfully seeded 1000 employees",
      count: createdEmployees.length,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return c.json({ error: "Failed to seed employees" }, 500);
  }
};

export const getAllEmployeesHandler = async (c: Context) => {
  const employees = await getAllEmployees();
  return c.json(employees);
};

export const getEmployeeHandler = async (c: Context) => {
  const id = Number(c.req.param("id"));
  const employee = await getEmployeeById(id);
  return c.json(employee);
};

export const createEmployeeHandler = async (c: Context) => {
  const data = await c.req.json();
  const employee = await createNewEmployee(data);
  return c.json(employee, 201);
};

export const updateEmployeeHandler = async (c: Context) => {
  const id = Number(c.req.param("id"));
  const data = await c.req.json();
  const employee = await updateEmployee(id, data);
  return c.json(employee);
};

export const deleteEmployeeHandler = async (c: Context) => {
  const id = Number(c.req.param("id"));
  await deleteEmployee(id);
  return new Response(null, { status: 204 });
};
