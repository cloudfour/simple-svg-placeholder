function simpleSvgPlaceholder({
  width = 300,
  height = 150,
  text = `${width}×${height}`,
  fontFamily = 'sans-serif',
  fontWeight = 'bold',
  fontSize = Math.floor(Math.min(width, height) * 0.2),
  lineHeight = 1.2,
  dy = fontSize * 0.35,
  bgColor = '#ddd',
  textColor = 'rgba(0,0,0,0.5)',
  dataUri = true,
  charset = 'UTF-8',
  textWrap = false,
  padding = '0.5em',
} = {}) {
  const content = textWrap ? `<foreignObject width="${width}" height="${height}">
      <div xmlns="http://www.w3.org/1999/xhtml"
        style="
          align-items: center;
          box-sizing: border-box;
          color: ${textColor};
          display: flex;
          font-family: ${fontFamily};
          font-size: ${fontSize}px;
          font-weight: ${fontWeight};
          height: 100%;
          line-height: ${lineHeight};
          justify-content: center;
          padding: ${padding};
          text-align: center;
          width: 100%;">
        ${text}
      </div>
    </foreignObject>` : `<text fill="${textColor}" font-family="${fontFamily}" font-size="${fontSize}" dy="${dy}" font-weight="${fontWeight}" x="50%" y="50%" text-anchor="middle">${text}</text>`;

  const str = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect fill="${bgColor}" width="${width}" height="${height}"/>
    ${content}
  </svg>`;

  // Thanks to: filamentgroup/directory-encoder
  const cleaned = str
    .replace(/[\t\n\r]/gim, '') // Strip newlines and tabs
    .replace(/\s\s+/g, ' ') // Condense multiple spaces
    .replace(/'/gim, '\\i'); // Normalize quotes

  if (dataUri) {
    const encoded = encodeURIComponent(cleaned)
      .replace(/\(/g, '%28') // Encode brackets
      .replace(/\)/g, '%29');

    return `data:image/svg+xml;charset=${charset},${encoded}`;
  }

  return cleaned;
}

module.exports = simpleSvgPlaceholder;
