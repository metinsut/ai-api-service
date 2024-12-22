import type { Context, Next } from "hono";
import type { TFunction } from "i18next";
import { i18n } from "../lib/i18n";

// Extend Context type to include t function
declare module "hono" {
  interface ContextVariableMap {
    t: TFunction;
  }
}

export const i18nMiddleware = async (c: Context, next: Next) => {
  // Get language from header or query
  const lang = c.req.header("accept-language")?.split(",")[0] || "en";

  // Change language
  await i18n.changeLanguage(lang);

  // Add translation function to context
  c.set("t", i18n.t.bind(i18n));

  await next();
};
