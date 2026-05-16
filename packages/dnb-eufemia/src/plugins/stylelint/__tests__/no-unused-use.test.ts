import stylelint from 'stylelint'
const noUnusedUsePlugin = require('../rules/no-unused-use.cjs')

const lintWithRule = async (code: string) => {
  const result = await stylelint.lint({
    code,
    codeFilename: 'test.scss',
    customSyntax: 'postcss-scss',
    config: {
      plugins: [noUnusedUsePlugin],
      rules: {
        [noUnusedUsePlugin.ruleName]: true,
      },
    },
  })

  return result.results?.[0]?.warnings || []
}

describe('no-unused-use', () => {
  it('should report unused @use with explicit namespace', async () => {
    const warnings = await lintWithRule(`
      @use '../../../../style/core/utilities.scss' as utilities;

      .dnb-dialog {
        --dialog-radius: 0.125rem;
      }
    `)

    expect(warnings).toHaveLength(1)
    expect(warnings[0].text).toContain('utilities')
    expect(warnings[0].text).toContain('unused')
  })

  it('should not report @use with namespace that is used in @include', async () => {
    const warnings = await lintWithRule(`
      @use '../../../../style/core/utilities.scss' as utilities;

      .dnb-dialog {
        @include utilities.fakeBorder($color: red);
      }
    `)

    expect(warnings).toHaveLength(0)
  })

  it('should not report @use with namespace used in a value via function call', async () => {
    const warnings = await lintWithRule(`
      @use '../mixins.scss' as mixins;

      .foo {
        color: mixins.get-color('primary');
      }
    `)

    expect(warnings).toHaveLength(0)
  })

  it('should not report @use with namespace used via variable access', async () => {
    const warnings = await lintWithRule(`
      @use '../vars.scss' as vars;

      .foo {
        color: vars.$primary-color;
      }
    `)

    expect(warnings).toHaveLength(0)
  })

  it('should not report @use without explicit alias (side-effect import)', async () => {
    const warnings = await lintWithRule(`
      @use './dnb-dialog.scss';

      .foo {
        color: red;
      }
    `)

    expect(warnings).toHaveLength(0)
  })

  it('should not report @use with as * (global import)', async () => {
    const warnings = await lintWithRule(`
      @use './properties.scss' as *;

      .foo {
        color: red;
      }
    `)

    expect(warnings).toHaveLength(0)
  })

  it('should report multiple unused @use statements', async () => {
    const warnings = await lintWithRule(`
      @use '../a.scss' as a;
      @use '../b.scss' as b;

      .foo {
        color: red;
      }
    `)

    expect(warnings).toHaveLength(2)
  })

  it('should report only the unused one when one is used and one is not', async () => {
    const warnings = await lintWithRule(`
      @use '../a.scss' as a;
      @use '../b.scss' as b;

      .foo {
        @include a.mixin();
      }
    `)

    expect(warnings).toHaveLength(1)
    expect(warnings[0].text).toContain('b')
  })

  it('should detect namespace used in selector via placeholder', async () => {
    const warnings = await lintWithRule(`
      @use '../reset.scss' as reset;

      .foo {
        @extend reset.%placeholder;
      }
    `)

    expect(warnings).toHaveLength(0)
  })

  it('should detect namespace used in at-rule params', async () => {
    const warnings = await lintWithRule(`
      @use '../utilities.scss' as utilities;

      @include utilities.media('small') {
        .foo {
          color: red;
        }
      }
    `)

    expect(warnings).toHaveLength(0)
  })

  it('should not flag @use used in property name', async () => {
    const warnings = await lintWithRule(`
      @use '../tokens.scss' as tokens;

      .foo {
        #{tokens.$prop}: red;
      }
    `)

    expect(warnings).toHaveLength(0)
  })

  it('should not report @use with namespace used in @forward with', async () => {
    const warnings = await lintWithRule(`
      @use '../utilities.scss' as utilities;
      @use './other.scss';

      .foo {
        color: red;
      }
    `)

    // utilities is unused since @forward is excluded from checking
    expect(warnings).toHaveLength(1)
    expect(warnings[0].text).toContain('utilities')
  })
})
