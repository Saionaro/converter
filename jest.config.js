module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["."],
  moduleNameMapper: {
    "src/(.*)": "<rootDir>/src/$1",
  },
};
