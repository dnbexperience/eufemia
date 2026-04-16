import stylelint from 'stylelint'
import fs from 'fs'
import os from 'os'
import path from 'path'
const noUnresolvedComponentVarsPlugin = require('../no-unresolved-component-vars.cjs')

const makeTempStyleDir = () => {
  const rootDir = fs.mkdtempSync(
    path.join(os.tmpdir(), 'dnb-unresolved-vars-')
  )
  const styleDir = path.join(rootDir, 'style')
  const themesDir = path.join(styleDir, 'themes')
  fs.mkdirSync(themesDir, { recursive: true })

  return {
    rootDir,
    styleDir,
    themesDir,
    writeStyleFile: (filename: string, content: string) => {
      const filePath = path.join(styleDir, filename)
      fs.writeFileSync(filePath, content, 'utf-8')
      return filePath
    },
    writeThemeFile: (filename: string, content: string) => {
      const filePath = path.join(themesDir, filename)
      fs.writeFileSync(filePath, content, 'utf-8')
      return filePath
    },
    cleanup: () => fs.rmSync(rootDir, { recursive: true, force: true }),
  }
}

const lintWithRule = async ({
  code,
  codeFilename,
  ruleOptions = {},
}: {
  code: string
  codeFilename: string
  ruleOptions?: Record<string, any>
}) => {
  const result = await stylelint.lint({
    code,
    codeFilename,
    customSyntax: 'postcss-scss',
    config: {
      plugins: [noUnresolvedComponentVarsPlugin],
      rules: {
        [noUnresolvedComponentVarsPlugin.ruleName]: [true, ruleOptions],
      },
    },
  })

  return result.results?.[0]?.warnings || []
}

