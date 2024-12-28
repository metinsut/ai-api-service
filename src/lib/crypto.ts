import { hash as bcryptHash, compare } from "bcrypt";

const SALT_ROUNDS = 10;

export const hash = (password: string): Promise<string> => {
  return bcryptHash(password, SALT_ROUNDS);
};

export const verify = (password: string, hash: string): Promise<boolean> => {
  return compare(password, hash);
};
