// eslint-disable-next-line n/no-unpublished-import
import cloudFourConfig from '@cloudfour/eslint-config';

export default [
  ...cloudFourConfig,
  {
    rules: {
      'unicorn/text-encoding-identifier-case': 'off',
      'unicorn/expiring-todo-comments': 'off',
    },
  },
  {
    // Tests are never published, so they are free to use `node:test` even
    // though the package itself supports older versions of Node.
    files: ['test/**'],
    rules: {
      'n/no-unsupported-features/node-builtins': 'off',
    },
  },
];
