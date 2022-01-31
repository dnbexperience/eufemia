import { renderHook } from '@testing-library/react-hooks'
import { usePropsWithContext } from '../usePropsWithContext'

describe('usePropsWithContext', () => {
  it('should extend prop from other context object', () => {
    const props = { key: { x: 'y' }, foo: null }
    const defaultProps = { key: { x: 'y' }, foo: null }
    const context1 = { key: 'I can’t replace You', foo: 'bar' }

    const result = usePropsWithContext(props, defaultProps, context1)

    expect(result).toEqual({
      key: { x: 'y' },
      foo: 'bar', // because the prop was null, we get bar
    })
  })

  it('should extend multible contexts', () => {
    const props = { prop1: 'prop1', prop2: 'prop2' }
    const defaultProps = {
      default1: 'default1',
      a: null,
      b: null,
    }
    const context1 = { a: 'a' }
    const context2 = { b: 'b' }
    const context3 = { c: 'c' }

    const result = usePropsWithContext(
      props,
      defaultProps,
      context1,
      context2,
      context3
    )

    expect(result).toEqual({
      default1: 'default1',
      prop1: 'prop1',
      prop2: 'prop2',
      a: 'a',
      b: 'b',
      // c: 'c', // but not c
    })
  })

  it('should extend defaults', () => {
    const props = { foo: 'bar' }
    const defaultProps = { key: 'is-default' }

    const result = usePropsWithContext(props, defaultProps)

    expect(result).toEqual({
      key: 'is-default',
      foo: 'bar',
    })
  })

  it('should render as a React Hook', () => {
    const props = { key: { x: 'y' }, foo: null }
    const defaultProps = { key: { x: 'y' }, foo: null }
    const context1 = { key: 'I can’t replace You', foo: 'bar' }

    const { result } = renderHook(() =>
      usePropsWithContext(props, defaultProps, context1)
    )

    expect(result.current).toEqual({
      key: { x: 'y' },
      foo: 'bar', // because the prop was null, we get bar
    })
  })
})
