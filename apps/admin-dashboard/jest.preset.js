const { defaults: tsJestPreset } = require('ts-jest');

module.exports = {
  ...tsJestPreset,
  testEnvironment: 'jsdom',
};