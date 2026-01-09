/* eslint-disable jest/no-conditional-expect */
/**
 * Test for the post-build stage
 *
 * NB: check if important files do exists,
 * you may else run "yarn workspace @dnb/eufemia build:ci" in order to build all files.
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

  it('should not contain any .cjs or .mjs files', () => {
    const buildDir = path.resolve(packpath.self(), 'build')
    const files = fs.readdirSync(buildDir, { recursive: true })

    // List of allowed .cjs or .mjs files
    const allowedFiles = [
      '/BuildInfo.cjs',
      '/BuildInfoData.cjs',
      '/plugin-scope-hash.cjs',
      '/dnb-ui-lib.min.mjs',
      '/dnb-ui-basis.min.mjs',
      '/dnb-ui-components.min.mjs',
      '/dnb-ui-elements.min.mjs',
      '/dnb-ui-extensions.min.mjs',
      '/dnb-ui-icons.min.mjs',
    ]

    const invalidExtensions = files.filter(
      (file) =>
        typeof file === 'string' &&
        (file.endsWith('.cjs') || file.endsWith('.mjs')) &&
        !allowedFiles.some((allowed) => file.endsWith(allowed))
    )

    expect(invalidExtensions).toHaveLength(0)
  })

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
            expect(content).toContain(
              `var _default = exports.default = {};`
            )

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
            expect(content).toContain(
              'var _default = exports.default = Breadcrumb'
            )
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
            expect(content).not.toContain('core-js-pure/modules/es')
            expect(content).toContain(
              'import _extends from "@babel/runtime-corejs3/helpers/esm/extends";'
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
              'import _extends from "@babel/runtime-corejs3/helpers/esm/extends";'
            )
          }

          {
            const content = fs.readFileSync(
              path.resolve(
                packpath.self(),
                `build${stage}/shared/useTranslation.js`
              ),
              'utf-8'
            )
            expect(content).toContain('_Object$hasOwn')
            expect(content).not.toContain('Object.hasOwn')
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
            expect(content).not.toContain('core-js-pure/modules/es')
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
            expect(content).not.toContain('core-js-pure/modules/es')
            expect(content).toContain(
              'import _extends from "@babel/runtime/helpers/esm/extends";'
            )
          }

          {
            const content = fs.readFileSync(
              path.resolve(
                packpath.self(),
                `build${stage}/shared/useTranslation.js`
              ),
              'utf-8'
            )
            expect(content).toContain('Object.hasOwn')
            expect(content).not.toContain('_Object$hasOwn')
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

describe('tsdown build', () => {
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
            expect(content).toMatch(/import\s\w,/)
            expect(content).toContain('}from"react";')
            expect(content).toContain('}from"react-dom";')
            expect(content).toMatch(
              /import\*as \w from"\.\.\/icons\/dnb\/primary_icons";/ // "../icons/dnb/primary_icons"
            )
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
            expect(content).toContain('function(e,t)')
            expect(content).toContain('require(`react`),')
            expect(content).toContain('require(`react-dom`)):')
            expect(content).toContain(
              'require(`../icons/dnb/primary_icons`)'
            )
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
      expect(content).toContain(`@import './core/scopes.scss';`)
      expect(content).toContain(`
.dnb-core-style {
  @include bodyDefault();
}`)
      expect(content).toContain(
        `@import './core/helper-classes/helper-classes.scss';`
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
      expect(content).toContain(`@import './properties.scss';`)
      expect(content).toContain(`@import './fonts.scss';`)
      expect(content).toContain(`@import './ui-theme-elements.scss';`)
      expect(content).not.toContain(
        `@import '../../dnb-ui-elements.scss';`
      )
    }

    {
      const content = fs.readFileSync(
        path.resolve(
          packpath.self(),
          `build${stage}/style/themes/theme-sbanken/sbanken-theme-basis.scss`
        ),
        'utf-8'
      )
      expect(content).toContain(`@import './properties.scss';`)
      expect(content).toContain(`@import './fonts.scss';`)
      expect(content).toContain(`@import './sbanken-theme-elements.scss';`)
      expect(content).not.toContain(
        `@import '../../dnb-ui-elements.scss';`
      )
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

    {
      const content = fs.readFileSync(
        path.resolve(
          packpath.self(),
          `build${stage}/style/dnb-ui-basis.min.css`
        ),
        'utf-8'
      )
      expect(content).toContain('html{font-size:100%}')
    }

    {
      const content = fs.readFileSync(
        path.resolve(
          packpath.self(),
          `build${stage}/style/dnb-ui-basis--isolated.min.css`
        ),
        'utf-8'
      )
      const matchCount = (content.match(/\.eufemia-scope--/g) || []).length
      expect(matchCount).toBeGreaterThan(100)
    }

    // Test that properties-tailwind.css files exist in src directory (generated by prebuild)
    const themeTests = [
      {
        theme: 'theme-ui',
        expectedFontFamily: "--font-default: 'DNB', sans-serif;",
        expectedColor: '--color-black: #000;',
      },
      {
        theme: 'theme-sbanken',
        expectedFontFamily:
          "--font-sb-default: 'Roboto', 'Helvetica', 'Arial', sans-serif;",
        expectedColor: '--color-sb-purple: #1c1b4e;',
      },
      {
        theme: 'theme-eiendom',
        expectedFontFamily: "--font-default: 'DNB', sans-serif;",
        expectedColor: '--color-black: #000;',
      },
    ]

    themeTests.forEach(({ theme, expectedFontFamily, expectedColor }) => {
      const filePath = path.resolve(
        packpath.self(),
        `src/style/themes/${theme}/properties-tailwind.css`
      )
      expect(fs.existsSync(filePath)).toBe(true)

      const content = fs.readFileSync(filePath, 'utf-8')
      expect(content).toContain(
        '/* This file is auto generated by makePropertiesFile.js */'
      )
      expect(content).toContain(
        '/* stylelint-disable-next-line scss/at-rule-no-unknown */'
      )
      expect(content).toContain('@theme {')
      expect(content).toContain(expectedFontFamily)
      expect(content).toContain(expectedColor)
    })
  })
})
