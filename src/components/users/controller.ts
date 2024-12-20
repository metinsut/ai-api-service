import type { Context } from "hono";
import { userService } from "./service";

export const createUser = async (c: Context) => {
  const data = await c.req.json();
  const user = await userService.createUser(data);
  return c.json({ status: "success", data: user }, 201);
};

export const getUser = async (c: Context) => {
  const id = c.req.param("id");
  const user = await userService.getUser(id);
  return c.json({ status: "success", data: user });
};

export const updateUser = async (c: Context) => {
  const id = c.req.param("id");
  const data = await c.req.json();
  const user = await userService.updateUser(id, data);
  return c.json({ status: "success", data: user });
};

export const deleteUser = async (c: Context) => {
  const id = c.req.param("id");
  await userService.deleteUser(id);
  return c.json({ status: "success", message: "User deleted" });
};

export const getAllUsers = async (c: Context) => {
  const users = await userService.getAllUsers();
  return c.json({ status: "success", data: users });
};
