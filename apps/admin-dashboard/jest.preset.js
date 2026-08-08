const { createJestPreset } = require("ts-jest");

module.exports = {
  ...createJestPreset(),
  testEnvironment: "jsdom",
};
