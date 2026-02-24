import stylelint from 'stylelint'
import fs from 'fs'
import os from 'os'
import path from 'path'
const tokenNamePolicyPlugin = require('../token-name-policy')

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
      plugins: [tokenNamePolicyPlugin as any],
      rules: {
        [tokenNamePolicyPlugin.ruleName]: [
          true,
          {
            themePrefixes: {
              ui: 'dnb',
              sbanken: 'sbanken',
              carnegie: 'carnegie',
            },
            ...ruleOptions,
          },
        ],
      },
    },
  })

  return result.results?.[0]?.warnings || []
}

const makeTempTokenFiles = () => {
  const rootDir = fs.mkdtempSync(
    path.join(os.tmpdir(), 'dnb-token-stylelint-')
  )

  const files = {
    ui: 'src/style/themes/ui/tokens.scss',
    sbanken: 'src/style/themes/sbanken/tokens.scss',
    carnegie: 'src/style/themes/carnegie/tokens.scss',
  }

  for (const relativePath of Object.values(files)) {
    fs.mkdirSync(path.dirname(path.join(rootDir, relativePath)), {
      recursive: true,
    })
  }

  return {
    rootDir,
    files,
    cleanup: () => fs.rmSync(rootDir, { recursive: true, force: true }),
  }
}

