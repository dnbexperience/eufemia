/**
 * Font-loading determinism for screenshot tests.
 *
 * Eufemia declares its webfonts with `font-display: fallback`, which
 * gives the browser roughly three seconds to swap the real font in.
 * When a font arrives after that window the page keeps painting the
 * fallback face for the rest of its lifetime — yet
 * `document.fonts.ready` resolves and `document.fonts.check()` reports
 * the font as loaded, so nothing in the engine can tell that the
 * capture is about to be wrong.
 *
 * Under parallel CI load the portal's preview server regularly misses
 * that window. The whole screenshot then renders in the system font,
 * with different glyph widths and a different element size, and the
 * diff fails for a reason that has nothing to do with the change under
 * test.
 *
 * Re-declaring every `@font-face` with `font-display: block` gives the
 * browser a face without a swap deadline, so the real font is always
 * painted once it arrives. Waiting for `document.fonts.ready` before
 * capturing keeps us from photographing the block period.
 */

export const FONT_DISPLAY_MARKER = 'data-visual-test-font-display'

/**
 * Evaluated inside the page, so it has to be self-contained — a
 * reference to anything in module scope would be undefined there.
 *
 * Must run again for every capture: the portal pre-injects one
 * stylesheet per theme and toggles `disabled` when switching, so the
 * set of active `@font-face` rules changes while the page lives on.
 */
export function forceFontDisplayBlock() {
  const marker = 'data-visual-test-font-display'
  const fontFaceRuleType = 5 // CSSRule.FONT_FACE_RULE

  // `cssText` serializes `url()` as authored, and the override lives in
  // a <style> in the document, so a stylesheet-relative path would
  // resolve against the current route and 404.
  const absolutize = (cssText: string, base: string) =>
    cssText.replace(
      /url\(\s*(['"]?)([^'")]*)\1\s*\)/g,
      (match, _quote, value) => {
        try {
          return `url("${new URL(value, base).href}")`
        } catch {
          return match
        }
      }
    )

  const declarations: string[] = []

  for (const sheet of Array.from(document.styleSheets)) {
    if (sheet.disabled) {
      continue
    }

    const owner = sheet.ownerNode as Element | null
    if (owner && owner.nodeType === 1 && owner.hasAttribute(marker)) {
      continue
    }

    let rules: CSSRuleList
    try {
      rules = sheet.cssRules
    } catch {
      // Cross-origin stylesheet, skip
      continue
    }

    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i]
      if (rule.type !== fontFaceRuleType) {
        continue
      }

      const cssText = absolutize(
        rule.cssText,
        sheet.href || document.baseURI
      ).replace(/font-display\s*:[^;}]*;?/gi, '')

      const end = cssText.lastIndexOf('}')
      if (end === -1) {
        continue
      }

      declarations.push(`${cssText.slice(0, end)} font-display: block; }`)
    }
  }

  const content = declarations.join('\n')
  const existing = document.querySelector(`style[${marker}]`)

  if (existing) {
    if (existing.textContent !== content) {
      existing.textContent = content
    }
    return
  }

  if (!content) {
    return
  }

  const style = document.createElement('style')
  style.setAttribute(marker, '')
  style.textContent = content
  document.head.appendChild(style)
}
