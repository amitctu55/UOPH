module.exports = {
  testEnvironment: "node",
  preset: "ts-jest",
  roots: ["<rootDir>"],
  testMatch: ["**/__tests__/**/*.+(ts|tsx|js)", "**/?(*.)+(spec|test).+(ts|tsx|js)"],
};