/**
 * CLI Commands
 *
 */

import chalk from 'chalk'
import fs from 'fs'

const ignoredExtensions = [
  'css',
  'scss',
  'styl',
  'less',
  'png',
  'gif',
  'jpg',
  'jpeg',
  'svg',
  'woff',
  'ttf',
  'eot',
  'otf',
  'mp4',
  'webm',
  'ogg',
  'mp3',
  'wav',
  'md',
  'yaml'
]
ignoredExtensions.forEach(ext => {
  require.extensions[`.${ext}`] = () => {}
})

const cmd = process.argv[2]

const run = () => {
  if (['-v', '--version'].indexOf(cmd) !== -1) {
    const packageJson = JSON.parse(
      fs.readFileSync(`${__dirname}/../../package.json`, 'utf8')
    )
    return console.log(packageJson.version)
  }

  if (cmd === 'prepublish') {
    return require('./prepublish')
  }

  if (cmd === 'generate-icons') {
    return require('./generate-icons')
  }

  console.log(
    `
    Usage: dnb-ui-lib <command>

    - ${chalk.green('build')} - build site for production

    Options:

    -v, --version output the version number
    `
  )
}
run()
