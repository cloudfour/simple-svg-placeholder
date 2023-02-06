# Simple SVG Placeholder

[![NPM version](https://img.shields.io/npm/v/@cloudfour/simple-svg-placeholder.svg)](https://www.npmjs.com/package/@cloudfour/simple-svg-placeholder) [![Build Status](https://github.com/cloudfour/simple-svg-placeholder/workflows/CI/badge.svg)](https://github.com/cloudfour/simple-svg-placeholder/actions?query=workflow%3ACI) [![Renovate](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com)

> A very simple placeholder image generator with zero dependencies. Returns a data URI (or raw SVG source) as a string for use in templates.

## Getting Started

The package is available to install via npm:

```
npm i --save @cloudfour/simple-svg-placeholder
```

Once installed, you may import the function as an ES or CommonJS module:

```javascript
// Module
import simpleSvgPlaceholder from '@cloudfour/simple-svg-placeholder';

// CommonJS
const simpleSvgPlaceholder = require('@cloudfour/simple-svg-placeholder');
```

Then call the function to generate placeholder SVGs:

```javascript
const placeholder = simpleSvgPlaceholder(/* options */);
// => 'data:image/svg+xml;...'
```

## Examples

### Default

![](./examples/default.svg?sanitize=true)

```javascript
simpleSvgPlaceholder();
```

### Dimensions

![](./examples/size.svg?sanitize=true)

```javascript
simpleSvgPlaceholder({
  width: 180,
  height: 135,
});
```

### Text

![](./examples/text.svg?sanitize=true)

```javascript
simpleSvgPlaceholder({
  text: 'Hello world!',
});
```

### Colors

![](./examples/color.svg?sanitize=true)

```javascript
simpleSvgPlaceholder({
  bgColor: '#0F1C3F',
  textColor: '#7FDBFF',
});
```

### Font

![](./examples/font.svg?sanitize=true)

```javascript
simpleSvgPlaceholder({
  fontFamily: 'Georgia, serif',
  fontWeight: 'normal',
});
```

## Option Reference

### width `{Number}`

Defaults to `300`, the default width of SVG elements in most browsers.

### height `{Number}`

Defaults to `150`, the default height of SVG elements in most browsers.

### text `{String}`

The text to display. Defaults to the image dimensions.

### fontFamily `{String}`

The font to use for the text. For data URIs, this needs to be a system-installed font. Defaults to `'sans-serif'`.

### fontWeight `{String}`

Defaults to `'bold'`.

### fontSize `{Number}`

Defaults to 20% of the shortest image dimension, rounded down.

### dy `{Number}`

Adjustment applied to [the `dy` attribute](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dy) of the text element so it will appear vertically centered. Defaults to 35% of the `fontSize`.

### bgColor `{String}`

The background color of the image. Defaults to `#ddd`.

### textColor `{String}`

The color of the text. For transparency, use an `rgba` or `hsla` color value. Defaults to `rgba(0,0,0,0.5)`.

### dataUri `{Boolean}`

If `true`, the function will return an encoded string for use as an `img` element's `src` value. If `false`, the function will return the unencoded SVG source. Defaults to `true`.

### charset `{String}`

Defaults to `UTF-8`, but if your source HTML document's character set is different, you may want to update this to match.