describe('token-name-policy stylelint rule', () => {
  it('flags variables ending with -wip', async () => {
    const errors = await lintWithRule({
      code: ':root { --carnegie-blue-500-wip: #123; }',
      codeFilename: '/repo/src/style/themes/carnegie/foundation.scss',
    })

    expect(errors).toHaveLength(1)
    expect(errors[0].text).toContain('Suffix "-wip" is not allowed')
  })

  it('flags wrong prefix in carnegie foundation variables', async () => {
    const errors = await lintWithRule({
      code: ':root { --dnb-blue-500: #123; }',
      codeFilename: '/repo/src/style/themes/carnegie/foundation.scss',
    })

    expect(errors).toHaveLength(1)
    expect(errors[0].text).toContain('Expected prefix "--carnegie-"')
  })

  it('allows correct prefix in carnegie foundation variables', async () => {
    const errors = await lintWithRule({
      code: ':root { --carnegie-blue-500: #123; }',
      codeFilename: '/repo/src/style/themes/carnegie/foundation.scss',
    })

    expect(errors).toHaveLength(0)
  })

  it('does not enforce theme prefix in non-foundation files', async () => {
    const errors = await lintWithRule({
      code: ':root { --token-color-background-action: var(--color-black); }',
      codeFilename: '/repo/src/components/button/style/dnb-button.scss',
    })

    expect(errors).toHaveLength(0)
  })

  it('flags wrong token reference prefix in carnegie tokens', async () => {
    const errors = await lintWithRule({
      code: `:root {
        --token-color-component-table-background-neutral-alternative: var(--dnb-greyscale-25);
      }`,
      codeFilename: '/repo/src/style/themes/carnegie/tokens.scss',
    })

    expect(errors).toHaveLength(1)
    expect(errors[0].text).toContain(
      'Unexpected token reference "--dnb-greyscale-25"'
    )
    expect(errors[0].text).toContain('Expected prefix "--carnegie-"')
  })

  it('allows carnegie-prefixed token references in carnegie tokens', async () => {
    const errors = await lintWithRule({
      code: `:root {
        --token-color-component-table-background-neutral-alternative: var(--carnegie-greyscale-25);
      }`,
      codeFilename: '/repo/src/style/themes/carnegie/tokens.scss',
    })

    expect(errors).toHaveLength(0)
  })

  it('flags invalid 1st segment prefix (must start with --token-) in tokens files', async () => {
    const errors = await lintWithRule({
      code: ':root { --carnegie-color-background-action: #123; }',
      codeFilename: '/repo/src/style/themes/carnegie/tokens.scss',
    })

    expect(errors).toHaveLength(1)
    expect(errors[0].text).toContain('Expected prefix "--token-"')
  })

  it('flags invalid 2nd segment category in tokens files', async () => {
    const errors = await lintWithRule({
      code: ':root { --token-brand-background-action: #123; }',
      codeFilename: '/repo/src/style/themes/carnegie/tokens.scss',
    })

    expect(errors).toHaveLength(1)
    expect(errors[0].text).toContain(
      'Expected "--token-" followed by one of: color'
    )
  })

  it('flags invalid 3rd segment category for --token-color-* in tokens files', async () => {
    const errors = await lintWithRule({
      code: ':root { --token-color-brand-action: #123; }',
      codeFilename: '/repo/src/style/themes/carnegie/tokens.scss',
    })

    expect(errors).toHaveLength(1)
    expect(errors[0].text).toContain(
      'Expected "--token-color-" followed by one of:'
    )
  })

  it('flags invalid 4th semantic segment for token color variables', async () => {
    const errors = await lintWithRule({
      code: ':root { --token-color-text-brand: #123; }',
      codeFilename: '/repo/src/style/themes/carnegie/tokens.scss',
    })

    expect(errors).toHaveLength(1)
    expect(errors[0].text).toContain(
      'Expected the 4th segment to be one of:'
    )
  })

  it('allows valid 4th semantic segment for token color variables', async () => {
    const errors = await lintWithRule({
      code: ':root { --token-color-text-neutral: #123; }',
      codeFilename: '/repo/src/style/themes/carnegie/tokens.scss',
    })

    expect(errors).toHaveLength(0)
  })

  it('flags foundation variable usage outside tokens.scss', async () => {
    const errors = await lintWithRule({
      code: '.dnb-button { color: var(--carnegie-greyscale-25); }',
      codeFilename: '/repo/src/components/button/style/dnb-button.scss',
    })

    expect(errors).toHaveLength(1)
    expect(errors[0].text).toContain('outside tokens.scss')
  })

  it('allows --dnb-payment-* references outside tokens.scss', async () => {
    const errors = await lintWithRule({
      code: '.dnb-payment-card { border-radius: var(--dnb-payment-border-radius); }',
      codeFilename:
        '/repo/src/extensions/payment-card/style/dnb-payment-card.scss',
    })

    expect(errors).toHaveLength(0)
  })

  it('allows foundation variable usage inside tokens.scss', async () => {
    const errors = await lintWithRule({
      code: ':root { --token-color-text-neutral: var(--carnegie-greyscale-25); }',
      codeFilename: '/repo/src/style/themes/carnegie/tokens.scss',
    })

    expect(errors).toHaveLength(0)
  })

  it('flags unknown --token reference outside tokens.scss', async () => {
    const errors = await lintWithRule({
      code: '.dnb-button { color: var(--token-color-text-does-not-exist); }',
      codeFilename: '/repo/src/components/button/style/dnb-button.scss',
    })

    expect(errors).toHaveLength(1)
    expect(errors[0].text).toContain(
      'token was not found in theme token files'
    )
  })

  it('allows known --token reference outside tokens.scss', async () => {
    const errors = await lintWithRule({
      code: '.dnb-button { color: var(--token-color-text-neutral); }',
      codeFilename: '/repo/src/components/button/style/dnb-button.scss',
    })

    expect(errors).toHaveLength(0)
  })

  it('flags when current brand tokens are missing tokens from other brands', async () => {
    const temp = makeTempTokenFiles()

    try {
      fs.writeFileSync(
        path.join(temp.rootDir, temp.files.ui),
        ':root { --token-color-text-neutral: #111; --token-color-text-action: #222; }\n'
      )
      fs.writeFileSync(
        path.join(temp.rootDir, temp.files.sbanken),
        ':root { --token-color-text-neutral: #111; --token-color-text-action: #222; }\n'
      )
      fs.writeFileSync(
        path.join(temp.rootDir, temp.files.carnegie),
        ':root { --token-color-text-neutral: #111; }\n'
      )

      const errors = await lintWithRule({
        code: fs.readFileSync(
          path.join(temp.rootDir, temp.files.carnegie),
          'utf-8'
        ),
        codeFilename: path.join(temp.rootDir, temp.files.carnegie),
        ruleOptions: {
          projectRoot: temp.rootDir,
          tokenFiles: Object.values(temp.files),
        },
      })

      expect(
        errors.some((e) => e.text.includes('--token-color-text-action'))
      ).toBe(true)
    } finally {
      temp.cleanup()
    }
  })

  it('passes when all brand token files contain the same token declarations', async () => {
    const temp = makeTempTokenFiles()

    try {
      const content =
        ':root { --token-color-text-neutral: #111; --token-color-text-action: #222; }\n'

      fs.writeFileSync(path.join(temp.rootDir, temp.files.ui), content)
      fs.writeFileSync(path.join(temp.rootDir, temp.files.sbanken), content)
      fs.writeFileSync(path.join(temp.rootDir, temp.files.carnegie), content)

      const errors = await lintWithRule({
        code: content,
        codeFilename: path.join(temp.rootDir, temp.files.carnegie),
        ruleOptions: {
          projectRoot: temp.rootDir,
          tokenFiles: Object.values(temp.files),
        },
      })

      expect(
        errors.some((e) =>
          e.text.includes('All brand tokens.scss files')
        )
      ).toBe(false)
    } finally {
      temp.cleanup()
    }
  })
})
