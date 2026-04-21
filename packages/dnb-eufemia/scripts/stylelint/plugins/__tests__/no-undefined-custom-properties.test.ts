import stylelint from 'stylelint'
import fs from 'fs'
import os from 'os'
import path from 'path'
const noUndefinedCustomPropertiesPlugin = require('../no-undefined-custom-properties.cjs')

/**
 * Create a temporary directory structure that mimics the src/ tree,
 * so the rule can find declared custom properties.
 */
const makeTempSrcDir = () => {
  const rootDir = fs.mkdtempSync(
    path.join(os.tmpdir(), 'dnb-undefined-props-')
  )
  const srcDir = path.join(rootDir, 'src')
  const styleDir = path.join(srcDir, 'components', 'button', 'style')
  fs.mkdirSync(styleDir, { recursive: true })

  return {
    rootDir,
    srcDir,
    styleDir,
    writeSrcFile: (relativePath: string, content: string) => {
      const filePath = path.join(srcDir, relativePath)
      const dir = path.dirname(filePath)
      fs.mkdirSync(dir, { recursive: true })
      fs.writeFileSync(filePath, content, 'utf-8')
      return filePath
    },
    cleanup: () => fs.rmSync(rootDir, { recursive: true, force: true }),
  }
}

const lintWithRule = async ({
  code,
  codeFilename,
}: {
  code: string
  codeFilename: string
}) => {
  const result = await stylelint.lint({
    code,
    codeFilename,
    customSyntax: 'postcss-scss',
    config: {
      plugins: [noUndefinedCustomPropertiesPlugin],
      rules: {
        [noUndefinedCustomPropertiesPlugin.ruleName]: true,
      },
    },
  })

  return result.results?.[0]?.warnings || []
}

describe('no-undefined-custom-properties', () => {
  let tempDir: ReturnType<typeof makeTempSrcDir>

  beforeEach(() => {
    tempDir = makeTempSrcDir()
  })

  afterEach(() => {
    tempDir.cleanup()
  })

  it('should not flag var() references to properties declared in the same file', async () => {
    const filePath = tempDir.writeSrcFile(
      'components/button/style/dnb-button.scss',
      `.dnb-button {
        --button-color: red;
        color: var(--button-color);
      }`
    )

    const warnings = await lintWithRule({
      code: fs.readFileSync(filePath, 'utf-8'),
      codeFilename: filePath,
    })

    expect(warnings).toHaveLength(0)
  })

  it('should not flag var() references to properties declared in another file', async () => {
    tempDir.writeSrcFile(
      'style/themes/ui/tokens.scss',
      `:root {
        --token-color-primary: blue;
      }`
    )
    const filePath = tempDir.writeSrcFile(
      'components/button/style/dnb-button.scss',
      `.dnb-button {
        color: var(--token-color-primary);
      }`
    )

    const warnings = await lintWithRule({
      code: fs.readFileSync(filePath, 'utf-8'),
      codeFilename: filePath,
    })

    expect(warnings).toHaveLength(0)
  })

  it('should flag var() references to properties not declared anywhere', async () => {
    tempDir.writeSrcFile(
      'components/button/style/dnb-button.scss',
      `.dnb-button {
        --button-color: red;
      }`
    )
    const filePath = tempDir.writeSrcFile(
      'components/card/style/dnb-card.scss',
      `.dnb-card {
        color: var(--nonexistent-property);
      }`
    )

    const warnings = await lintWithRule({
      code: fs.readFileSync(filePath, 'utf-8'),
      codeFilename: filePath,
    })

    expect(warnings).toHaveLength(1)
    expect(warnings[0].text).toContain('--nonexistent-property')
  })

  it('should not flag var() with a fallback value', async () => {
    const filePath = tempDir.writeSrcFile(
      'components/button/style/dnb-button.scss',
      `.dnb-button {
        color: var(--nonexistent-property, red);
      }`
    )

    const warnings = await lintWithRule({
      code: fs.readFileSync(filePath, 'utf-8'),
      codeFilename: filePath,
    })

    expect(warnings).toHaveLength(0)
  })

  it('should flag multiple undefined references in one declaration', async () => {
    tempDir.writeSrcFile(
      'components/button/style/dnb-button.scss',
      `.dnb-button {
        --button-color: red;
      }`
    )
    const filePath = tempDir.writeSrcFile(
      'components/card/style/dnb-card.scss',
      `.dnb-card {
        border: var(--undefined-a) solid var(--undefined-b);
      }`
    )

    const warnings = await lintWithRule({
      code: fs.readFileSync(filePath, 'utf-8'),
      codeFilename: filePath,
    })

    expect(warnings).toHaveLength(2)
  })

  it('should not flag declarations without var()', async () => {
    const filePath = tempDir.writeSrcFile(
      'components/button/style/dnb-button.scss',
      `.dnb-button { color: red; }`
    )

    const warnings = await lintWithRule({
      code: fs.readFileSync(filePath, 'utf-8'),
      codeFilename: filePath,
    })

    expect(warnings).toHaveLength(0)
  })

  it('should find declarations across different component directories', async () => {
    tempDir.writeSrcFile(
      'components/accordion/style/dnb-accordion.scss',
      `.dnb-accordion {
        --accordion-bg: white;
      }`
    )
    const filePath = tempDir.writeSrcFile(
      'components/button/style/dnb-button.scss',
      `.dnb-button {
        background: var(--accordion-bg);
      }`
    )

    const warnings = await lintWithRule({
      code: fs.readFileSync(filePath, 'utf-8'),
      codeFilename: filePath,
    })

    expect(warnings).toHaveLength(0)
  })

  it('should catch typos in property names', async () => {
    tempDir.writeSrcFile(
      'components/button/style/dnb-button.scss',
      `.dnb-button {
        --button-background: blue;
      }`
    )
    const filePath = tempDir.writeSrcFile(
      'components/button/style/themes/dnb-button-theme-ui.scss',
      `.dnb-button {
        background: var(--button-backgroud);
      }`
    )

    const warnings = await lintWithRule({
      code: fs.readFileSync(filePath, 'utf-8'),
      codeFilename: filePath,
    })

    expect(warnings).toHaveLength(1)
    expect(warnings[0].text).toContain('--button-backgroud')
  })
})