describe('no-unresolved-component-vars', () => {
  let tempDir: ReturnType<typeof makeTempStyleDir>

  beforeEach(() => {
    tempDir = makeTempStyleDir()
  })

  afterEach(() => {
    tempDir.cleanup()
  })

  it('should not flag references to declared properties in the same file', async () => {
    const filePath = tempDir.writeStyleFile(
      'dnb-accordion.scss',
      `.dnb-accordion {
        --accordion-color-text--default: red;
        --accordion-color-text: var(--accordion-color-text--default);
      }`
    )

    const warnings = await lintWithRule({
      code: fs.readFileSync(filePath, 'utf-8'),
      codeFilename: filePath,
    })

    expect(warnings).toHaveLength(0)
  })

  it('should not flag references to properties declared in a sibling theme file', async () => {
    tempDir.writeThemeFile(
      'dnb-accordion-theme-ui.scss',
      `.dnb-accordion {
        --accordion-color-text--default: blue;
        --accordion-color-bg--default: white;
      }`
    )
    const filePath = tempDir.writeStyleFile(
      'dnb-accordion.scss',
      `.dnb-accordion {
        --accordion-color-text: var(--accordion-color-text--default);
        --accordion-color-bg: var(--accordion-color-bg--default);
      }`
    )

    const warnings = await lintWithRule({
      code: fs.readFileSync(filePath, 'utf-8'),
      codeFilename: filePath,
    })

    expect(warnings).toHaveLength(0)
  })

  it('should flag references to undeclared component-scoped properties (typo)', async () => {
    tempDir.writeThemeFile(
      'dnb-accordion-theme-ui.scss',
      `.dnb-accordion {
        --accordion-color-border--default: gray;
      }`
    )
    const filePath = tempDir.writeStyleFile(
      'dnb-accordion.scss',
      `.dnb-accordion {
        --accordion-color-border: var(--accordion-color-boder--default);
      }`
    )

    const warnings = await lintWithRule({
      code: fs.readFileSync(filePath, 'utf-8'),
      codeFilename: filePath,
    })

    expect(warnings).toHaveLength(1)
    expect(warnings[0].text).toContain('--accordion-color-boder--default')
  })

  it('should flag references from theme files to undeclared properties', async () => {
    tempDir.writeStyleFile(
      'dnb-button.scss',
      `.dnb-button {
        --button-color-text: var(--button-color-text--default);
      }`
    )
    const themeFilePath = tempDir.writeThemeFile(
      'dnb-button-theme-ui.scss',
      `.dnb-button {
        --button-color-text--default: green;
        --button-color-bg: var(--button-color-backgrond--default);
      }`
    )

    const warnings = await lintWithRule({
      code: fs.readFileSync(themeFilePath, 'utf-8'),
      codeFilename: themeFilePath,
    })

    expect(warnings).toHaveLength(1)
    expect(warnings[0].text).toContain('--button-color-backgrond--default')
  })

  it('should not flag references to global/token variables', async () => {
    const filePath = tempDir.writeStyleFile(
      'dnb-accordion.scss',
      `.dnb-accordion {
        --accordion-font: var(--font-family-default);
        --accordion-easing: var(--easing-default);
        --accordion-bg: var(--color-white);
        --accordion-token: var(--token-color-text-action);
        color: var(--line-height-basis);
      }`
    )

    const warnings = await lintWithRule({
      code: fs.readFileSync(filePath, 'utf-8'),
      codeFilename: filePath,
    })

    expect(warnings).toHaveLength(0)
  })

  it('should not flag cross-component references from other components', async () => {
    const filePath = tempDir.writeStyleFile(
      'dnb-input.scss',
      `.dnb-input {
        --input-color: red;
        border-radius: var(--button-border-radius);
      }`
    )

    const warnings = await lintWithRule({
      code: fs.readFileSync(filePath, 'utf-8'),
      codeFilename: filePath,
    })

    // --button- is not a prefix derived from files in this style dir
    expect(warnings).toHaveLength(0)
  })

  it('should not flag non-component-prefixed variables', async () => {
    const filePath = tempDir.writeStyleFile(
      'dnb-section.scss',
      `.dnb-section {
        --section-color: red;
        --breakout: var(--breakout--small, var(--breakout--fallback));
      }`
    )

    const warnings = await lintWithRule({
      code: fs.readFileSync(filePath, 'utf-8'),
      codeFilename: filePath,
    })

    // --breakout- does not match the --section- component prefix
    expect(warnings).toHaveLength(0)
  })

  it('should flag unresolved references from a component named in the filename', async () => {
    const filePath = tempDir.writeStyleFile(
      'dnb-misc.scss',
      `.dnb-misc {
        --misc-only-one: red;
        color: var(--misc-unresolved);
      }`
    )

    const warnings = await lintWithRule({
      code: fs.readFileSync(filePath, 'utf-8'),
      codeFilename: filePath,
    })

    // --misc- prefix is derived from dnb-misc.scss filename
    expect(warnings).toHaveLength(1)
    expect(warnings[0].text).toContain('--misc-unresolved')
  })

  it('should flag typo in component property name', async () => {
    const filePath = tempDir.writeStyleFile(
      'dnb-card.scss',
      `.dnb-card {
        --card-color: red;
        --card-border: blue;
        background: var(--card-colr);
      }`
    )

    const warnings = await lintWithRule({
      code: fs.readFileSync(filePath, 'utf-8'),
      codeFilename: filePath,
    })

    expect(warnings).toHaveLength(1)
    expect(warnings[0].text).toContain('--card-colr')
  })

  it('should not flag var() with fallback values (intentionally optional)', async () => {
    const filePath = tempDir.writeStyleFile(
      'dnb-widget.scss',
      `.dnb-widget {
        --widget-color: blue;
        --widget-size: large;
        border: var(--widget-colr, red);
      }`
    )

    const warnings = await lintWithRule({
      code: fs.readFileSync(filePath, 'utf-8'),
      codeFilename: filePath,
    })

    // Has a CSS fallback value → intentionally optional
    expect(warnings).toHaveLength(0)
  })

  it('should flag var() without fallback for undeclared properties', async () => {
    const filePath = tempDir.writeStyleFile(
      'dnb-widget.scss',
      `.dnb-widget {
        --widget-color: blue;
        --widget-size: large;
        border: var(--widget-colr);
      }`
    )

    const warnings = await lintWithRule({
      code: fs.readFileSync(filePath, 'utf-8'),
      codeFilename: filePath,
    })

    expect(warnings).toHaveLength(1)
    expect(warnings[0].text).toContain('--widget-colr')
  })

  it('should not flag var() references to foundation variables (--dnb-*, --sbanken-*, --carnegie-*)', async () => {
    const filePath = tempDir.writeStyleFile(
      'dnb-accordion.scss',
      `.dnb-accordion {
        --accordion-one: red;
        --accordion-two: green;
        color: var(--dnb-color-sea-green);
        background: var(--sbanken-color-magenta);
        border-color: var(--carnegie-color-dark);
      }`
    )

    const warnings = await lintWithRule({
      code: fs.readFileSync(filePath, 'utf-8'),
      codeFilename: filePath,
    })

    expect(warnings).toHaveLength(0)
  })

  it('should support custom globalPrefixes option', async () => {
    const filePath = tempDir.writeStyleFile(
      'dnb-test.scss',
      `.dnb-test {
        --test-a: one;
        --test-b: two;
        color: var(--test-typo);
        background: var(--custom-global-thing);
      }`
    )

    // Without the custom prefix, --custom-global-thing would not be
    // flagged because --custom- doesn't match the --test- component prefix.
    // But --test-typo should be flagged regardless.
    const warnings = await lintWithRule({
      code: fs.readFileSync(filePath, 'utf-8'),
      codeFilename: filePath,
      ruleOptions: {
        globalPrefixes: [
          '--token-',
          '--color-',
          '--font-',
          '--line-height-',
          '--spacing-',
          '--easing-',
          '--b-',
          '--dnb-',
          '--sbanken-',
          '--sb-',
          '--carnegie-',
          '--eiendom-',
          '--custom-global-',
        ],
      },
    })

    // Only --test-typo is flagged; --custom-global-thing is skipped
    expect(warnings).toHaveLength(1)
    expect(warnings[0].text).toContain('--test-typo')
  })

  it('should handle multiple var() references on the same declaration', async () => {
    tempDir.writeThemeFile(
      'dnb-box-theme.scss',
      `.dnb-box {
        --box-color-ok: green;
        --box-size-ok: 1rem;
      }`
    )
    const filePath = tempDir.writeStyleFile(
      'dnb-box.scss',
      `.dnb-box {
        border: var(--box-widht) solid var(--box-color-ok);
      }`
    )

    const warnings = await lintWithRule({
      code: fs.readFileSync(filePath, 'utf-8'),
      codeFilename: filePath,
    })

    expect(warnings).toHaveLength(1)
    expect(warnings[0].text).toContain('--box-widht')
  })

  it('should not flag var() references for files without dnb- prefix in name', async () => {
    // File doesn't follow dnb-<name>.scss convention — no component prefix derived
    const randomDir = path.join(tempDir.rootDir, 'random')
    fs.mkdirSync(randomDir, { recursive: true })
    const filePath = path.join(randomDir, 'random.scss')
    fs.writeFileSync(
      filePath,
      `.random { color: var(--random-missing-thing); }`,
      'utf-8'
    )

    const warnings = await lintWithRule({
      code: fs.readFileSync(filePath, 'utf-8'),
      codeFilename: filePath,
    })

    expect(warnings).toHaveLength(0)
  })

  it('should flag inner nested var() without its own fallback', async () => {
    const filePath = tempDir.writeStyleFile(
      'dnb-panel.scss',
      `.dnb-panel {
        --panel-one: a;
        --panel-two: b;
        color: var(--panel-one, var(--panel-tree));
      }`
    )

    const warnings = await lintWithRule({
      code: fs.readFileSync(filePath, 'utf-8'),
      codeFilename: filePath,
    })

    // The outer var has a fallback so --panel-one is skipped,
    // but the inner var(--panel-tree) has no fallback itself
    expect(warnings).toHaveLength(1)
    expect(warnings[0].text).toContain('--panel-tree')
  })

  it('should not flag state variants when base variable is declared', async () => {
    const filePath = tempDir.writeStyleFile(
      'dnb-button.scss',
      `.dnb-button {
        --button-color-underline: none;
        --button-border-inset: inset;
        --button-border-width: 1px;

        &:active {
          --button-color-underline: var(--button-color-underline--active);
          --button-border-inset: var(--button-border-inset--active);
          --button-border-width: var(--button-border-width--active);
        }

        &:focus {
          --button-color-underline: var(--button-color-underline--focus);
        }
      }`
    )

    const warnings = await lintWithRule({
      code: fs.readFileSync(filePath, 'utf-8'),
      codeFilename: filePath,
    })

    // --button-color-underline is declared, so --button-color-underline--active is valid
    expect(warnings).toHaveLength(0)
  })

  it('should still flag state variants with typo in base name', async () => {
    const filePath = tempDir.writeStyleFile(
      'dnb-button.scss',
      `.dnb-button {
        --button-color-underline: none;

        &:active {
          --button-color-underline: var(--button-color-underlne--active);
        }
      }`
    )

    const warnings = await lintWithRule({
      code: fs.readFileSync(filePath, 'utf-8'),
      codeFilename: filePath,
    })

    // --button-color-underlne is NOT declared (typo), so --active variant is flagged
    expect(warnings).toHaveLength(1)
    expect(warnings[0].text).toContain('--button-color-underlne--active')
  })

  it('should handle empty var references gracefully', async () => {
    const filePath = tempDir.writeStyleFile(
      'dnb-empty.scss',
      `.dnb-empty {
        --empty-a: one;
        --empty-b: two;
        color: red;
      }`
    )

    const warnings = await lintWithRule({
      code: fs.readFileSync(filePath, 'utf-8'),
      codeFilename: filePath,
    })

    expect(warnings).toHaveLength(0)
  })
})
