const fs = require('fs');
const path = require('path');
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
  wrap: simpleSvgPlaceholder({
    text: 'Well, hello there! Long time no see!',
    textWrap: true,
    ...settings,
  }),
};

Object.keys(examples).forEach((name) => {
  fs.writeFileSync(
    path.join(__dirname, `./${name}.svg`),
    examples[name],
    'utf8'
  );
});
