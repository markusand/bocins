import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import vue from 'eslint-plugin-vue';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        project: './tsconfig.json',
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      'max-len': ['error', {
        code: 100,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
      }],
      'no-param-reassign': ['error', { props: false }],
      'object-curly-newline': ['error', {
        multiline: true,
        consistent: true,
      }],
      'arrow-parens': ['error', 'as-needed'],
      'no-nested-ternary': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'vue/component-tags-order': ['error', { order: ['template', 'script', 'style'] }],
      'vue/multi-word-component-names': 'off',
      'vue/html-closing-bracket-newline': ['error', {
        singleline: 'never',
        multiline: 'never',
      }],
      'vue/max-attributes-per-line': ['error', {
        singleline: 4,
        multiline: 1,
      }],
      'vue/singleline-html-element-content-newline': 'off',
    },
  },
  {
    ignores: ['./scripts/*.js', 'dist/**', 'node_modules/**', 'eslint.config.js'],
  },
];
