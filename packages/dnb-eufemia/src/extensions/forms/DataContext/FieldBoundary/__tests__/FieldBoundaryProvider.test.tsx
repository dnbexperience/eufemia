import React, { useContext } from 'react'
import { render } from '@testing-library/react'
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
    expect(contextRef.current.hasErrorAndShowIt).toBe(false)
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
    expect(contextRef.current.hasErrorAndShowIt).toBe(false)
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

    expect(contextRef.current.hasError).toBe(true)
    expect(contextRef.current.hasErrorAndShowIt).toBe(true)
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
    expect(contextRef.current.hasErrorAndShowIt).toBe(false)
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
    expect(contextRef.current.hasErrorAndShowIt).toBe(true)
    expect(contextRef.current.errorsRef.current).toMatchObject({
      '/bar': true,
    })
  })
})
