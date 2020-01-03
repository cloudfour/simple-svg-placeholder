function simpleSvgPlaceholder({
  width = 300,
  height = 150,
  text = `${width}×${height}`,
  fontFamily = 'sans-serif',
  fontWeight = 'bold',
  fontSize = Math.floor(Math.min(width, height) * 0.2),
  textAdjust = fontSize * 0.4,
  bgColor = '#ddd',
  textColor = 'rgba(0,0,0,0.5)',
  dataUri = true
} = {}) {
  const str = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect fill="${bgColor}" width="${width}" height="${height}"/>
    <text fill="${textColor}" font-family="${fontFamily}" font-size="${fontSize}" dy="${textAdjust}" font-weight="${fontWeight}" x="50%" y="50%" text-anchor="middle">${text}</text>
  </svg>`;

  // Thanks to: filamentgroup/directory-encoder
  const cleaned = str
    .replace(/[\n\r]/gim, '') // Strip newlines
    .replace(/\t/gim, ' ') // Replace tabs with strings
    .replace(/'/gim, '\\i'); // Normalize quotes

  if (dataUri) {
    const encoded = encodeURIComponent(cleaned)
      .replace(/\(/g, '%28') // Encode brackets
      .replace(/\)/g, '%29');

    return `data:image/svg+xml;charset=utf8,${encoded}`;
  }

  return cleaned;
}

module.exports = simpleSvgPlaceholder;
