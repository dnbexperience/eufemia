import path from 'path'
import sass from 'sass'
import postcss, { type AcceptedPlugin } from 'postcss'
import cssnano from 'cssnano'
import { log } from '../../lib'

export const transformCssnano =
  (config: Record<string, unknown> = {}) =>
  async (content: string, file: { path: string }) => {
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

export const transformSass =
  (config: Record<string, unknown> = {}) =>
  (content: string, file: { path: string }) => {
    log.info(`> PrePublish: sass process | ${file.path}`)

    type LocationLike = Location | { href: string }
    let before: LocationLike | null
    // Only manipulate window.location if we're not in a test environment
    // Check for Jest environment more reliably
    const isTestEnv =
      process.env.NODE_ENV === 'test' ||
      process.env.JEST_WORKER_ID !== undefined ||
      typeof jest !== 'undefined'

    if (typeof window !== 'undefined' && !isTestEnv) {
      try {
        const windowRef = window as { location: LocationLike }
        before = windowRef.location

        delete windowRef.location
        windowRef.location = {
          href: 'file://',
        }
      } catch (error) {
        // Ignore errors in test environment
        before = null
      }
    }

    const importPath1 = path.dirname(file.path)
    const importPath2 = path.resolve(__dirname, '../../../src/style/core/')

    const sassResult = sass.renderSync({
      file: file.path,
      includePaths: [importPath1, importPath2], // use loadPaths for new API
      ...config,
    })

    if (typeof window !== 'undefined' && before && !isTestEnv) {
      try {
        const windowRef = window as { location: LocationLike }
        windowRef.location = before
      } catch (error) {
        // Ignore errors in test environment
      }
    }

    return String(sassResult.css)
  }

export const transformPostcss =
  (config: AcceptedPlugin[]) =>
  async (content: string, file: { path: string }) => {
    log.info(`> PrePublish: postcss process | ${file.path}`)

    return (
      await postcss(config).process(content, {
        from: file.path,
      })
    ).toString()
  }

export const transformPaths =
  (from: string, to: string) => (content: string) => {
    return content.replace(new RegExp(from, 'g'), to)
  }
