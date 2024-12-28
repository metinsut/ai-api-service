import { hash } from "@/lib/crypto";
import type { NewUser, User } from "@/lib/db/schema/users";
import { NotFoundError } from "@/lib/errors";
import {
  findAllUsers,
  findUserById,
  createUser,
  updateUserById,
  deleteUserById,
} from "./repository";

export const getAllUsers = async (): Promise<User[]> => {
  return findAllUsers();
};

export const getUserById = async (id: number): Promise<User> => {
  const user = await findUserById(id);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  return user;
};

export const createNewUser = async (data: NewUser): Promise<User> => {
  const hashedPassword = await hash(data.password);
  return createUser({ ...data, password: hashedPassword });
};

export const updateUser = async (id: number, data: Partial<NewUser>): Promise<User> => {
  const user = await updateUserById(id, data);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  return user;
};

export const deleteUser = async (id: number): Promise<void> => {
  const user = await findUserById(id);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  await deleteUserById(id);
};
