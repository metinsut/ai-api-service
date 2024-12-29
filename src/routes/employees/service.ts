import type { Employee, NewEmployee } from "@/lib/db/schema/employees";
import { NotFoundError, ConflictError } from "@/lib/errors";
import {
  findAllEmployees,
  findEmployeeById,
  findEmployeeByEmail,
  createEmployee,
  updateEmployeeById,
  deleteEmployeeById,
} from "./repository";

export const getAllEmployees = async (): Promise<Employee[]> => {
  return findAllEmployees();
};

export const getEmployeeById = async (id: number): Promise<Employee> => {
  const employee = await findEmployeeById(id);
  if (!employee) {
    throw new NotFoundError("Employee not found");
  }
  return employee;
};

export const createNewEmployee = async (data: NewEmployee): Promise<Employee> => {
  const existingEmployee = await findEmployeeByEmail(data.email);
  if (existingEmployee) {
    throw new ConflictError("Email already exists");
  }
  return createEmployee(data);
};

export const updateEmployee = async (id: number, data: Partial<NewEmployee>): Promise<Employee> => {
  if (data.email) {
    const existingEmployee = await findEmployeeByEmail(data.email);
    if (existingEmployee && existingEmployee.id !== id) {
      throw new ConflictError("Email already exists");
    }
  }

  const employee = await updateEmployeeById(id, data);
  if (!employee) {
    throw new NotFoundError("Employee not found");
  }
  return employee;
};

export const deleteEmployee = async (id: number): Promise<void> => {
  const employee = await findEmployeeById(id);
  if (!employee) {
    throw new NotFoundError("Employee not found");
  }
  await deleteEmployeeById(id);
};
