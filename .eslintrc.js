module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    commonjs: true,
    jquery: true,
    node: true,
  },
  plugins: ["prettier"],
  extends: ["airbnb", "eslint:recommended", "plugin:prettier/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: "module",
  },
  rules: {
    semi: "error",
    indent: "off",
    sub: "off",
    camelcase: "off",
    "no-console": "off",
    "no-unused-vars": "warn",
    "no-plusplus": "off",
    "no-continue": "off",
    "no-restricted-globals": "off",
  },
};
