// SVG is XML, which — unlike HTML — refuses to render a document containing a
// bare `&`, `<`, or `>`. Every interpolated value has to be escaped or ordinary
// text like `Tom & Jerry` produces an image that silently fails to parse. The
// attributes below are all double-quoted, so `'` can be left as-is; that keeps
// quoted font stacks such as `'Comic Sans MS', cursive` intact.
const escapeXml = (value) =>
  String(value)
    .replaceAll('&', '&amp;') // Must come first, or later entities double-escape
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');

export default function simpleSvgPlaceholder({
  width = 300,
  height = 150,
  text = `${width}×${height}`,
  fontFamily = 'sans-serif',
  fontWeight = 'bold',
  fontSize = Math.floor(Math.min(width, height) * 0.2),
  dy = fontSize * 0.35,
  bgColor = '#ddd',
  textColor = 'rgba(0,0,0,0.5)',
  dataUri = true,
  charset = 'UTF-8',
} = {}) {
  const w = escapeXml(width);
  const h = escapeXml(height);

  const str = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <rect fill="${escapeXml(bgColor)}" width="${w}" height="${h}"/>
    <text fill="${escapeXml(textColor)}" font-family="${escapeXml(fontFamily)}" font-size="${escapeXml(fontSize)}" dy="${escapeXml(dy)}" font-weight="${escapeXml(fontWeight)}" x="50%" y="50%" text-anchor="middle">${escapeXml(text)}</text>
  </svg>`;

  // Thanks to: filamentgroup/directory-encoder
  const cleaned = str
    .replaceAll(/[\t\n\r]/gv, '') // Strip newlines and tabs
    .replaceAll(/\s{2,}/gv, ' '); // Condense multiple spaces

  if (dataUri) {
    const encoded = encodeURIComponent(cleaned)
      .replaceAll('(', '%28') // Encode brackets
      .replaceAll(')', '%29')
      // Left alone by encodeURIComponent, but significant inside the CSS
      // `url()` values these data URIs are commonly pasted into.
      .replaceAll("'", '%27');

    return `data:image/svg+xml;charset=${charset},${encoded}`;
  }

  return cleaned;
}
