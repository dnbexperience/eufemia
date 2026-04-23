import stylelint from 'stylelint'
const plugin = require('../dollar-variable-no-camel-case.cjs')

const lintWithRule = async (code: string) => {
  const result = await stylelint.lint({
    code,
    codeFilename: 'test.scss',
    customSyntax: 'postcss-scss',
    config: {
      plugins: [plugin],
      rules: {
        [plugin.ruleName]: true,
      },
    },
  })

  return result.results?.[0]?.warnings || []
}

describe('dollar-variable-no-camel-case', () => {
  it('should report camelCase $variable declarations', async () => {
    const warnings = await lintWithRule(`
      $myVar: red;
    `)

    expect(warnings).toHaveLength(1)
    expect(warnings[0].text).toContain('$myVar')
    expect(warnings[0].text).toContain('$my-var')
  })

  it('should not report kebab-case $variable declarations', async () => {
    const warnings = await lintWithRule(`
      $my-var: red;
    `)

    expect(warnings).toHaveLength(0)
  })

  it('should not report single-word $variable declarations', async () => {
    const warnings = await lintWithRule(`
      $color: red;
    `)

    expect(warnings).toHaveLength(0)
  })

  it('should not report SCREAMING_CASE $variable declarations', async () => {
    const warnings = await lintWithRule(`
      $THEME_FALLBACK: 'ui';
    `)

    expect(warnings).toHaveLength(0)
  })

  it('should report camelCase mixin parameters', async () => {
    const warnings = await lintWithRule(`
      @mixin test($bgColor: null, $textColor: null) {
        color: $textColor;
      }
    `)

    expect(warnings).toHaveLength(2)
    expect(warnings[0].text).toContain('$bgColor')
    expect(warnings[1].text).toContain('$textColor')
  })

  it('should not report kebab-case mixin parameters', async () => {
    const warnings = await lintWithRule(`
      @mixin test($bg-color: null, $text-color: null) {
        color: $text-color;
      }
    `)

    expect(warnings).toHaveLength(0)
  })

  it('should report camelCase function parameters', async () => {
    const warnings = await lintWithRule(`
      @function test($borderWidth) {
        @return $borderWidth * 2;
      }
    `)

    expect(warnings).toHaveLength(1)
    expect(warnings[0].text).toContain('$borderWidth')
    expect(warnings[0].text).toContain('$border-width')
  })

  it('should report camelCase named arguments in @include', async () => {
    const warnings = await lintWithRule(`
      .foo {
        @include test($extendShadow: blue);
      }
    `)

    expect(warnings).toHaveLength(1)
    expect(warnings[0].text).toContain('$extendShadow')
  })

  it('should not report kebab-case named arguments in @include', async () => {
    const warnings = await lintWithRule(`
      .foo {
        @include test($extend-shadow: blue);
      }
    `)

    expect(warnings).toHaveLength(0)
  })
})
