import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "tr"],
  defaultLocale: "en",
  localeDetection: true,
  localePrefix: "as-needed",
});
