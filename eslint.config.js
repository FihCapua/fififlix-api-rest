import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.es2021,
      }
    },
    rules: {
      "indent": [
        "error",
        2
      ],
      "quotes": [
        "error",
        "double"
      ],
      "no-unused-vars": "warn",
      "no-console": "off",
    }
  }
];