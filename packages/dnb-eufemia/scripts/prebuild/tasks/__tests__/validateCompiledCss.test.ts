import { validateCssBuffer } from '../../validateCompiledCss'

describe('validateCssBuffer (Lightning CSS)', () => {
  it('accepts valid CSS', () => {
    expect(() =>
      validateCssBuffer('t.css', Buffer.from('.a { color: red; }'))
    ).not.toThrow()
  })

  it('rejects pseudo-element followed by :active and attribute selector (invalid in CSS)', () => {
    expect(() =>
      validateCssBuffer(
        'bad.css',
        Buffer.from(
          '.dnb-button--icon-only.dnb-button--input-button:after:active[disabled]{top:0}'
        )
      )
    ).toThrow(/Pseudo-elements/)
  })
})
