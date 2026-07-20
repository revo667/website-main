import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    target: "node",
  },
  nitro: {
    preset: "node-server",
  },
});