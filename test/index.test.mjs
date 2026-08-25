import assert from 'node:assert/strict';
import { test } from 'node:test';

import simpleSvgPlaceholder from '../mjs/index.js';

/**
 * Pulls the content out of the generated `<text>` element.
 *
 * @param {string} svg Raw SVG source.
 * @returns {string} The escaped text content.
 */
const textContent = (svg) => svg.match(/<text[^>]*>(.*)<\/text>/)[1];

test('returns a data URI by default', () => {
  assert.match(simpleSvgPlaceholder(), /^data:image\/svg\+xml;charset=UTF-8,/);
});

test('returns raw SVG source when dataUri is false', () => {
  assert.match(simpleSvgPlaceholder({ dataUri: false }), /^<svg /);
});

test('labels the placeholder with its dimensions by default', () => {
  const svg = simpleSvgPlaceholder({ width: 180, height: 135, dataUri: false });

  assert.equal(textContent(svg), '180×135');
});

test('uses the charset option in the data URI prefix', () => {
  assert.match(
    simpleSvgPlaceholder({ charset: 'ISO-8859-1' }),
    /^data:image\/svg\+xml;charset=ISO-8859-1,/,
  );
});

test('escapes an ampersand in text so the SVG stays well-formed XML', () => {
  const svg = simpleSvgPlaceholder({ text: 'Tom & Jerry', dataUri: false });

  assert.equal(textContent(svg), 'Tom &amp; Jerry');
});

test('escapes angle brackets in text rather than emitting them as markup', () => {
  const svg = simpleSvgPlaceholder({ text: '<b>5 < 10</b>', dataUri: false });

  assert.equal(textContent(svg), '&lt;b&gt;5 &lt; 10&lt;/b&gt;');
});

test('escapes a double quote so it cannot terminate an attribute value', () => {
  const svg = simpleSvgPlaceholder({
    bgColor: '#ddd" data-injected="1',
    dataUri: false,
  });

  assert.match(svg, /<rect fill="#ddd&quot; data-injected=&quot;1"/);
});

test('escapes an ampersand in the data URI output too', () => {
  const svg = simpleSvgPlaceholder({ text: 'Tom & Jerry' });

  assert.match(svg, /Tom%20%26amp%3B%20Jerry/);
});

test('does not double-escape an ampersand that begins an entity', () => {
  const svg = simpleSvgPlaceholder({ text: '&lt;', dataUri: false });

  assert.equal(textContent(svg), '&amp;lt;');
});

test('preserves an apostrophe in text', () => {
  const svg = simpleSvgPlaceholder({ text: "Scott's photo", dataUri: false });

  assert.equal(textContent(svg), "Scott's photo");
});

test('preserves quoted font names in a font stack', () => {
  const svg = simpleSvgPlaceholder({
    fontFamily: "'Comic Sans MS', cursive",
    dataUri: false,
  });

  assert.match(svg, /font-family="'Comic Sans MS', cursive"/);
});

test('percent-encodes an apostrophe so the data URI survives CSS url()', () => {
  const svg = simpleSvgPlaceholder({ text: "Scott's photo" });

  assert.match(svg, /Scott%27s%20photo/);
});

test('percent-encodes the brackets in the default rgba text color', () => {
  assert.match(simpleSvgPlaceholder(), /rgba%280%2C0%2C0%2C0.5%29/);
});

test('leaves no unescaped markup characters anywhere in the output', () => {
  const svg = simpleSvgPlaceholder({
    text: '</text><svg onmouseover="alert(1)"><rect/></svg><text>',
    dataUri: false,
  });

  assert.equal(svg.match(/<(svg|rect|text|\/text|\/svg)\b/g).length, 5);
});
