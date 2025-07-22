const js = require('@eslint/js');

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'commonjs',
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        global: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        jest: 'readonly',
        test: 'readonly',
        describe: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly'
      }
    },
    rules: {
      'no-console': 'off', // CLI app needs console output
      'no-debugger': 'error',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_|^error|^argv' }],
      'prefer-const': 'off', // Legacy codebase uses var
      'no-var': 'off', // Legacy codebase uses var
      'no-undef': 'off' // DI system uses globals
    },
    ignores: [
      'node_modules/**',
      'render/dist/**',
      'coverage/**',
      'bin/app.js',
      'render/src/js/app.js', // Browser code with imports
      'render/preload.js' // Browser globals
    ]
  }
];