import i18next from "i18next";
import i18nextMiddleware from "i18next-http-middleware";
import { userTranslations } from "@/routes/users/langs";
import { logger } from "../logger";

// Translation resources
const resources = {
  en: {
    common: {},
    errors: {
      unauthorized: "Unauthorized",
      forbidden: "Forbidden",
      validation: "Validation error",
      internal: "Internal server error",
    },
    users: {
      ...userTranslations.en,
    },
  },
  tr: {
    common: {},
    errors: {
      unauthorized: "Yetkisiz erişim",
      forbidden: "Erişim engellendi",
      validation: "Doğrulama hatası",
      internal: "Sunucu hatası",
    },
    users: {
      ...userTranslations.tr,
    },
  },
};

i18next
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "tr"],
    defaultNS: "common",
    detection: {
      order: ["header", "querystring", "cookie"],
      lookupHeader: "accept-language",
      lookupQuerystring: "lng",
      lookupCookie: "i18next",
      caches: ["cookie"],
    },
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => {
    logger.info("i18next initialized");
  })
  .catch((error) => {
    logger.error(error, "i18next initialization failed");
  });

export const i18n = i18next;
