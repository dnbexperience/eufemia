const path = require('path')
const fs = require('fs-extra')
const sass = require('sass')

/**
 * Converts SASS to CSS and puts the css files inside the /public directory.
 *
 * You can run this script manually as well:
 * yarn workspace dnb-design-system-portal node scripts/compile-css-packages.cjs
 *
 * @param {array} convertFiles List of Eufemia packages
 */
function generatePackages(convertFiles) {
  convertFiles.forEach((filePath) => {
    /**
     * include other paths, in case a SCSS files requires it:
     * path.resolve(__dirname, '../src/style/core/')
     */
    const includePaths = []

    const file = require.resolve(filePath)
    const result = sass.compile(file, {
      loadPaths: includePaths,
    })
    const name = path.basename(filePath).replace('.scss', '')
    const dest = path.resolve(__dirname, `../public/${name}.css`)

    fs.writeFileSync(dest, result.css)
  })
}
exports.generatePackages = generatePackages

// For CLI call run: yarn workspace dnb-design-system-portal node scripts/compile-css-packages.cjs
if (require.main === module) {
  generatePackages([
    '@dnb/eufemia/src/style/dnb-ui-core.scss',
    '@dnb/eufemia/src/style/themes/ui/ui-theme-basis.scss',
  ])
}

/**
 * This helper function can be attached to a dev-only route to
 * re-generate the sass to css conversion on demand.
 */
function runGeneratePackages({ app, page, packages }) {
  // Run a Node.js Script on a specific page visit
  app.get(page, (req, res, next) => {
    generatePackages(packages)
    next()
  })
}
exports.runGeneratePackages = runGeneratePackages
