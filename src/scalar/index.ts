import { OpenAPIHono } from "@hono/zod-openapi";
import { apiReference } from "@scalar/hono-api-reference";
import { openAPISpecs } from "hono-openapi";

export const scalarRouter = new OpenAPIHono();

scalarRouter.get(
  "/openapi",
  openAPISpecs(scalarRouter, {
    documentation: {
      info: {
        title: "Rhinobase Cloud",
        version: "1.0.0",
        description: "API Documentation",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
  }),
);

scalarRouter.get(
  "/reference",
  apiReference({
    theme: "kepler",
    layout: "classic",
    defaultHttpClient: {
      targetKey: "javascript",
      clientKey: "fetch",
    },
    spec: {
      url: "/openapi",
    },
  }),
);
