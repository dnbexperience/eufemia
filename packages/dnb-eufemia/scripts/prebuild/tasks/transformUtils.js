import path from 'path'
import sass from 'sass'
import postcss from 'postcss'
import cssnano from 'cssnano'
import { log } from '../../lib'

export const transformCssnano = (config) => async (content, file) => {
  log.info(`> PrePublish: cssnano process | ${file.path}`)

  return (
    await postcss([
      cssnano({
        preset: 'default',
        ...config,
      }),
    ]).process(content, {
      from: file.path,
    })
  ).toString()
}

export const transformSass = (config) => (content, file) => {
  log.info(`> PrePublish: sass process | ${file.path}`)

  let before
  if (typeof window !== 'undefined') {
    before = window.location

    delete window.location
    window.location = {
      href: 'file://',
    }
  }

  const importPath1 = path.dirname(file.path)
  const importPath2 = path.resolve(__dirname, '../../../src/style/core/')

  content = sass.renderSync({
    file: file.path,
    includePaths: [importPath1, importPath2], // use loadPaths for new API
    ...config,
  })

  if (typeof window !== 'undefined') {
    window.location = before
  }

  return String(content.css)
}

export const transformPostcss = (config) => async (content, file) => {
  log.info(`> PrePublish: postcss process | ${file.path}`)

  return (
    await postcss(config).process(content, {
      from: file.path,
    })
  ).toString()
}

export const transformPaths = (from, to) => (content, file) => {
  log.info(`> PrePublish: converting sass to css | ${file.path}`)
  return content.replace(new RegExp(from, 'g'), to)
}
