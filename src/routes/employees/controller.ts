import type { Context } from "hono";
import {
  getAllEmployees,
  getEmployeeById,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
} from "./service";

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
