import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/utils/test/setupTests.ts"],
    include: [
      "**/__tests__/**/*.?(c|m)[jt]s?(x)",
      "**/?(*.)+(spec|test).?(c|m)[jt]s?(x)",
    ],
    exclude: [...configDefaults.exclude, "**/node_modules/**", "**/dist/**"],
  },
});
