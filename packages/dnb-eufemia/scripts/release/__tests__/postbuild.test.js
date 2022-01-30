/**
 * Test postbuild stage
 * check if important files do exists
 *
 */

import fs from 'fs-extra'
import path from 'path'
import packpath from 'packpath'

const buildStages = ['es', 'esm', 'cjs']

describe('type definitions', () => {
  it.each(buildStages)('has d.ts index file on stage %s', (stage) => {
    const file = path.resolve(packpath.self(), `build/${stage}/index.d.ts`)
    const exists = fs.existsSync(file)
    expect(exists).toBe(true)
  })

  it.each(buildStages)(
    'has correct Input type definitions on stage %s',
    (stage) => {
      expect(
        fs.existsSync(
          path.resolve(
            packpath.self(),
            `build/${stage}/components/Input.d.ts`
          )
        )
      ).toBe(true)

      // To ensure babel did not compile the d.ts file
      expect(
        fs.readFileSync(
          path.resolve(
            packpath.self(),
            `build/${stage}/components/input/Input.d.ts`
          ),
          'utf-8'
        )
      ).toMatch(/export interface/g)
    }
  )
})

describe('babel build', () => {
  it.each(buildStages)('has correctly compiled on stage "%s"', (stage) => {
    expect(
      fs.existsSync(
        path.resolve(packpath.self(), `build/${stage}/components/Input.js`)
      )
    ).toBe(true)

    switch (stage) {
      case 'cjs':
        {
          {
            const content = fs.readFileSync(
              path.resolve(packpath.self(), `build/${stage}/index.js`),
              'utf-8'
            )
            expect(content).toContain(
              'Object.defineProperty(exports, "__esModule", {'
            )
            expect(content).toContain(`var _default = {};`)

            // Has extra cjs package
            expect(
              fs.existsSync(
                path.resolve(
                  packpath.self(),
                  `build/${stage}/package.json`
                )
              )
            ).toBe(true)

            const packageJson = fs.readJsonSync(
              path.resolve(packpath.self(), `build/${stage}/package.json`)
            )

            expect(packageJson.type).toBe('commonjs')
          }

          {
            const content = fs.readFileSync(
              path.resolve(
                packpath.self(),
                `build/${stage}/components/input/Input.js`
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
                `build/${stage}/components/breadcrumb/Breadcrumb.js`
              ),
              'utf-8'
            )
            expect(content).toContain('var _default = Breadcrumb')
            expect(content).toMatch(/^"use strict";/g)
          }
        }
        break

      case 'esm':
        {
          {
            const content = fs.readFileSync(
              path.resolve(packpath.self(), `build/${stage}/index.js`),
              'utf-8'
            )
            expect(content).toContain('export default {};')
          }

          {
            const content = fs.readFileSync(
              path.resolve(
                packpath.self(),
                `build/${stage}/components/input/Input.js`
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
                `build/${stage}/components/breadcrumb/Breadcrumb.js`
              ),
              'utf-8'
            )
            expect(content).toContain('export default Breadcrumb;')
            expect(content).toContain('core-js/modules/es')
            expect(content).toContain(
              'import "core-js/modules/es.array.map.js";'
            )
          }
        }
        break

      case 'es':
        {
          {
            const content = fs.readFileSync(
              path.resolve(packpath.self(), `build/${stage}/index.js`),
              'utf-8'
            )
            expect(content).toContain('export default {};')
          }

          {
            const content = fs.readFileSync(
              path.resolve(
                packpath.self(),
                `build/${stage}/components/input/Input.js`
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
                `build/${stage}/components/breadcrumb/Breadcrumb.js`
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

    if (stage == 'cjs') {
      const exists = fs.existsSync(
        path.resolve(
          packpath.self(),
          `build/${stage}/components/breadcrumb/Breadcrumb.tsx`
        )
      )
      expect(exists).toBe(false)
    } else {
      const content = fs.readFileSync(
        path.resolve(
          packpath.self(),
          `build/${stage}/components/breadcrumb/Breadcrumb.tsx`
        ),
        'utf-8'
      )
      expect(content).toContain('export interface BreadcrumbProps')
    }
  })
})
