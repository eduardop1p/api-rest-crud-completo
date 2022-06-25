module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': 0,
    'class-methods-use-this': 0,
    'max-len': 0,
    'arrow-parens': 0,
    'no-restricted-syntax': 0,
    'consistent-return': 0,
    'no-useless-return': 0,
    'no-underscore-dangle': 0,
  },
};
