import { OpenAPIHono } from "@hono/zod-openapi";
import { describeRoute } from "hono-openapi";
import { validator } from "hono-openapi/zod";
import { login, register, forgotPassword, resetPassword } from "./controller";
import { loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema } from "./schema";

const auth = new OpenAPIHono();

auth.post(
  "/login",
  describeRoute({
    tags: ["Auth"],
    summary: "Login to the system",
    responses: {
      200: {
        description: "Login successful",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                token: { type: "string" },
              },
            },
          },
        },
      },
      401: {
        description: "Invalid credentials",
      },
    },
  }),
  validator("json", loginSchema),
  login,
);

auth.post(
  "/register",
  describeRoute({
    tags: ["Auth"],
    summary: "Register a new user",
    responses: {
      201: {
        description: "Registration successful",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                token: { type: "string" },
              },
            },
          },
        },
      },
      400: {
        description: "Email already exists",
      },
    },
  }),
  validator("json", registerSchema),
  register,
);

auth.post(
  "/forgot-password",
  describeRoute({
    tags: ["Auth"],
    summary: "Request password reset",
    responses: {
      200: {
        description: "Reset email sent",
      },
      404: {
        description: "Email not found",
      },
    },
  }),
  validator("json", forgotPasswordSchema),
  forgotPassword,
);

auth.post(
  "/reset-password",
  describeRoute({
    tags: ["Auth"],
    summary: "Reset password with token",
    responses: {
      200: {
        description: "Password reset successful",
      },
      400: {
        description: "Invalid or expired token",
      },
    },
  }),
  validator("json", resetPasswordSchema),
  resetPassword,
);

export { auth };
