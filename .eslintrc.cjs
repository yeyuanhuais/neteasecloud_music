/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/eslint-config-typescript", "@vue/eslint-config-prettier/skip-formatting", "standard-with-typescript"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  env: {
    browser: true,
    es2021: true,
  },
  overrides: [],
  plugins: ["vue", "@typescript-eslint"],
  rules: { "vue/multi-word-component-names": "off", quotes: "off", semi: "off", "comma-dangle": "off" },
};
