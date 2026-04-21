import React from 'react'
import { renderHook } from '@testing-library/react'
import useFieldProvider from '../useFieldProvider'
import FieldProviderContext from '../FieldProviderContext'
import Provider from '../../../../../shared/Provider'

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
        <FieldProviderContext
          value={{ inheritedContext, inheritedProps, extend }}
        >
          {children}
        </FieldProviderContext>
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
        <FieldProviderContext
          value={{ inheritedContext, inheritedProps, extend }}
        >
          {children}
        </FieldProviderContext>
      ),
    })

    const valueProps = { disabled: false }

    expect(result.current.extend(valueProps)).toEqual({
      disabled: false,
    })
  })

  it('should not include translations in sharedProviderParams when no translations prop is given', () => {
    const { result } = renderHook(useFieldProvider, {
      wrapper: ({ children }) => (
        <Provider
          locale="nb-NO"
          translations={{
            'nb-NO': { Field: { errorRequired: 'Custom required' } },
          }}
        >
          {children}
        </Provider>
      ),
    })

    expect(result.current.sharedProviderParams).not.toHaveProperty(
      'translations',
    )
  })

  it('should include translations in sharedProviderParams when translations prop is given', () => {
    const translations = {
      'nb-NO': { Field: { errorRequired: 'Override' } },
    }

    const { result } = renderHook(useFieldProvider, {
      initialProps: { translations },
      wrapper: ({ children }) => (
        <Provider locale="nb-NO">{children}</Provider>
      ),
    })

    expect(result.current.sharedProviderParams).toHaveProperty(
      'translations',
    )
    expect(
      result.current.sharedProviderParams.translations['nb-NO'].Field
        .errorRequired,
    ).toBe('Override')
  })
})
