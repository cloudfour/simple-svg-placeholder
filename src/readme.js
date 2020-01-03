const ejs = require('ejs');
const simpleSvgPlaceholder = require('.');
const packageInfo = require('../package.json');
const fs = require('fs');
const path = require('path');

ejs.renderFile(path.join(__dirname, './readme.ejs'), { simpleSvgPlaceholder, packageInfo }, {}, (err, str) => {
  if (err) {
    console.error(err);
  } else {
    fs.writeFileSync(path.join(__dirname, '../README.md'), str, 'utf8');
  }
});
