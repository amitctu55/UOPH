/**
 * ESLint configuration for UpChar monorepo React apps.
 * Services use `.eslintrc.services.js` to avoid @typescript-eslint
 * version conflicts with eslint-config-react-app (v5 vs repo v8).
 */

const path = require('path');

module.exports = {
  root: true,
  ignorePatterns: ['**/node_modules/**', '**/dist/**', '**/.next/**', '**/coverage/**'],
  overrides: [
    {
      files: ['apps/**/*.ts', 'apps/**/*.tsx', 'apps/**/*.js', 'apps/**/*.jsx'],
      extends: ['react-app', 'react-app/jest'],
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      settings: {
        'import/resolver': {
          typescript: {
            project: [path.resolve(__dirname, 'tsconfig.json')],
          },
          node: {
            paths: [__dirname],
          },
        },
      },
    },
  ],
};
