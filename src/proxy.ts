import createMiddleware from "next-intl/middleware";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en"],
  defaultLocale: "en",
  localeDetection: true,
});

export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
