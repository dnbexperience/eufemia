/**
 * PostCSS plugin that scopes non-default theme selectors under their
 * brand class, preventing CSS variable leaks and bundler deduplication.
 *
 * For files in a non-default theme directory (e.g. themes/sbanken/),
 * it rewrites selectors like:
 *   .eufemia-scope--portal, .eufemia-scope--portal .eufemia-theme__color-scheme--light
 * to:
 *   .eufemia-scope--portal .eufemia-theme__sbanken, .eufemia-scope--portal .eufemia-theme__sbanken.eufemia-theme__color-scheme--light
 *
 * And standalone selectors like:
 *   .eufemia-scope--portal .eufemia-theme__color-scheme--dark
 * to:
 *   .eufemia-scope--portal .eufemia-theme__sbanken.eufemia-theme__color-scheme--dark
 *
 * And comma patterns like:
 *   .eufemia-scope--portal, .eufemia-scope--portal .eufemia-theme__sbanken
 * to:
 *   .eufemia-scope--portal .eufemia-theme__sbanken
 */
const nonDefaultThemes = ['sbanken', 'eiendom', 'carnegie']

const plugin = () => {
  return {
    postcssPlugin: 'postcss-eufemia-theme-scope',
    Once(root, { result }) {
      const filePath = result.opts.from || ''

      // Determine which non-default theme this file belongs to
      const theme = nonDefaultThemes.find((t) =>
        filePath.includes(`/themes/${t}/`)
      )

      if (!theme) {
        return // stop here
      }

      const brandClass = `eufemia-theme__${theme}`
      const scopeClass = 'eufemia-scope--portal'

      root.walkRules((rule) => {
        const newSelectors = rule.selectors.map((sel) => {
          const trimmed = sel.trim()

          // Skip if already scoped under brand class
          if (trimmed.includes(brandClass)) {
            return sel
          }

          // Pattern: ".eufemia-scope--portal" standalone (from :root rewrite)
          // Scope under brand class so palette vars are available in all
          // color scheme modes (light + dark), not just the page root.
          if (trimmed === `.${scopeClass}`) {
            return `.${scopeClass} .${brandClass}`
          }

          // Pattern: ".eufemia-scope--portal .eufemia-theme__color-scheme--<mode>"
          // Scope under brand: ".eufemia-scope--portal .eufemia-theme__sbanken.eufemia-theme__color-scheme--<mode>"
          const colorSchemeMatch = trimmed.match(
            /^\.eufemia-scope--portal\s+(\.eufemia-theme__color-scheme--\w+)$/
          )
          if (colorSchemeMatch) {
            return `.${scopeClass} .${brandClass}${colorSchemeMatch[1]}`
          }

          return sel
        })

        rule.selectors = newSelectors
      })
    },
  }
}

plugin.postcss = true

module.exports = plugin
