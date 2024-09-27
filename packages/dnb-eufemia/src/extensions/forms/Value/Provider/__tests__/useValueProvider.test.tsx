import React from 'react'
import { renderHook } from '@testing-library/react'
import useValueProvider from '../useValueProvider'
import ValueProviderContext from '../ValueProviderContext'

describe('useValueProvider', () => {
  it('should return extend function and inherited props', () => {
    const props = { overwriteProps: {}, test: 'propValue' }
    const { result } = renderHook(useValueProvider, {
      initialProps: props,
    })

    expect(result.current.extend).toBeInstanceOf(Function)
    expect(result.current.inheritedProps).toEqual({ test: 'propValue' })
    expect(result.current.inheritedContext).toEqual({
      test: 'propValue',
    })
  })

  it('extend function should merge overwriteProps correctly', () => {
    const props = {
      overwriteProps: { path: { value: 'overwriteValue' } },
      test: 'propValue',
    }
    const { result } = renderHook(useValueProvider, {
      initialProps: props,
    })

    const valueProps = { path: '/test/path', value: 'valueProps' }

    expect(result.current.extend(valueProps)).toEqual({
      path: '/test/path',
      test: 'propValue',
      value: 'overwriteValue',
    })
  })

  it('should pass inheritedContext to extend function', () => {
    const props = {
      overwriteProps: {},
    }
    const inheritedContext = { inheritLabel: true }
    const inheritedProps = null
    const extend = () => null

    const { result } = renderHook(useValueProvider, {
      initialProps: props,
      wrapper: ({ children }) => (
        <ValueProviderContext.Provider
          value={{ inheritedContext, inheritedProps, extend }}
        >
          {children}
        </ValueProviderContext.Provider>
      ),
    })

    const valueProps = {}

    expect(result.current.extend(valueProps)).toEqual({
      inheritLabel: true,
    })
  })

  it('props passed to extend should override inheritedContext', () => {
    const props = {
      overwriteProps: {},
    }
    const inheritedContext = { inheritLabel: true }
    const inheritedProps = null
    const extend = () => null

    const { result } = renderHook(useValueProvider, {
      initialProps: props,
      wrapper: ({ children }) => (
        <ValueProviderContext.Provider
          value={{ inheritedContext, inheritedProps, extend }}
        >
          {children}
        </ValueProviderContext.Provider>
      ),
    })

    const valueProps = { inheritLabel: false }

    expect(result.current.extend(valueProps)).toEqual({
      inheritLabel: false,
    })
  })
})
