module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react-hooks", "jsx-a11y"],
  extends: [
    "eslint-config-prettier",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  rules: {
    "react/react-in-jsx-scope": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/no-var-requires": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/interactive-supports-focus": 0,
  },
  env: {
    "jest/globals": true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
};
