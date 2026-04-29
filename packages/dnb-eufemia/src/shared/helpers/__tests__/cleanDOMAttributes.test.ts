import { cleanDOMAttributes } from '../cleanDOMAttributes'

describe('cleanDOMAttributes', () => {
  it('returns an empty object for empty input', () => {
    expect(cleanDOMAttributes({})).toEqual({})
  })

  it('passes through valid DOM attributes', () => {
    const result = cleanDOMAttributes({
      id: 'test',
      className: 'my-class',
      'aria-hidden': true,
      'data-testid': 'hello',
    })
    expect(result).toEqual({
      id: 'test',
      className: 'my-class',
      'aria-hidden': true,
      'data-testid': 'hello',
    })
  })

  it('does not mutate the input', () => {
    const input = { id: 'test', space: 'large', foo: null }
    const copy = { ...input }
    cleanDOMAttributes(input)
    expect(input).toEqual(copy)
  })

  it('removes spacing props', () => {
    const result = cleanDOMAttributes({
      id: 'test',
      space: 'large',
      top: '1rem',
      right: '2rem',
      bottom: '3rem',
      left: '4rem',
      noCollapse: true,
      innerSpace: { top: 'large' },
      labelDirection: 'vertical',
    })
    expect(result).toEqual({ id: 'test' })
  })

  it('removes null values', () => {
    const result = cleanDOMAttributes({
      id: 'test',
      'aria-hidden': null,
      'data-value': null,
    })
    expect(result).toEqual({ id: 'test' })
  })

  it('removes disabled when null', () => {
    const result = cleanDOMAttributes({ disabled: null })
    expect(result).not.toHaveProperty('disabled')
  })

  it('keeps disabled as string', () => {
    const result = cleanDOMAttributes({ disabled: 'disabled' })
    expect(result).toHaveProperty('disabled', 'disabled')
  })

  it('converts disabled=true to aria-disabled and keeps disabled', () => {
    const result = cleanDOMAttributes({ disabled: true })
    expect(result).toHaveProperty('aria-disabled', true)
    expect(result).toHaveProperty('disabled', true)
  })

  it('removes invalid attribute names with underscores', () => {
    const result = cleanDOMAttributes({
      aria_hidden: 'true',
      data_testid: 'value',
      valid: 'kept',
    })
    expect(result).not.toHaveProperty('aria_hidden')
    expect(result).not.toHaveProperty('data_testid')
    expect(result).toHaveProperty('valid', 'kept')
  })

  it('keeps camelCase event handlers', () => {
    const handler = () => {}
    const result = cleanDOMAttributes({
      onClick: handler,
      onChange: handler,
    })
    expect(result).toHaveProperty('onClick', handler)
    expect(result).toHaveProperty('onChange', handler)
  })

  it('removes non-handler function props', () => {
    const fn = () => {}
    const result = cleanDOMAttributes({
      onClick: fn,
      something: fn,
      render: fn,
    })
    expect(result).toHaveProperty('onClick')
    expect(result).not.toHaveProperty('something')
    expect(result).not.toHaveProperty('render')
  })

  it('preserves ref function props', () => {
    const refFn = () => {}
    const result = cleanDOMAttributes({ ref: refFn })
    expect(result).toHaveProperty('ref', refFn)
  })

  it('handles a realistic component scenario', () => {
    const onClick = () => {}
    const result = cleanDOMAttributes({
      id: 'btn-1',
      className: 'dnb-button',
      onClick,
      space: 'large',
      top: 'small',
      disabled: true,
      customProp: null,
      render_content: () => {},
      'aria-label': 'Click me',
    })
    expect(result).toEqual({
      id: 'btn-1',
      className: 'dnb-button',
      onClick,
      disabled: true,
      'aria-disabled': true,
      'aria-label': 'Click me',
    })
  })
})
