/* eslint-disable jest/no-conditional-expect */
/**
 * Test for the post-build stage
 *
 * NB: check if important files do exists,
 * you may else run "yarn build:ci" in order to build all files.
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
      expect(content).toContain('export interface InputProps')
      expect(content).toContain(
        "extends Omit<React.HTMLProps<HTMLInputElement>, 'ref'>,"
      )
      expect(content).toContain('SpacingProps')
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
      expect(content).toContain('export type BreadcrumbProps')
    }
  )
})

describe('babel build', () => {
  const buildStages = ['/es', '/esm', '/cjs']

  it('imports inside "src" should not contain "/src/"', async () => {
    try {
      const files = await getCommittedFiles(10)

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
            const regex = /.*import.*(\/src\/)/

            if (regex.test(content)) {
              console.error('Failed in this file:', absolutePath)
            }

            expect(content).not.toMatch(regex)
          }
        })
    } catch (error) {
      // In case the git CLI command fails, we do not want to break the run
      console.error(
        'Could not run the CLI command to get the committed files (getCommittedFiles)',
        error
      )
    }
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
            expect(content).toContain('class Input extends')
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
            expect(content).toContain('export default class Input extends')
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

    {
      const content = fs.readFileSync(
        path.resolve(
          packpath.self(),
          `build${stage}/components/card/Card.js`
        ),
        'utf-8'
      )
      expect(content).not.toContain('??')
    }

    {
      const content = fs.readFileSync(
        path.resolve(
          packpath.self(),
          `build${stage}/components/button/Button.js`
        ),
        'utf-8'
      )
      expect(content).toContain('use client')
    }
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
            expect(content).toContain(` from"../icons/dnb/primary_icons";`)
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
            expect(content).toContain('require("react")')
            expect(content).toContain('require("react-dom")')
          }
        }
        break
    }
  })
})

describe('style build', () => {
  const buildStages = ['', '/es', '/cjs']

  it.each(buildStages)('has created a package on stage "%s"', (stage) => {
    {
      const content = fs.readFileSync(
        path.resolve(
          packpath.self(),
          `build${stage}/style/dnb-ui-basis.scss`
        ),
        'utf-8'
      )
      expect(content).toContain(`@use './core/scopes.scss';`)
      expect(content).toContain(`
.dnb-core-style {
  @include bodyDefault();
}`)
      expect(content).toContain(
        `@use './core/helper-classes/helper-classes.scss';`
      )
    }

    {
      const content = fs.readFileSync(
        path.resolve(
          packpath.self(),
          `build${stage}/style/themes/theme-ui/ui-theme-basis.scss`
        ),
        'utf-8'
      )
      expect(content).toContain(`@use './properties.scss';`)
      expect(content).toContain(`@use './fonts.scss';`)
      expect(content).toContain(`@use './ui-theme-elements.scss';`)
      expect(content).not.toContain(`@use '../../dnb-ui-elements.scss';`)
    }

    {
      const content = fs.readFileSync(
        path.resolve(
          packpath.self(),
          `build${stage}/style/themes/theme-sbanken/sbanken-theme-basis.scss`
        ),
        'utf-8'
      )
      expect(content).toContain(`@use './properties.scss';`)
      expect(content).toContain(`@use './fonts.scss';`)
      expect(content).toContain(`@use './sbanken-theme-elements.scss';`)
      expect(content).not.toContain(`@use '../../dnb-ui-elements.scss';`)
    }

    {
      const content = fs.readFileSync(
        path.resolve(
          packpath.self(),
          `build${stage}/style/dnb-ui-core.css`
        ),
        'utf-8'
      )
      expect(content).toMatch(
        /\.dnb-core-style {([\r\n][^}]*)+font-family: var\(--font-family-default\);/
      )
      expect(content).toMatch(
        /html {([\r\n][^}]*)+line-height: var\(--line-height-basis\);/
      )
    }

    {
      const content = fs.readFileSync(
        path.resolve(
          packpath.self(),
          `build${stage}/style/dnb-ui-basis.css`
        ),
        'utf-8'
      )
      expect(content).toMatch(
        /\.dnb-core-style {([\r\n][^}]*)+font-family: var\(--font-family-default\);/
      )
      expect(content).not.toMatch(
        /html {([\r\n][^}]*)+line-height: var\(--line-height-basis\);/
      )
    }

    {
      const content = fs.readFileSync(
        path.resolve(
          packpath.self(),
          `build${stage}/style/themes/theme-ui/ui-theme-basis.css`
        ),
        'utf-8'
      )
      expect(content).toContain(
        `--font-family-default: "DNB", sans-serif;`
      )
      expect(content).toContain(`.dnb-typo-regular`)
      expect(content).toContain(`@font-face`)
      expect(content).toContain(
        `src: url("../../../assets/fonts/dnb/DNB-Regular.woff2") format("woff2"),`
      )
      expect(content).toContain(`
.dnb-p {
  font-size: var(--font-size-basis);
  padding: 0;
}`)
      expect(content).toContain(`
.dnb-h--basis {
  font-size: var(--typography-h-basis-font-size);
  line-height: var(--typography-h-basis-line-height);
  font-weight: var(--typography-h-basis-weight);
  font-family: var(--typography-h-basis-font-family);
}`)
    }

    {
      const content = fs.readFileSync(
        path.resolve(
          packpath.self(),
          `build${stage}/style/themes/theme-sbanken/sbanken-theme-basis.css`
        ),
        'utf-8'
      )
      expect(content).toContain(`font-family: MaisonNeueHeadings;`)
      expect(content).toContain(`
.dnb-p {
  font-size: var(--font-size-basis);
  padding: 0;
}`)
      expect(content).toContain(`
.dnb-h--basis {
  font-size: var(--typography-h-basis-font-size);
  line-height: var(--typography-h-basis-line-height);
  font-weight: var(--typography-h-basis-weight);
  font-family: var(--typography-h-basis-font-family);
}`)
    }

    {
      const content = fs.readFileSync(
        path.resolve(
          packpath.self(),
          `build${stage}/style/themes/theme-sbanken/sbanken-theme-components.css`
        ),
        'utf-8'
      )
      expect(content).toContain(`.dnb-button {`)
    }

    {
      const content = fs.readFileSync(
        path.resolve(
          packpath.self(),
          `build${stage}/style/themes/theme-ui/ui-theme-components.css`
        ),
        'utf-8'
      )
      expect(content).not.toContain(`\\`)
    }
  })
})
