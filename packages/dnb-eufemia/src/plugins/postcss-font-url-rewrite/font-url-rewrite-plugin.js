const path = require('path')
const { URL } = require('url')

const DEFAULT_BASE = '/new-path/'

function postcssFontUrlRewrite(opts = {}) {
  const {
    basePath = DEFAULT_BASE, // where you *want* fonts to live:
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
  const defaultNormalizedBase = normalizeBase(DEFAULT_BASE, false)

  return {
    postcssPlugin: 'font-url-rewrite-plugin',
    AtRule: {
      'font-face'(atRule) {
        atRule.walkDecls('src', (decl) => {
          decl.value = decl.value.replace(
            /url\(\s*(['"]?)([^'")]+)\1\s*\)/g,
            (fullMatch, _quote, rawUrl) => {
              // normalize backslashes
              const urlStr = rawUrl.replace(/\\+/g, '/')
              let subPath

              // 1. incoming sourceBase
              if (
                normalizedSource &&
                urlStr.startsWith(normalizedSource)
              ) {
                subPath = urlStr.slice(normalizedSource.length)

                // 2. already rewritten to normalizedTarget (double-run)
              } else if (urlStr.startsWith(normalizedTarget)) {
                subPath = urlStr.slice(normalizedTarget.length)

                // 3. previously default base (double-run after default)
              } else if (urlStr.startsWith(defaultNormalizedBase)) {
                subPath = urlStr.slice(defaultNormalizedBase.length)

                // 4. some other absolute URL
              } else if (/^https?:\/\//.test(urlStr)) {
                const parsed = new URL(urlStr)
                const pathname = parsed.pathname
                const idx = pathname.lastIndexOf(FONT_MARKER)
                subPath =
                  idx !== -1
                    ? pathname.slice(idx + FONT_MARKER.length)
                    : path.posix.basename(pathname)

                // 5. fallback: find the last fonts segment
              } else {
                const idx = urlStr.lastIndexOf(FONT_MARKER)
                if (idx === -1) {
                  if (verbose)
                    console.warn(`Skipped (no fonts segment): ${urlStr}`)
                  return fullMatch
                }
                subPath = urlStr.slice(idx + FONT_MARKER.length)
              }

              // strip leading version folder (e.g. "1.2.3/subpath/..." → "subpath/..." )
              subPath = subPath.replace(/^\d+\.\d+\.\d+\/(.+)/, '$1')

              // strip hash from filename and get dir
              const filename = path.posix.basename(subPath)
              const cleaned = filename.replace(
                /-[a-f0-9]{6,}(?=\.[^.]+$)/,
                ''
              )
              const dir = path.posix.dirname(subPath)

              // rebuild under target basePath
              let finalUrl
              if (baseIsFullUrl) {
                const hostOnly = normalizedTarget.replace(/\/$/, '')
                finalUrl = [hostOnly]
                  .concat(dir && dir !== '.' ? [dir] : [])
                  .concat([cleaned])
                  .join('/')
              } else {
                finalUrl = path.posix.join(normalizedTarget, dir, cleaned)
              }

              if (verbose)
                console.log(`Rewriting: ${urlStr} → ${finalUrl}`)
              return `url("${finalUrl}")`
            }
          )
        })
      },
    },
  }
}

postcssFontUrlRewrite.postcss = true
module.exports = postcssFontUrlRewrite
