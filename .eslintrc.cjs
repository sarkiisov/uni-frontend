module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:import/typescript'
  ],
  ignorePatterns: ['.eslintrc.cjs', 'vite.config.ts', 'postcss.config.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: ['react-refresh'],
  rules: {
    'semi': ['off'],
    'comma-dangle': ['off'],
    'no-console': ['warn'],
    'no-nested-ternary': ['off'],
    'linebreak-style': ['off'],
    'array-bracket-spacing': ['error', 'never'],
    'no-return-assign': ['off'],
    'consistent-return': ['off'],
    'operator-linebreak': ['error', 'after', {
      'overrides': { '?': 'ignore', ':': 'ignore' }
    }],
    'no-param-reassign': ['off'],
    'react/react-in-jsx-scope': ['off'],
    'react/jsx-uses-react': ['off'],
    'react/jsx-props-no-spreading': ['off'],
    'react/no-unescaped-entities': ['off'],
    'react/jsx-one-expression-per-line': ['off'],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/function-component-definition': ['off'],
    'react/button-has-type': ['off'],
    'import/no-absolute-path': ['off'],
    'import/prefer-default-export': ['off'],
    'import/no-cycle': ['off'],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        '': "never",
        "ts": "never",
        "tsx": "never"
      }
    ],
    '@typescript-eslint/semi': ['error', 'never'],
    '@typescript-eslint/comma-dangle': ['error', 'never'],
    '@typescript-eslint/no-shadow': ['off'],
    '@typescript-eslint/member-delimiter-style': ['error', {
      'multiline': {
        'delimiter': 'none',
        'requireLast': true
      },
      'singleline': {
        'requireLast': false
      }
    }],

  },
}
