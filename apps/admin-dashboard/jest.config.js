const path = require('path');
const tsJest = require('../../node_modules/ts-jest/dist/index.js');

module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': [tsJest.TsJestTransformer, { isolatedModules: true }],
  },
  roots: ['<rootDir>'],
  testMatch: [
    '__tests__/**/*.+(ts|tsx|js)',
    '?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  moduleDirectories: ['node_modules', '../node_modules', '../../node_modules'],
};