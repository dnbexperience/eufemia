import sass from 'node-sass'
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

  content = sass.renderSync({
    data: content,
    file: file.path,
    ...config,
  })

  return content.css.toString()
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
