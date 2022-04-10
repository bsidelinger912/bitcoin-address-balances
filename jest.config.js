module.exports = {
  // setupFilesAfterEnv: [
  //   '@testing-library/jest-dom/extend-expect',
  //   '@testing-library/jest-dom',
  // ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  modulePathIgnorePatterns: ['fixtures.ts', 'data.ts'],
};
