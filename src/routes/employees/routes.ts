import { OpenAPIHono } from "@hono/zod-openapi";
import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { employeeInsertSchema } from "@/lib/db/schema/employees";
import {
  getAllEmployeesHandler,
  getEmployeeHandler,
  createEmployeeHandler,
  updateEmployeeHandler,
  deleteEmployeeHandler,
  seedEmployeesHandler,
  getNumberOfEmployeesHandler,
} from "./controller";

const employees = new OpenAPIHono();

employees.post(
  "/seed",
  describeRoute({
    tags: ["Employees"],
    summary: "Seed 100 random employees",
    responses: {
      200: {
        description: "Employees seeded successfully",
      },
      500: {
        description: "Failed to seed employees",
      },
    },
  }),
  seedEmployeesHandler,
);

employees.get(
  "/get-number-of-employees",
  describeRoute({
    tags: ["Employees"],
    summary: "Get number of employees",
    responses: {
      200: {
        description: "Number of employees",
      },
    },
  }),
  getNumberOfEmployeesHandler,
);

employees.get(
  "/",
  describeRoute({
    tags: ["Employees"],
    summary: "Get all employees",
    responses: {
      200: {
        description: "List of employees",
      },
    },
  }),
  getAllEmployeesHandler,
);

employees.get(
  "/:id",
  describeRoute({
    tags: ["Employees"],
    summary: "Get employee by ID",
    responses: {
      200: {
        description: "Employee details",
      },
      404: {
        description: "Employee not found",
      },
    },
  }),
  getEmployeeHandler,
);

employees.post(
  "/",
  describeRoute({
    tags: ["Employees"],
    summary: "Create new employee",
    responses: {
      201: {
        description: "Employee created",
      },
      400: {
        description: "Invalid input",
      },
      409: {
        description: "Email already exists",
      },
    },
  }),
  validator("json", employeeInsertSchema),
  createEmployeeHandler,
);

employees.patch(
  "/:id",
  describeRoute({
    tags: ["Employees"],
    summary: "Update employee",
    responses: {
      200: {
        description: "Employee updated",
      },
      404: {
        description: "Employee not found",
      },
      409: {
        description: "Email already exists",
      },
    },
  }),
  validator("json", employeeInsertSchema),
  updateEmployeeHandler,
);

employees.delete(
  "/:id",
  describeRoute({
    tags: ["Employees"],
    summary: "Delete employee",
    responses: {
      204: {
        description: "Employee deleted",
      },
      404: {
        description: "Employee not found",
      },
    },
  }),
  deleteEmployeeHandler,
);

export { employees };
