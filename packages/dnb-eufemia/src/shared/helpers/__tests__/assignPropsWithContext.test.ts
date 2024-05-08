import { assignPropsWithContext } from '../assignPropsWithContext'

describe('assignPropsWithContext', () => {
  it('should assign context to props', () => {
    const props = {}
    const context1 = { foo: 'bar' }

    const result = assignPropsWithContext(props, context1)

    expect(result).toMatchObject({
      foo: 'bar',
    })
  })

  it('should keep same props instance', () => {
    const props = {}
    const context1 = { foo: 'bar' }

    const result = assignPropsWithContext(props, context1)

    expect(result === props).toBe(true)
  })

  it('should use props but not context', () => {
    const props = { foo: 'is defined as a prop' }
    const context1 = { foo: 'bar' }

    const result = assignPropsWithContext(props, context1)

    expect(result).toMatchObject({
      foo: 'is defined as a prop',
    })
  })

  it('should not fail when props is null', () => {
    const props = null
    const context1 = { foo: 'bar' }

    const result = assignPropsWithContext(props, context1)

    expect(result).toMatchObject({
      foo: 'bar',
    })
  })

  it('should not fail when context is null', () => {
    const props = { foo: 'is defined as a prop' }
    const context1 = null

    const result = assignPropsWithContext(props, context1)

    expect(result).toMatchObject({
      foo: 'is defined as a prop',
    })
  })

  it('should not fail when defaultProps is null', () => {
    const props = {}
    const context1 = { foo: 'bar' }

    const result = assignPropsWithContext(props, context1)

    expect(result).toMatchObject({
      foo: 'bar',
    })
  })
})
