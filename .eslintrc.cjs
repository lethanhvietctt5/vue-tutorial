/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');
const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc.json'), 'utf8'));

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
