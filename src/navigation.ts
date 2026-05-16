import { createNavigation } from "next-intl/navigation";
import { routing } from "./proxy";

export const { Link, useRouter, usePathname, redirect } =
  createNavigation(routing);
