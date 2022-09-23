import {
  extendPropsWithContext,
  extendPropsWithContextInClassComponent,
} from '../extendPropsWithContext'

describe('extendPropsWithContext', () => {
  it('should use context anyway', () => {
    const props = {}
    const defaultProps = {}
    const context1 = { foo: 'bar' }

    const result = extendPropsWithContext(props, defaultProps, context1)

    expect(result).toEqual({
      foo: 'bar',
    })
  })

  it('should use props and default, but not context', () => {
    const props = { foo: 'is defined as a prop' }
    const defaultProps = { foo: 'default value', bar: null }
    const context1 = { foo: 'bar' }

    const result = extendPropsWithContext(props, defaultProps, context1)

    expect(result).toEqual({
      foo: 'is defined as a prop',
      bar: null,
    })
  })

  it('should use context if prop and default are the same', () => {
    const props = { prop1: 'some value', prop2: 'some value' }
    const defaultProps = {
      default1: 'some value',
      prop1: 'some value',
      prop2: 'some value',
    }
    const context1 = { prop1: 'form context' }
    const context2 = { prop2: 'form context', default1: 'form context' }

    const result = extendPropsWithContext(
      props,
      defaultProps,
      context1,
      context2
    )

    expect(result).toEqual({
      prop1: 'form context',
      prop2: 'form context',
      default1: 'form context',
    })
  })

  it('should use prop and default', () => {
    const props = { foo: 'bar' }
    const defaultProps = { key: 'is-default' }

    const result = extendPropsWithContext(props, defaultProps)

    expect(result).toEqual({
      key: 'is-default',
      foo: 'bar',
    })
  })
})

describe('extendPropsWithContextInClassComponent', () => {
  it('should use context if not defined in props but in default', () => {
    const defaultProps = { foo: 'should exist' }
    const props = { ...defaultProps } // Thats how ClassComponents include defaultProps
    const context1 = { foo: 'use this value' }

    const result = extendPropsWithContextInClassComponent(
      props,
      defaultProps,
      context1
    )

    expect(result).toEqual({
      foo: 'use this value',
    })
  })

  it('should use props if defined in props, but not in defualt', () => {
    const defaultProps = {}
    const props = { ...defaultProps, foo: 'use this value' } // Thats how ClassComponents include defaultProps
    const context1 = { foo: 'bar' }

    const result = extendPropsWithContextInClassComponent(
      props,
      defaultProps,
      context1
    )

    expect(result).toEqual({
      foo: 'use this value',
    })
  })

  it('should use context if props and default are the same', () => {
    const defaultProps = { foo: 'same' }
    const props = { ...defaultProps, foo: 'same' } // Thats how ClassComponents include defaultProps
    const context1 = { foo: 'use context' }

    const result = extendPropsWithContextInClassComponent(
      props,
      defaultProps,
      context1
    )

    expect(result).toEqual({
      foo: 'use context',
    })
  })
})
