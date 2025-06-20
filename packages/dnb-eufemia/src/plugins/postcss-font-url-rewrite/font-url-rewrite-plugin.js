const path = require('path')

const postcssFontUrlRewrite = (opts = {}) => {
  const {
    basePath = '/new-path/',
    pathPrefixToKeep = 'assets/fonts/',
    verbose = false,
  } = opts

  return {
    postcssPlugin: 'font-url-rewrite-plugin',

    AtRule: {
      'font-face'(atRule) {
        atRule.walkDecls('src', (decl) => {
          decl.value = decl.value.replace(
            /url\(([^)]+)\)/g,
            (match, rawUrl) => {
              const url = rawUrl.replace(/^['"]|['"]$/g, '') // strip quotes
              const normalizedUrl = url.replace(/\\/g, '/') // handle Windows paths

              const index = normalizedUrl.lastIndexOf(pathPrefixToKeep)
              if (index === -1) {
                if (verbose) {
                  console.warn(
                    `Skipped (no match for "${pathPrefixToKeep}"): ${url}`
                  )
                }
                return match
              }

              const subPath = normalizedUrl.substring(
                index + pathPrefixToKeep.length
              )
              const filename = path.basename(subPath)

              // Remove hash if any: FontName-123abc.woff → FontName.woff
              const cleanedFile = filename.replace(
                /-[a-f0-9]{6,}(?=\.[^.]+$)/,
                ''
              )
              const dir = path.dirname(subPath)

              // Handle URL joining differently based on whether basePath is a URL
              let finalUrl
              if (
                basePath.startsWith('http://') ||
                basePath.startsWith('https://')
              ) {
                // For URLs, manually join the parts to preserve protocol
                const basePathWithoutTrailingSlash = basePath.replace(
                  /\/$/,
                  ''
                )
                if (dir === '.') {
                  // If there's no directory, just join base path and filename
                  finalUrl = `${basePathWithoutTrailingSlash}/${cleanedFile}`
                } else {
                  // If there is a directory, handle it normally
                  const dirWithoutLeadingSlash = dir.replace(/^\//, '')
                  finalUrl = `${basePathWithoutTrailingSlash}/${dirWithoutLeadingSlash}/${cleanedFile}`
                }
              } else {
                // For regular paths, use path.posix.join
                finalUrl = path.posix.join(basePath, dir, cleanedFile)
              }

              if (verbose) {
                console.log(`
✨ @dnb/eufemia/plugins/postcss-font-url-rewrite
Rewriting: ${url} → ${finalUrl}
          `)
              }

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
