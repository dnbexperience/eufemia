/**
 * Make it possible to load the config outside this repo package
 * This way we can reuse the config for post css
 *
 */

const fs = require('fs')
const sassBin = require('sass')
const os = require('os')
const path = require('path')

module.exports = ({ sass = sassBin, ...options } = {}) => {
  return [
    // preset-env processes the most of our old legacy browsers
    require('postcss-preset-env')({
      stage: 2,
      preserve: true, // so we get the calc from vars, to process for IE11 later with "postcss-calc"
      browsers: ['last 2 versions', 'not ie > 0', 'not ie_mob > 0'].filter(
        (i) => i
      ),
      importFrom: [
        extractCSSProperties(
          require.resolve('@dnb/eufemia/src/style/index.scss'),
          null,
          sass
        ),
      ],
      ...options,
    }),
  ].filter((i) => i)
}

function extractCSSProperties(file, opts = {}, sass = sassBin) {
  try {
    const sassResult = sass.renderSync({
      file,
      ...opts,
    })
    const tmpDir = String(os.tmpdir)
    const tmpFile = path.resolve(
      tmpDir,
      path.basename(file.replace('.scss', '.css'))
    )
    fs.writeFileSync(tmpFile, String(sassResult.css))
    return tmpFile
  } catch (e) {
    console.error('Error in postcssConfig (extractCSSProperties):', e)
  }
}
