import cloudFourConfig from '@cloudfour/eslint-config';

const config = [
  ...cloudFourConfig,
  {
    rules: {
      // The data URIs this package produces spell the charset `UTF-8`, which is
      // what the SVG spec and every browser expect. The rule wants `utf8`.
      'unicorn/text-encoding-identifier-case': 'off',
    },
  },
  {
    files: ['package.json'],
    rules: {
      // We export `./package.json`, so `prefer-files-field` requires it to be
      // listed in `files` -- and `no-redundant-files` then objects that npm
      // publishes package.json regardless. The two cannot both be satisfied
      // while that export exists, and dropping the export would be a breaking
      // change for anyone reading our version at runtime. Keep the entry, since
      // `prefer-files-field` is the rule doing real work here, and silence the
      // cosmetic objection.
      'package-json/no-redundant-files': 'off',
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

export default config;
