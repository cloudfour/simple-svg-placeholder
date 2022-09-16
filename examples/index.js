import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
// eslint-disable-next-line @cloudfour/node/no-unpublished-import
import simpleSvgPlaceholder from '../mjs/index.js';

const settings = { dataUri: false };

const examples = {
  default: simpleSvgPlaceholder(settings),
  size: simpleSvgPlaceholder({ width: 180, height: 135, ...settings }),
  text: simpleSvgPlaceholder({ text: 'Hello world!', ...settings }),
  color: simpleSvgPlaceholder({
    bgColor: '#0F1C3F',
    textColor: '#7FDBFF',
    ...settings,
  }),
  font: simpleSvgPlaceholder({
    fontFamily: 'Georgia, serif',
    fontWeight: 'normal',
    ...settings,
  }),
};

const dir = dirname(fileURLToPath(import.meta.url));

for (const name of Object.keys(examples)) {
  writeFileSync(join(dir, `./${name}.svg`), examples[name], 'utf8');
}
