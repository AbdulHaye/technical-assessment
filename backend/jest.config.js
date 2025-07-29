module.exports = {
  testEnvironment: "node",
  preset: "ts-jest",
  testMatch: [
    "<rootDir>/tests/**/*.test.ts",
    "<rootDir>/integration/tests/**/*.test.ts",
  ],
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts"],
  moduleDirectories: ["node_modules", "integration/node_modules"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
