import React from 'react'
import { renderHook } from '@testing-library/react'
import useFieldProvider from '../useFieldProvider'
import FieldProviderContext from '../FieldProviderContext'

describe('useFieldProvider', () => {
  it('should return extend function and inherited props', () => {
    const props = { overwriteProps: {}, test: 'propField' }
    const { result } = renderHook(useFieldProvider, {
      initialProps: props,
    })

    expect(result.current.extend).toBeInstanceOf(Function)
    expect(result.current.inheritedProps).toEqual({ test: 'propField' })
    expect(result.current.inheritedContext).toEqual({
      test: 'propField',
    })
  })

  it('extend function should merge overwriteProps correctly', () => {
    const props = {
      overwriteProps: { path: { value: 'overwriteField' } },
      test: 'propField',
    }
    const { result } = renderHook(useFieldProvider, {
      initialProps: props,
    })

    const valueProps = { path: '/test/path', value: 'valueProps' }

    expect(result.current.extend(valueProps)).toEqual({
      path: '/test/path',
      test: 'propField',
      value: 'overwriteField',
    })
  })

  it('should pass inheritedContext to extend function', () => {
    const props = {
      overwriteProps: {},
    }
    const inheritedContext = { disabled: true }
    const inheritedProps = null
    const extend = () => null

    const { result } = renderHook(useFieldProvider, {
      initialProps: props,
      wrapper: ({ children }) => (
        <FieldProviderContext.Provider
          value={{ inheritedContext, inheritedProps, extend }}
        >
          {children}
        </FieldProviderContext.Provider>
      ),
    })

    const valueProps = {}

    expect(result.current.extend(valueProps)).toEqual({
      disabled: true,
    })
  })

  it('props passed to extend should override inheritedContext', () => {
    const props = {
      overwriteProps: {},
    }
    const inheritedContext = { disabled: true }
    const inheritedProps = null
    const extend = () => null

    const { result } = renderHook(useFieldProvider, {
      initialProps: props,
      wrapper: ({ children }) => (
        <FieldProviderContext.Provider
          value={{ inheritedContext, inheritedProps, extend }}
        >
          {children}
        </FieldProviderContext.Provider>
      ),
    })

    const valueProps = { disabled: false }

    expect(result.current.extend(valueProps)).toEqual({
      disabled: false,
    })
  })
})
