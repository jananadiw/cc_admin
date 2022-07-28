module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: 'tsconfig.json',
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin'],
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
      'plugin:react/recommended'
    ],
    root: true,
    env: {
      node: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    rules: {
      'react/react-in-jsx-scope': "off"
    },
  };
  