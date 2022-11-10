const ignoreWords = [
  'classnames',
  'pathname',
  'num',
  'randomstring',
  'memoized',
  'unmount',
  'Debounce',
  'Rect'
];

module.exports = {
  extends: [
    'react-app',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  parserOptions: {
    babelOptions: {
      presets: [
        // 解决页面报错问题
        ['babel-preset-react-app', false],
        'babel-preset-react-app/prod',
      ],
    },
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'import',
    'spellcheck',
  ],
  rules: {
    'array-bracket-newline': ['error', { 'multiline': true }],
    'array-bracket-spacing': ['error', 'never'],
    'arrow-spacing': [
      'error', {
        'before': true,
        'after': true,
      },
    ],
    'brace-style': ['error', '1tbs'],
    'camelcase': 'error',
    'comma-dangle': [
      'error', {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'always-multiline',
      },
    ],
    'comma-spacing': 'error',
    'comma-style': 'error',
    'computed-property-spacing': 'error',
    'consistent-this': ['error', '_this'],
    'curly': ['error', 'all'],
    'eol-last': ['error', 'always'],
    'func-call-spacing': 'error',
    'indent': ['error', 2],
    'jsx-quotes': ['error', 'prefer-double'],
    'key-spacing': 'error',
    'keyword-spacing': 'error',
    'line-comment-position': 'error',
    'lines-around-comment': 'error',
    'lines-between-class-members': 'error',
    'max-params': ['error', { 'max': 3 }],
    // 'multiline-comment-style': 'error',
    'new-cap': 'error',
    'no-alert': 'error',
    'no-console': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-label': 'error',
    // 'no-extra-parens': ['warn', 'all', { 'ignoreJSX': 'multi-line' }],
    'no-labels': 'error',
    'no-lonely-if': 'error',
    'no-multi-spaces': ['error', { 'ignoreEOLComments': true }],
    'no-multi-assign': 'error',
    'no-multiple-empty-lines': 'error',
    'no-negated-condition': 'error',
    'no-param-reassign': 'error',
    'no-redeclare': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-shadow-restricted-names': 'error',
    'no-trailing-spaces': ['error', { 'ignoreComments': true }],
    'no-use-before-define': 'error',
    'no-useless-return': 'error',
    'no-unneeded-ternary': 'error',
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'require-await': 'error',
    'react/prop-types': 0,
    'space-before-function-paren': [
      'error', {
        'anonymous': 'always',
        'named': 'never',
        'asyncArrow': 'always',
      },
    ],
    'space-infix-ops': 'error',
    'object-curly-spacing': ['error', 'always'],
    'generator-star-spacing': ['error', { 'before': false, 'after': true }],
    'prefer-destructuring': ['error'],
    'max-len': [
      'error', {
        'code': 120,
        'ignoreUrls': true,
        'ignoreRegExpLiterals': true,
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error', {
        'vars': 'all',
        'args': 'after-used',
        'ignoreRestSiblings': false,
      },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/member-delimiter-style': 'error',
    '@typescript-eslint/prefer-enum-initializers': 'error',
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/triple-slash-reference': ['off'],
    'react/jsx-no-undef': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/self-closing-comp': [
      'error', {
        'component': true,
        'html': true,
      },
    ],
    'react/jsx-tag-spacing': [
      'error', {
        'closingSlash': 'never',
        'beforeSelfClosing': 'always',
        'afterOpening': 'never',
        'beforeClosing': 'never',
      },
    ],
    'react/no-array-index-key': ['error'],
    'react/jsx-props-no-multi-spaces': ['error'],
    'react/jsx-max-props-per-line': [
      'error', {
        'maximum': 3,
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'import/order': 'error',
    'import/default': 'off',
    'import/no-named-as-default-member': 'off',
    'import/no-self-import': 'error',
    'import/no-absolute-path': 'error',
    'import/first': 'error',
    'import/exports-last': 'off',
    'import/newline-after-import': 'error',
    'import/no-duplicates': ['error'],
    'spellcheck/spell-checker': [
      'error',
      {
        'comments': false,
        'strings': false,
        'templates': false,
        'identifiers': true,
        'lang': 'en_US',
        'skipWords': ignoreWords,
        'skipIfMatch': [
          'httpInstance://[^s]*',
          'https://[^s]*',
        ],
        'skipWordIfMatch': [],
        'minLength': 3,
      },
    ],
  },
};
