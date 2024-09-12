import React, { useContext } from 'react'
import { render, act } from '@testing-library/react'
import FieldBoundaryProvider from '../FieldBoundaryProvider'
import FieldBoundaryContext, {
  FieldBoundaryContextState,
} from '../FieldBoundaryContext'
import Provider from '../../Provider'
import { Field, Form } from '../../..'
import userEvent from '@testing-library/user-event'

describe('FieldBoundaryProvider', () => {
  it('should render children', () => {
    const { getByText } = render(
      <FieldBoundaryProvider>content</FieldBoundaryProvider>
    )

    expect(getByText('content')).toBeInTheDocument()
  })

  it('should set error in context', async () => {
    const contextRef: React.MutableRefObject<FieldBoundaryContextState> =
      React.createRef()

    const ContextConsumer = () => {
      contextRef.current = useContext(FieldBoundaryContext)
      return null
    }

    const { rerender } = render(
      <Provider>
        <FieldBoundaryProvider>
          <ContextConsumer />
          <Field.String />
        </FieldBoundaryProvider>
      </Provider>
    )

    expect(contextRef.current.hasError).toBe(false)
    expect(contextRef.current.hasSubmitError).toBe(false)
    expect(contextRef.current.hasVisibleError).toBe(false)
    expect(contextRef.current.errorsRef.current).toMatchObject({})

    rerender(
      <Provider>
        <FieldBoundaryProvider>
          <ContextConsumer />
          <Field.String required />
        </FieldBoundaryProvider>
      </Provider>
    )

    expect(contextRef.current.hasError).toBe(true)
    expect(contextRef.current.hasSubmitError).toBe(false)
    expect(contextRef.current.hasVisibleError).toBe(false)
    expect(contextRef.current.errorsRef.current).toMatchObject({
      'id-r0': true,
    })

    rerender(
      <Provider>
        <FieldBoundaryProvider>
          <ContextConsumer />
          <Field.String required />
          <Form.SubmitButton />
        </FieldBoundaryProvider>
      </Provider>
    )

    await userEvent.click(document.querySelector('button'))

    expect(contextRef.current).toEqual({
      errorsRef: {
        current: { 'id-r0': true },
      },
      hasError: true,
      hasSubmitError: true,
      hasVisibleError: true,
      showBoundaryErrors: false,
      setFieldError: expect.any(Function),
      setShowBoundaryErrors: expect.any(Function),
    })

    expect(contextRef.current.hasError).toBe(true)
    expect(contextRef.current.hasSubmitError).toBe(true)
    expect(contextRef.current.hasVisibleError).toBe(true)
    expect(contextRef.current.showBoundaryErrors).toBe(false)
    expect(contextRef.current.errorsRef.current).toMatchObject({
      'id-r0': true,
    })

    rerender(
      <Provider>
        <FieldBoundaryProvider>
          <ContextConsumer />
          <Field.String required value="foo" />
          <Form.SubmitButton />
        </FieldBoundaryProvider>
      </Provider>
    )

    expect(contextRef.current.hasError).toBe(false)
    expect(contextRef.current.hasSubmitError).toBe(false)
    expect(contextRef.current.hasVisibleError).toBe(true)
    expect(contextRef.current.errorsRef.current).toMatchObject({})

    rerender(
      <Provider>
        <FieldBoundaryProvider>
          <ContextConsumer />
          <Field.String required path="/bar" />
          <Form.SubmitButton />
        </FieldBoundaryProvider>
      </Provider>
    )

    await userEvent.click(document.querySelector('button'))

    expect(contextRef.current.hasError).toBe(true)
    expect(contextRef.current.hasSubmitError).toBe(true)
    expect(contextRef.current.hasVisibleError).toBe(true)
    expect(contextRef.current.showBoundaryErrors).toBe(false)
    expect(contextRef.current.errorsRef.current).toMatchObject({
      '/bar': true,
    })
  })

  it('should set showBoundaryErrorsRef to true when showErrors is true', async () => {
    const contextRef: React.MutableRefObject<FieldBoundaryContextState> =
      React.createRef()

    const ContextConsumer = () => {
      contextRef.current = useContext(FieldBoundaryContext)
      return null
    }

    render(
      <Provider>
        <FieldBoundaryProvider showErrors>
          <ContextConsumer />
          <Field.String />
        </FieldBoundaryProvider>
      </Provider>
    )

    expect(contextRef.current.showBoundaryErrors).toBe(true)
  })

  it('should set error in boundary context', async () => {
    const contextRef: React.MutableRefObject<FieldBoundaryContextState> =
      React.createRef()

    const ContextConsumer = () => {
      contextRef.current = useContext(FieldBoundaryContext)
      return null
    }

    const { rerender } = render(
      <Provider>
        <FieldBoundaryProvider>
          <ContextConsumer />
          <Field.String />
        </FieldBoundaryProvider>
      </Provider>
    )

    expect(contextRef.current.hasError).toBe(false)
    expect(contextRef.current.hasSubmitError).toBe(false)
    expect(contextRef.current.hasVisibleError).toBe(false)
    expect(contextRef.current.showBoundaryErrors).toBe(false)

    rerender(
      <Provider>
        <FieldBoundaryProvider>
          <ContextConsumer />
          <Field.String required />
        </FieldBoundaryProvider>
      </Provider>
    )

    act(() => {
      contextRef.current.setShowBoundaryErrors?.(true)
    })

    expect(contextRef.current.hasError).toBe(true)
    expect(contextRef.current.hasSubmitError).toBe(false)
    expect(contextRef.current.hasVisibleError).toBe(true)
    expect(contextRef.current.showBoundaryErrors).toBe(true)

    act(() => {
      contextRef.current.setShowBoundaryErrors?.(false)
    })

    expect(contextRef.current.hasError).toBe(true)
    expect(contextRef.current.hasSubmitError).toBe(false)
    expect(contextRef.current.hasVisibleError).toBe(false)
    expect(contextRef.current.showBoundaryErrors).toBe(false)
  })

  it('should set error in context with continuousValidation', async () => {
    const contextRef: React.MutableRefObject<FieldBoundaryContextState> =
      React.createRef()

    const Contexts = ({ children }) => {
      contextRef.current = useContext(FieldBoundaryContext)
      return <>{children}</>
    }

    render(
      <Provider>
        <FieldBoundaryProvider>
          <Contexts>
            <Field.String required path="/bar" continuousValidation />
            <Form.SubmitButton />
          </Contexts>
        </FieldBoundaryProvider>
      </Provider>
    )

    await userEvent.click(document.querySelector('button'))

    expect(contextRef.current.hasError).toBe(true)
    expect(contextRef.current.hasSubmitError).toBe(true)
    expect(contextRef.current.hasVisibleError).toBe(true)
    expect(contextRef.current.errorsRef.current).toMatchObject({
      '/bar': true,
    })

    const inputElement = document.querySelector('input')
    await userEvent.type(inputElement, 'b')
    await userEvent.click(document.querySelector('button'))

    expect(contextRef.current.hasError).toBe(false)
    expect(contextRef.current.hasSubmitError).toBe(false)
    expect(contextRef.current.hasVisibleError).toBe(false)
    expect(contextRef.current.errorsRef.current).toMatchObject({})
  })
})
