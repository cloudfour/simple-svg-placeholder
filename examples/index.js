const fs = require('node:fs');
const path = require('node:path');

const simpleSvgPlaceholder = require('..');

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

for (const name of Object.keys(examples)) {
  fs.writeFileSync(
    path.join(__dirname, `./${name}.svg`),
    examples[name],
    'utf8',
  );
}
