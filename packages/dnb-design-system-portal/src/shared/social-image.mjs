export function getSocialImage(pathname, manifest = {}) {
  let route =
    String(pathname || '/')
      .split(/[?#]/)[0]
      .replace(/\/+$/, '') + '/'
  let entry = manifest[route]
  if (!entry && /\/(info|demos|properties|events)\/$/.test(route)) {
    route = route.replace(/(info|demos|properties|events)\/$/, '')
    entry = manifest[route]
  }
  if (
    entry?.kind === 'screenshot' &&
    /^images\/[a-f0-9]{64}\.png$/.test(entry.file)
  ) {
    return {
      url: new URL('/og/' + entry.file, 'https://assets.eufemia.dnb.no')
        .href,
      alt: String(entry.alt || 'Eufemia Design System'),
    }
  }
  return null
}

function escape(text) {
  return String(text).replace(
    /[&"<>]/g,
    (character) =>
      ({ '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;' })[
        character
      ]
  )
}

export function getSocialDetails(title, description) {
  return [
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
  ]
}

export function socialDetailTags(title, description) {
  return getSocialDetails(title, description).map(
    ({ name, content }) =>
      '<meta name="' + name + '" content="' + escape(content) + '">'
  )
}

export function socialImageTags(pathname, manifest) {
  const image = getSocialImage(pathname, manifest)
  if (!image) {
    return []
  }
  return [
    '<meta property="og:image" content="' + escape(image.url) + '">',
    '<meta property="og:image:type" content="image/png">',
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    '<meta property="og:image:alt" content="' + escape(image.alt) + '">',
    '<meta name="twitter:card" content="summary_large_image">',
    '<meta name="twitter:image" content="' + escape(image.url) + '">',
    '<meta name="twitter:image:alt" content="' + escape(image.alt) + '">',
  ]
}
