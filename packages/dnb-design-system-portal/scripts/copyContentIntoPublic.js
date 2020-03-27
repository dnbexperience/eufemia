/**
 * Helper function
 *
 */

const fs = require('fs-extra')

const copyContentIntoPublic = async () => {
  try {
    const filter = (file) => {
      return !/\/\./.test(file)
    }
    await fs.copy('../dnb-ui-lib/assets', './public/static/', {
      filter
    })
    // use only the gatsby "/static" folder for now
    // await fs.copy('./src/public', './public/', { filter })
  } catch (e) {
    console.log(
      'Got an error while copying and merging the "public" folder!',
      e
    )
    throw new Error(e)
  }
}

module.exports = { copyContentIntoPublic }
