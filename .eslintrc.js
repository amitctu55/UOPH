/**
 * ESLint configuration for the UpChar Enterprise Platform monorepo
 */

const path = require('path');

module.exports = {
  root: true,
  ignorePatterns: [
    // We'll remove this for now because it was causing files to be ignored
    // We can add specific ignores if needed
  ],
  overrides: [
    {
      // Configuration for React apps (admin-dashboard, doctor-dashboard, etc.)
      files: [
        'apps/**/*.ts',
        'apps/**/*.tsx',
        'apps/**/*.js',
        'apps/**/*.jsx'
      ],
      extends: [
        'react-app',
        'react-app/jest'
      ],
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      },
      settings: {
        'import/resolver': {
          typescript: {
            // This allows using the @aliases from tsconfig.json
            project: [path.resolve(__dirname, 'tsconfig.json')]
          },
          node: {
            // Allow importing from nested directories
            paths: [__dirname]
          }
        }
      }
    },
    {
      // Configuration for Node.js services (NestJS microservices) and libraries
      files: [
        'services/**/*.ts',
        'services/**/*.tsx',
        'libs/**/*.ts',
        'libs/**/*.tsx'
      ],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
      },
      plugins: [
        '@typescript-eslint'
      ],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended'
      ],
      rules: {
        // TypeScript-specific rules
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

        // General style rules
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'prefer-const': 'error',
        'eqeqeq': ['error', 'always'],
        'curly': ['error', 'multi-line'],

        // Import rules
        'import/no-unresolved': 'off',
        'import/extensions': [
          'error',
          'ignorePackages',
          {
            'ts': 'never',
            'tsx': 'never',
            'js': 'never',
            'jsx': 'never'
          }
        ]
      },
      settings: {
        'import/resolver': {
          typescript: {
            // This allows using the @aliases from tsconfig.json
            project: [path.resolve(__dirname, 'tsconfig.json')]
          },
          node: {
            // Allow importing from nested directories
            paths: [__dirname]
          }
        }
      }
    }
  ]
};