import stylelint from 'stylelint'
const varSyntaxPlugin = require('../var-syntax.cjs')

const lint = async (code: string) => {
  const result = await stylelint.lint({
    code,
    customSyntax: 'postcss-scss',
    config: {
      plugins: [varSyntaxPlugin],
      rules: {
        [varSyntaxPlugin.ruleName]: true,
      },
    },
  })

  return result.results?.[0]?.warnings || []
}

describe('var-syntax', () => {
  it('should accept valid var(--property) syntax', async () => {
    const warnings = await lint(`.foo { color: var(--my-color); }`)
    expect(warnings).toHaveLength(0)
  })

  it('should accept var() with fallback', async () => {
    const warnings = await lint(`.foo { color: var(--my-color, red); }`)
    expect(warnings).toHaveLength(0)
  })

  it('should accept nested var() calls', async () => {
    const warnings = await lint(
      `.foo { color: var(--primary, var(--fallback)); }`
    )
    expect(warnings).toHaveLength(0)
  })

  it('should flag var(-foo) with single dash', async () => {
    const warnings = await lint(`.foo { color: var(-my-color); }`)
    expect(warnings).toHaveLength(1)
    expect(warnings[0].text).toContain('-my-color')
  })

  it('should flag var(---foo) with triple dash', async () => {
    const warnings = await lint(`.foo { color: var(---my-color); }`)
    expect(warnings).toHaveLength(1)
    expect(warnings[0].text).toContain('---my-color')
  })

  it('should flag var(foo) with no dashes', async () => {
    const warnings = await lint(`.foo { color: var(mycolor); }`)
    expect(warnings).toHaveLength(1)
    expect(warnings[0].text).toContain('mycolor')
  })

  it('should flag multiple invalid vars in the same declaration', async () => {
    const warnings = await lint(`.foo { background: var(-a) var(---b); }`)
    expect(warnings).toHaveLength(2)
  })

  it('should not flag declarations without var()', async () => {
    const warnings = await lint(`.foo { color: red; }`)
    expect(warnings).toHaveLength(0)
  })

  it('should accept var() with whitespace before the property name', async () => {
    const warnings = await lint(`.foo { color: var(  --my-color  ); }`)
    expect(warnings).toHaveLength(0)
  })

  it('should flag var() with single dash and whitespace', async () => {
    const warnings = await lint(`.foo { color: var(  -bad  ); }`)
    expect(warnings).toHaveLength(1)
    expect(warnings[0].text).toContain('-bad')
  })
})
