import type { Context, Next } from "hono";
import { z } from "zod";
import { ValidationError } from "../lib/errors.js";

type ValidationTarget = "query" | "params" | "body";

// Context type extension for TypeScript support
declare module "hono" {
  interface ContextVariableMap {
    validated: unknown;
  }
}

export const validate = <T extends z.ZodType>(schema: T, target: ValidationTarget = "body") => {
  return async (c: Context, next: Next) => {
    try {
      let data: unknown;

      switch (target) {
        case "query":
          data = c.req.query();
          break;
        case "params":
          data = c.req.param();
          break;
        case "body":
          data = await c.req.json();
          break;
      }

      const validatedData = await schema.parseAsync(data);

      // Add validated data to context
      c.set("validated", validatedData);

      await next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string[]> = {};

        for (const err of error.errors) {
          const path = err.path.join(".");
          if (!errors[path]) {
            errors[path] = [];
          }
          errors[path].push(err.message);
        }

        throw new ValidationError("Validation failed", errors);
      }

      throw error;
    }
  };
};

// Type helper for accessing validated data
export type ValidatedData<T extends z.ZodType> = z.infer<T>;
