// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          'argsIgnorePattern': '^_',
          'varsIgnorePattern': '^_',
          'caughtErrorsIgnorePattern': '^_'
        }
      ],
      'semi': ['error', 'always'],
      'object-curly-spacing': ['error', 'always'],
      'space-before-blocks': 'error',
      'keyword-spacing': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          'selector': 'variable',
          'format': ['camelCase', 'UPPER_CASE', 'PascalCase'],
          'leadingUnderscore': 'allow'
        },
        {
          'selector': 'function',
          'filter': {
            'regex': 'Decorator$',
            'match': true
          },
          'format': ['PascalCase']
        },
        {
          'selector': 'function',
          'format': ['camelCase']
        },
        {
          'selector': 'parameter',
          'format': ['camelCase'],
          'leadingUnderscore': 'allow'
        },
        {
          'selector': 'property',
          'format': ['camelCase', 'UPPER_CASE']
        }
      ],
      'no-multiple-empty-lines': ['error', { 'max': 1 }]
    },
  },
);