/**
 * HTML escaping for the prerender pipeline.
 *
 * Imported by both prerender.mjs and prerender-utils.ts, so the build and the
 * tests escape with the same code. Keep this module free of Vite-resolved
 * imports: prerender.mjs runs under plain Node.
 */

const HTML_ENTITIES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

/**
 * Escape a value for use in HTML text and quoted attribute contexts.
 *
 * Page metadata comes from MDX frontmatter, which authors write as free text.
 * A stray quote or angle bracket there would otherwise end the attribute or
 * the element it was interpolated into.
 */
export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => HTML_ENTITIES[char])
}
