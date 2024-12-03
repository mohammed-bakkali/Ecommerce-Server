/** @type {import('eslint').Linter.FlatConfig} */
const airbnbBase = require('eslint-config-airbnb-base');
const prettier = require('eslint-config-prettier');
const node = require('eslint-plugin-node');

module.exports = [
  // AirBnB base config (without 'extends')
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    plugins: ['node'],
    rules: {
      ...airbnbBase.rules,
      // You can disable or override specific rules here if needed
    },
  },

  // Prettier config (without 'extends')
  {
    plugins: ['prettier'],
    rules: {
      ...prettier.rules,
    },
  },

  // Node plugin config (without 'extends')
  node.configs.recommended,

  // Custom rules
  {
    plugins: ['prettier'],
    rules: {
      'spaced-comment': 'off',
      'no-console': 'off',
      'consistent-return': 'off',
      'func-names': 'off',
      'object-shorthand': 'off',
      'no-process-exit': 'off',
      'no-param-reassign': 'off',
      'no-return-await': 'off',
      'no-underscore-dangle': 'off',
      'class-methods-use-this': 'off',
      'no-undef': 'warn',
      'prefer-destructuring': ['error', { object: true, array: false }],
      'no-unused-vars': ['warn', { argsIgnorePattern: 'req|res|next|val' }],
    },
  },
];
