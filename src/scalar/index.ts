import { apiReference } from "@scalar/hono-api-reference";
import { openAPISpecs } from "hono-openapi";
import type { OpenAPIHono } from "@hono/zod-openapi";

export const configureOpenAPI = (app: OpenAPIHono) => {
  app.get(
    "/openapi",
    openAPISpecs(app, {
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

  app.get(
    "/scalar",
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
};
