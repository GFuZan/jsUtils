/** @format */

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: ["prettier"],
  parserOptions: {
    ecmaVersion: 12
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error"
  }
};
