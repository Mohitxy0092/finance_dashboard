import { hc } from "hono/client";
import type { AppType } from "@/app/api/route";

// This will be used on both server & client
const baseUrl =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    : ""; // use relative URL in browser

const fetchWithCredentials: typeof fetch = (input, init) =>
  fetch(input, { ...(init ?? {}), credentials: "include" });

export const client = hc<AppType>(baseUrl, {
  fetch: fetchWithCredentials as any,
});
