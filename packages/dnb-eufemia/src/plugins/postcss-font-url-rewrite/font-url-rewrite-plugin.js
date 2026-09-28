const path = require('path')
const { URL } = require('url')

const DEFAULT_BASE = '/new-path/'

// A single `url()` inside one `src` entry.
const URL_PATTERN = /url\(\s*(['"]?)([^'")]+)\1\s*\)/

// Split a `src` value on the commas that separate its entries.
const splitSrcEntries = (value) => value.split(/,(?=\s*(?:url\(|local\())/)

// Drop entries repeating a url already listed, so re-running the plugin over
// its own output does not stack duplicates.
function dedupeSrcEntries(value) {
  const seen = new Set()

  return splitSrcEntries(value)
    .filter((entry) => {
      const match = entry.match(URL_PATTERN)
      if (!match) {
        return true
      }
      if (seen.has(match[2])) {
        return false
      }
      seen.add(match[2])
      return true
    })
    .join(',')
}

function postcssFontUrlRewrite(opts = {}) {
  const {
    basePath = DEFAULT_BASE, // where you *want* fonts to live:
    fallbackBasePath, // OPTIONAL: repeated as an extra `src` entry the browser falls back to
    sourceBase, // OPTIONAL: where they *currently* live on your origin/CNAME:
    verbose = false,
  } = opts

  const FONT_MARKER = '/fonts/'
  const baseIsFullUrl = /^https?:\/\//.test(basePath)

  // helper to normalize and ensure a trailing slash
  const normalizeBase = (str, isUrl) =>
    isUrl
      ? str.replace(/\/+$/, '') + '/'
      : path.posix.normalize(str).replace(/\/+$/, '') + '/'

  const normalizedTarget = normalizeBase(basePath, baseIsFullUrl)
  const normalizedSource =
    sourceBase &&
    normalizeBase(sourceBase, /^https?:\/\//.test(sourceBase))
  const normalizedFallback =
    fallbackBasePath &&
    normalizeBase(fallbackBasePath, /^https?:\/\//.test(fallbackBasePath))
  const defaultNormalizedBase = normalizeBase(DEFAULT_BASE, false)

  const rewriteEntry = (entry) => {
    const match = entry.match(URL_PATTERN)
    if (!match) {
      return entry
    }

    // normalize backslashes
    const urlStr = match[2].replace(/\\+/g, '/')
    let subPath

    // 1. incoming sourceBase
    if (normalizedSource && urlStr.startsWith(normalizedSource)) {
      subPath = urlStr.slice(normalizedSource.length)

      // 2. already rewritten to normalizedTarget (double-run)
    } else if (urlStr.startsWith(normalizedTarget)) {
      subPath = urlStr.slice(normalizedTarget.length)

      // 3. already rewritten to the fallback base (double-run)
    } else if (
      normalizedFallback &&
      urlStr.startsWith(normalizedFallback)
    ) {
      subPath = urlStr.slice(normalizedFallback.length)

      // 4. previously default base (double-run after default)
    } else if (urlStr.startsWith(defaultNormalizedBase)) {
      subPath = urlStr.slice(defaultNormalizedBase.length)

      // 5. some other absolute URL
    } else if (/^https?:\/\//.test(urlStr)) {
      const parsed = new URL(urlStr)
      const pathname = parsed.pathname
      const idx = pathname.lastIndexOf(FONT_MARKER)
      subPath =
        idx !== -1
          ? pathname.slice(idx + FONT_MARKER.length)
          : path.posix.basename(pathname)

      // 6. fallback: find the last fonts segment
    } else {
      const idx = urlStr.lastIndexOf(FONT_MARKER)
      if (idx === -1) {
        if (verbose) {
          console.warn(`Skipped (no fonts segment): ${urlStr}`)
        }
        return entry
      }
      subPath = urlStr.slice(idx + FONT_MARKER.length)
    }

    // strip leading version folder (e.g. "1.2.3/subpath/..." → "subpath/..." )
    subPath = subPath.replace(/^\d+\.\d+\.\d+\/(.+)/, '$1')

    // strip hash from filename and get dir
    const filename = path.posix.basename(subPath)
    const cleaned = filename.replace(/-[a-f0-9]{6,}(?=\.[^.]+$)/, '')
    const dir = path.posix.dirname(subPath)

    // rebuild under the given base
    const buildUrl = (base) => {
      if (/^https?:\/\//.test(base)) {
        const hostOnly = base.replace(/\/$/, '')
        return [hostOnly]
          .concat(dir && dir !== '.' ? [dir] : [])
          .concat([cleaned])
          .join('/')
      }
      return path.posix.join(base, dir, cleaned)
    }

    const finalUrl = buildUrl(normalizedTarget)
    const fallbackUrl = normalizedFallback && buildUrl(normalizedFallback)

    if (verbose) {
      console.log(`Rewriting: ${urlStr} → ${finalUrl}`)
    }

    const rewritten = entry.replace(URL_PATTERN, `url("${finalUrl}")`)
    if (!fallbackUrl || fallbackUrl === finalUrl) {
      return rewritten
    }

    // Repeat the entry against the fallback base, so the browser moves on to
    // it when the preferred url cannot be loaded.
    return `${rewritten}, ${entry
      .trimStart()
      .replace(URL_PATTERN, `url("${fallbackUrl}")`)}`
  }

  return {
    postcssPlugin: 'font-url-rewrite-plugin',
    AtRule: {
      'font-face'(atRule) {
        atRule.walkDecls('src', (decl) => {
          decl.value = dedupeSrcEntries(
            splitSrcEntries(decl.value).map(rewriteEntry).join(',')
          )
        })
      },
    },
  }
}

postcssFontUrlRewrite.postcss = true
module.exports = postcssFontUrlRewrite
