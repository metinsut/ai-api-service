import type { Context } from "hono";
import { getAllUsers, getUserById, createNewUser, updateUser, deleteUser } from "./service";

export const getUser = async (c: Context) => {
  const id = Number(c.req.param("id"));
  const user = await getUserById(id);
  return c.json(user);
};

export const createUser = async (c: Context) => {
  const data = await c.req.json();
  const user = await createNewUser(data);
  return c.json(user, 201);
};

export const updateUserHandler = async (c: Context) => {
  const id = Number(c.req.param("id"));
  const data = await c.req.json();
  const user = await updateUser(id, data);
  return c.json(user);
};

export const deleteUserHandler = async (c: Context) => {
  const id = Number(c.req.param("id"));
  await deleteUser(id);
  return c.json(true);
};

export const getAllUsersHandler = async (c: Context) => {
  const users = await getAllUsers();
  return c.json(users);
};
