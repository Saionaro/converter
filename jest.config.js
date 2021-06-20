module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      diagnostics: false,
      isolatedModules: true,
      tsconfig: {
        jsx: "react",
      },
    },
  },
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", "."],
  cacheDirectory: "node_modules/.cache/jest",
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/src/$1",
    ".*module.css": "<rootDir>/__mocks__/styleMock.js",
  },
};
