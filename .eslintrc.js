module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
    project: "./tsconfig.eslint.json",
  },
  plugins: [
    "@typescript-eslint",
    "deprecation",
    "simple-import-sort",
    "react",
    "react-native",
  ],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "single"],
    semi: ["error", "always"],
    "max-len": ["error", { code: 120, comments: 120, ignoreComments: true }],
    "comma-dangle": ["error", "always-multiline"],
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/no-unused-vars": "error",
    "no-inner-declarations": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "deprecation/deprecation": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "sort-imports": "off",
    "import/order": "off",
    "comma-spacing": ["error", { before: false, after: true }],
  },
};
