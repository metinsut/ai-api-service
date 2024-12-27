import type { NewUser } from "@/lib/db/schema";
import { ConflictError, NotFoundError } from "@/lib/errors";
import { logger } from "@/lib/logger";
import { i18n } from "@/lib/i18n";
import { userRepository } from "@/routes/users/repository";

export class UserService {
  async createUser(data: NewUser) {
    logger.debug({ data }, "Creating user");

    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictError(i18n.t("emailExists", { ns: "users" }));
    }

    // TODO: Hash password before saving
    const user = await userRepository.create(data);
    return user;
  }

  async getUser(id: string) {
    const userId = Number.parseInt(id, 10);
    if (Number.isNaN(userId)) {
      throw new NotFoundError(i18n.t("invalidId", { ns: "users" }));
    }

    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError(i18n.t("notFound", { ns: "users" }));
    }
    return user;
  }

  async updateUser(id: string, data: Partial<NewUser>) {
    const userId = Number.parseInt(id, 10);
    if (Number.isNaN(userId)) {
      throw new NotFoundError(i18n.t("invalidId", { ns: "users" }));
    }

    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError(i18n.t("notFound", { ns: "users" }));
    }

    if (data.email && data.email !== user.email) {
      const existingUser = await userRepository.findByEmail(data.email);
      if (existingUser) {
        throw new ConflictError(i18n.t("emailExists", { ns: "users" }));
      }
    }

    return userRepository.update(userId, data);
  }

  async deleteUser(id: string) {
    const userId = Number.parseInt(id, 10);
    if (Number.isNaN(userId)) {
      throw new NotFoundError(i18n.t("invalidId", { ns: "users" }));
    }

    const user = await userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError(i18n.t("notFound", { ns: "users" }));
    }

    return userRepository.delete(userId);
  }

  async getAllUsers() {
    return userRepository.findAll();
  }
}

export const userService = new UserService();
