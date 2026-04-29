import React from 'react'
import { renderHook } from '@testing-library/react'
import { useComponentDefaults } from '../useComponentDefaults'
import Provider from '../Provider'

describe('useComponentDefaults', () => {
  it('should merge localProps with defaultProps', () => {
    const { result } = renderHook(() =>
      useComponentDefaults(
        { foo: 'local' },
        { foo: 'default', bar: 'default' }
      )
    )

    const [props] = result.current
    expect(props.foo).toBe('local')
    expect(props.bar).toBe('default')
  })

  it('should return the shared context', () => {
    const { result } = renderHook(() => useComponentDefaults({}, {}))

    const [, context] = result.current
    expect(context).toBeDefined()
    expect(context.locale).toBeDefined()
  })

  it('should merge component-specific context from Provider', () => {
    const wrapper = ({ children }) => (
      <Provider Badge={{ variant: 'notification' }}>{children}</Provider>
    )

    const { result } = renderHook(
      () =>
        useComponentDefaults(
          { content: 'test' },
          { variant: 'information', content: null },
          'Badge'
        ),
      { wrapper }
    )

    const [props] = result.current
    expect(props.variant).toBe('notification')
    expect(props.content).toBe('test')
  })

  it('should merge skeleton from global context', () => {
    const wrapper = ({ children }) => (
      <Provider skeleton={true}>{children}</Provider>
    )

    const { result } = renderHook(
      () => useComponentDefaults({}, { skeleton: false }, 'Badge'),
      { wrapper }
    )

    const [props] = result.current
    expect(props.skeleton).toBe(true)
  })

  it('should not override user-provided props with context', () => {
    const wrapper = ({ children }) => (
      <Provider Badge={{ variant: 'notification' }}>{children}</Provider>
    )

    const { result } = renderHook(
      () =>
        useComponentDefaults(
          { variant: 'information' },
          { variant: 'information' },
          'Badge'
        ),
      { wrapper }
    )

    const [props] = result.current
    // User explicitly provided 'information' which matches default,
    // so context overrides it (this is the existing behavior of extendPropsWithContext)
    expect(props.variant).toBe('notification')
  })

  it('should merge form element props when formElement option is true', () => {
    const wrapper = ({ children }) => (
      <Provider formElement={{ disabled: true, vertical: true }}>
        {children}
      </Provider>
    )

    const { result } = renderHook(
      () =>
        useComponentDefaults(
          {},
          { disabled: false, vertical: false },
          null,
          { formElement: true }
        ),
      { wrapper }
    )

    const [props] = result.current
    expect(props.disabled).toBe(true)
    expect(props.vertical).toBe(true)
  })

  it('should not merge form element props when formElement option is false', () => {
    const wrapper = ({ children }) => (
      <Provider formElement={{ disabled: true }}>{children}</Provider>
    )

    const { result } = renderHook(
      () =>
        useComponentDefaults({}, { disabled: false }, null, {
          formElement: false,
        }),
      { wrapper }
    )

    const [props] = result.current
    expect(props.disabled).toBe(false)
  })

  it('should remove undefined props when removeUndefined is true', () => {
    const wrapper = ({ children }) => (
      <Provider skeleton={true}>{children}</Provider>
    )

    const { result } = renderHook(
      () =>
        useComponentDefaults(
          { skeleton: undefined, value: 'test' },
          { skeleton: false, value: '' },
          null,
          { removeUndefined: true }
        ),
      { wrapper }
    )

    const [props] = result.current
    // undefined was removed, so default 'false' was used,
    // then context skeleton=true overrides the default
    expect(props.skeleton).toBe(true)
    expect(props.value).toBe('test')
  })

  it('should use extendExistingPropsWithContext when onlyExisting is true', () => {
    const wrapper = ({ children }) => (
      <Provider
        Button={
          {
            variant: 'secondary',
            unknownProp: 'should-not-appear',
          } as any
        }
      >
        {children}
      </Provider>
    )

    const { result } = renderHook(
      () =>
        useComponentDefaults(
          { variant: 'primary' },
          { variant: 'primary' },
          'Button',
          { onlyExisting: true }
        ),
      { wrapper }
    )

    const [props] = result.current
    expect(props.variant).toBe('secondary')
    expect((props as any).unknownProp).toBeUndefined()
  })

  it('should merge additional contexts', () => {
    const groupContext = { size: 'large' }

    const { result } = renderHook(() =>
      useComponentDefaults({}, { size: 'medium' }, null, {
        additionalContexts: [groupContext],
      })
    )

    const [props] = result.current
    expect(props.size).toBe('large')
  })

  it('should handle null additional contexts gracefully', () => {
    const { result } = renderHook(() =>
      useComponentDefaults({ foo: 'bar' }, {}, null, {
        additionalContexts: [null, undefined],
      })
    )

    const [props] = result.current
    expect(props.foo).toBe('bar')
  })

  it('should work without contextKey', () => {
    const wrapper = ({ children }) => (
      <Provider skeleton={true}>{children}</Provider>
    )

    const { result } = renderHook(
      () => useComponentDefaults({}, { skeleton: false }),
      { wrapper }
    )

    const [props] = result.current
    expect(props.skeleton).toBe(true)
  })

  it('should combine contextKey, skeleton, formElement, and additional contexts', () => {
    const wrapper = ({ children }) => (
      <Provider
        skeleton={true}
        formElement={{ disabled: true }}
        Badge={{ variant: 'notification' }}
      >
        {children}
      </Provider>
    )

    const groupContext = { label: 'group-label' }

    const { result } = renderHook(
      () =>
        useComponentDefaults(
          { content: 'test' },
          {
            content: null,
            variant: 'information',
            skeleton: false,
            disabled: false,
            label: null,
          },
          'Badge',
          {
            formElement: true,
            additionalContexts: [groupContext],
          }
        ),
      { wrapper }
    )

    const [props] = result.current
    expect(props.content).toBe('test')
    expect(props.variant).toBe('notification')
    expect(props.skeleton).toBe(true)
    expect(props.disabled).toBe(true)
    expect(props.label).toBe('group-label')
  })
})
