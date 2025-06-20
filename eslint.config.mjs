import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "no-unused-vars": "off", // Tắt check biến chưa sử dụng
      "@typescript-eslint/no-unused-vars": "off", // Tắt no-unused-vars cho TypeScript
      "@typescript-eslint/no-explicit-any": "off", // ✅ tắt rule cảnh báo any
    },
  },
];

export default eslintConfig;
