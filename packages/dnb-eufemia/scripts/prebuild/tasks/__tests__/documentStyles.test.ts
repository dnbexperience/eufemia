import path from 'node:path'
import { runFactory } from '../makeMainStyle'
import { validateCssBuffer } from '../../validateCompiledCss'

const styleRoot = path.resolve(__dirname, '../../../../src/style')

describe('Document style distribution', () => {
  it.each(['test', 'production'])(
    'builds valid %s CSS entry points',
    async (mode) => {
      vi.stubEnv('NODE_ENV', mode)
      const logging = vi.spyOn(console, 'log').mockImplementation(() => {})
      try {
        for (const name of ['document', 'print']) {
          const source = `./src/style/dnb-ui-${name}.scss`
          const files = await runFactory(source, { returnFiles: true })
          const css = await runFactory(source, { returnResult: true })
          const expected =
            mode === 'production'
              ? [
                  `dnb-ui-${name}--isolated.css`,
                  `dnb-ui-${name}--isolated.min.css`,
                  `dnb-ui-${name}.css`,
                  `dnb-ui-${name}.min.css`,
                ]
              : [`dnb-ui-${name}.css`, `dnb-ui-${name}.min.css`]
          expect(files).toEqual(
            expected.map((file) => path.join(styleRoot, file))
          )
          expect(css).toHaveLength(expected.length)
          for (const content of css) {
            expect(() =>
              validateCssBuffer(name, Buffer.from(content))
            ).not.toThrow()
          }
          expect(css[0].includes('eufemia-scope--')).toBe(
            mode === 'production'
          )
        }
      } finally {
        logging.mockRestore()
        vi.unstubAllEnvs()
      }
    },
    30_000
  )
})
