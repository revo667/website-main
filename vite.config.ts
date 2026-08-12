import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    target: "cloudflare-module",
  },
  nitro: {
    preset: "cloudflare_module",
  },
});