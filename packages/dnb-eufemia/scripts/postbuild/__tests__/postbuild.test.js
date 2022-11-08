/**
 * Test postbuild stage
 * check if important files do exists
 *
 */

import fs from 'fs-extra'
import path from 'path'
import packpath from 'packpath'
import { getCommittedFiles } from '../../tools/cliTools'

const makeStagePathException = (stage) => (stage === '/esm' ? '' : stage)

describe('type definitions', () => {
  const buildStages = ['/es', '/esm', '/cjs']

  it.each(buildStages)('has d.ts index file on stage %s', (stage) => {
    stage = makeStagePathException(stage)

    const file = path.resolve(packpath.self(), `build${stage}/index.d.ts`)
    const exists = fs.existsSync(file)

    expect(exists).toBe(true)
  })

  it.each(buildStages)(
    'has correct Input type definitions on stage %s',
    (stage) => {
      stage = makeStagePathException(stage)

      expect(
        fs.existsSync(
          path.resolve(
            packpath.self(),
            `build${stage}/components/Input.d.ts`
          )
        )
      ).toBe(true)

      // To ensure babel did not compile the d.ts file
      expect(
        fs.readFileSync(
          path.resolve(
            packpath.self(),
            `build${stage}/components/input/Input.d.ts`
          ),
          'utf-8'
        )
      ).toMatch(/export interface/g)

      // Test the output of js files
      const file = path.resolve(
        packpath.self(),
        `build${stage}/components/input/Input.d.ts`
      )

      expect(fs.existsSync(file)).toBe(true)

      const content = fs.readFileSync(file, 'utf-8')
      expect(content).toContain(
        'export interface InputProps extends React.HTMLProps<HTMLElement>'
      )
    }
  )

  it.each(buildStages)(
    'has correct Breadcrumb type definitions on stage %s',
    (stage) => {
      stage = makeStagePathException(stage)

      // Test the output of tsx files
      const tsxFile = path.resolve(
        packpath.self(),
        `build${stage}/components/breadcrumb/Breadcrumb.tsx`
      )
      const dtsFile = path.resolve(
        packpath.self(),
        `build${stage}/components/breadcrumb/Breadcrumb.d.ts`
      )

      expect(fs.existsSync(tsxFile)).toBe(false)
      expect(fs.existsSync(dtsFile)).toBe(true)

      const content = fs.readFileSync(dtsFile, 'utf-8')
      expect(content).toContain('export interface BreadcrumbProps')
    }
  )
})

describe('babel build', () => {
  const buildStages = ['/es', '/esm', '/cjs']

  it('imports inside "src" should not contain "/src/"', async () => {
    const files = await getCommittedFiles()

    files
      .filter((filePath) => {
        return filePath.includes('/dnb-eufemia/src/')
      })
      .map((filePath) => {
        return filePath.replace('packages/dnb-eufemia/', '')
      })
      .forEach((filePath) => {
        const absolutePath = path.resolve(process.cwd(), filePath)
        if (fs.existsSync(absolutePath)) {
          const content = fs.readFileSync(absolutePath, 'utf-8')
          expect(content).not.toMatch(/.*import.*(\/src\/)/)
        }
      })
  })

  it.each(buildStages)('has correctly compiled on stage "%s"', (stage) => {
    switch (stage) {
      case '/cjs':
        {
          {
            const content = fs.readFileSync(
              path.resolve(packpath.self(), `build${stage}/index.js`),
              'utf-8'
            )
            expect(content).toContain(
              'Object.defineProperty(exports, "__esModule", {'
            )
            expect(content).toContain(`var _default = {};`)

            // Has extra cjs package
            expect(
              fs.existsSync(
                path.resolve(packpath.self(), `build${stage}/package.json`)
              )
            ).toBe(true)

            const packageJson = fs.readJsonSync(
              path.resolve(packpath.self(), `build${stage}/package.json`)
            )

            expect(packageJson.type).toBe('commonjs')
          }

          {
            const content = fs.readFileSync(
              path.resolve(
                packpath.self(),
                `build${stage}/components/input/Input.js`
              ),
              'utf-8'
            )
            expect(content).toContain('var Input = function')
            expect(content).toMatch(/^"use strict";/g)
          }

          {
            const content = fs.readFileSync(
              path.resolve(
                packpath.self(),
                `build${stage}/components/breadcrumb/Breadcrumb.js`
              ),
              'utf-8'
            )
            expect(content).toContain('var _default = Breadcrumb')
            expect(content).toMatch(/^"use strict";/g)
          }
        }
        break

      case '/esm':
        {
          stage = makeStagePathException(stage)

          {
            const content = fs.readFileSync(
              path.resolve(packpath.self(), `build${stage}/index.js`),
              'utf-8'
            )
            expect(content).toContain('export default {};')
          }

          {
            const content = fs.readFileSync(
              path.resolve(
                packpath.self(),
                `build${stage}/components/input/Input.js`
              ),
              'utf-8'
            )
            expect(content).toContain('export { Input as default };')
            expect(content).toContain('core-js/modules/es')
            expect(content).toContain(
              'import _extends from "@babel/runtime/helpers/esm/extends";'
            )
          }

          {
            const content = fs.readFileSync(
              path.resolve(
                packpath.self(),
                `build${stage}/components/breadcrumb/Breadcrumb.js`
              ),
              'utf-8'
            )
            expect(content).toContain('export default Breadcrumb;')
            expect(content).toContain(
              'import _extends from "@babel/runtime/helpers/esm/extends";'
            )
          }
        }
        break

      case '/es':
        {
          {
            const content = fs.readFileSync(
              path.resolve(packpath.self(), `build${stage}/index.js`),
              'utf-8'
            )
            expect(content).toContain('export default {};')
          }

          {
            const content = fs.readFileSync(
              path.resolve(
                packpath.self(),
                `build${stage}/components/input/Input.js`
              ),
              'utf-8'
            )
            expect(content).toMatch(/export default class Input extends/g)
            expect(content).not.toContain('core-js/modules/es')
            expect(content).toContain(
              'import _extends from "@babel/runtime/helpers/esm/extends";'
            )
          }

          {
            const content = fs.readFileSync(
              path.resolve(
                packpath.self(),
                `build${stage}/components/breadcrumb/Breadcrumb.js`
              ),
              'utf-8'
            )
            expect(content).toContain('export default Breadcrumb;')
            expect(content).not.toContain('core-js/modules/es')
            expect(content).toContain(
              'import _extends from "@babel/runtime/helpers/esm/extends";'
            )
          }
        }
        break
    }

    stage = makeStagePathException(stage)

    expect(
      fs.existsSync(
        path.resolve(packpath.self(), `build${stage}/components/Input.js`)
      )
    ).toBe(true)
  })
})

describe('rollup build', () => {
  const buildStages = ['/esm', '/umd']

  it.each(buildStages)('has created a package on stage "%s"', (stage) => {
    switch (stage) {
      case '/esm':
        {
          {
            const content = fs.readFileSync(
              path.resolve(
                packpath.self(),
                `build${stage}/dnb-ui-lib.min.mjs`
              ),
              'utf-8'
            )
            expect(content).toContain(`import*as `)
            expect(content).toContain(` from"react-dom";`)
            expect(content).toContain(` from"../icons/primary_icons.js";`)
          }
        }
        break

      case '/umd':
        {
          {
            const content = fs.readFileSync(
              path.resolve(
                packpath.self(),
                `build${stage}/dnb-ui-lib.min.js`
              ),
              'utf-8'
            )
            expect(content).toContain(
              'require("react"),require("react-dom")'
            )
          }
        }
        break
    }
  })
})
