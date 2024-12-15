import type { Context, Next } from "hono";
import pino from "pino";
import { config } from "../config/env";

const transport = pino.transport({
  target: "pino-pretty",
  options: {
    colorize: true,
    ignore: "pid,hostname",
    translateTime: "UTC:yyyy-mm-dd HH:MM:ss.l",
  },
});

export const logger = pino(
  {
    level: config.logger.level,
    formatters: {
      level: (label) => {
        return { level: label };
      },
    },
  },
  transport,
);

// Request context logger middleware for Hono
export const requestLogger =
  (message = "HTTP Request") =>
  async (c: Context, next: Next) => {
    const start = performance.now();
    await next();
    const end = performance.now();

    logger.info({
      msg: message,
      method: c.req.method,
      url: c.req.url,
      status: c.res.status,
      duration: `${(end - start).toFixed(2)}ms`,
    });
  };
