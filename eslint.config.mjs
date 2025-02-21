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
];
