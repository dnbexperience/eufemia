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
      showBoundaryErrors: undefined,
      setFieldError: expect.any(Function),
      setVisibleError: expect.any(Function),
      setShowBoundaryErrors: expect.any(Function),
    })

    expect(contextRef.current.hasError).toBe(true)
    expect(contextRef.current.hasSubmitError).toBe(true)
    expect(contextRef.current.hasVisibleError).toBe(true)
    expect(contextRef.current.showBoundaryErrors).toBe(undefined)
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
    expect(contextRef.current.showBoundaryErrors).toBe(undefined)
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
    expect(contextRef.current.showBoundaryErrors).toBe(undefined)

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
    expect(contextRef.current.showBoundaryErrors).toEqual(
      expect.any(Number)
    )

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
    expect(contextRef.current.hasVisibleError).toBe(true)
    expect(contextRef.current.errorsRef.current).toMatchObject({})
  })

  it('should set error in context with validateContinuously', async () => {
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
            <Field.String required path="/bar" validateContinuously />
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
    expect(contextRef.current.hasVisibleError).toBe(true)
    expect(contextRef.current.errorsRef.current).toMatchObject({})
  })

  it('should set number for showBoundaryErrors as a truthy value', async () => {
    const showBoundaryErrors = {
      view: null,
      edit: null,
    }

    render(
      <Form.Section validateInitially>
        <Form.Section.ViewContainer>
          View Content
          <FieldBoundaryContext.Consumer>
            {(context) => {
              showBoundaryErrors.view = context?.showBoundaryErrors
              return null
            }}
          </FieldBoundaryContext.Consumer>
        </Form.Section.ViewContainer>

        <Form.Section.EditContainer>
          <Field.String required validateInitially={false} />
          <FieldBoundaryContext.Consumer>
            {(context) => {
              showBoundaryErrors.edit = context?.showBoundaryErrors
              return null
            }}
          </FieldBoundaryContext.Consumer>
        </Form.Section.EditContainer>
      </Form.Section>
    )

    const blocks = document.querySelectorAll('.dnb-forms-section-block')
    const [, editBlock] = Array.from(blocks)
    const [doneButton] = Array.from(editBlock.querySelectorAll('button'))

    expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(0)
    expect(showBoundaryErrors.view).toBe(undefined)
    expect(showBoundaryErrors.edit).toBe(true)

    await userEvent.click(doneButton)

    expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(1)
    expect(showBoundaryErrors.view).toBe(undefined)
    expect(showBoundaryErrors.edit).toEqual(expect.any(Number))
    const firstNumber = showBoundaryErrors.edit

    await userEvent.click(doneButton)

    expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(2)
    expect(showBoundaryErrors.view).toBe(undefined)
    expect(showBoundaryErrors.edit).toEqual(expect.any(Number))
    expect(showBoundaryErrors.edit).not.toBe(firstNumber)
  })
})
