/** Resolve only flat build assets from the Portal's own asset directory. */
export function portalAssetUrl(value: string) {
  if (!/^\/assets\/[a-zA-Z0-9_.-]+\.(js|css)$/.test(value)) {
    throw new Error('Invalid Portal build asset URL')
  }
  return encodeURI(value)
}
