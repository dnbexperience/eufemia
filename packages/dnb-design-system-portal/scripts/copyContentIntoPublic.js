/**
 * Helper function
 *
 */

const fs = require('fs-extra')

const copyContentIntoPublic = () =>
  new Promise(async (resolve, reject) => {
    try {
      const filter = file => {
        return !/\/\./.test(file)
      }
      await fs.copy('../dnb-ui-lib/assets', './public/assets/', {
        filter
      })
      // use only the gatsby "/static" folder for now
      // await fs.copy('./src/public', './public/', { filter })
    } catch (e) {
      console.log(
        'Got an error while copying and merging the "public" folder!',
        e
      )
      reject(e)
    }
    resolve()
  })

module.exports = { copyContentIntoPublic }
