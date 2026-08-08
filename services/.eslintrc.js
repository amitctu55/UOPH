/**
 * ESLint config for NestJS microservices / libs.
 * Kept separate from apps config so eslint-config-react-app's
 * nested @typescript-eslint@5 does not shadow the repo's v8 plugin.
 */

module.exports = {
  root: true,
  ignorePatterns: ["dist/", "node_modules/", "coverage/", "*.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
    ],
    "no-unused-vars": "off",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prefer-const": "error",
    eqeqeq: ["error", "always"],
    curly: ["error", "multi-line"],
  },
};
