import React from 'react'
import { render, renderHook } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Field, Form } from '../../..'
import useHasContentChanged from '../useHasContentChanged'
import { createDataReference } from '../IsolationDataReference'

describe('useHasContentChanged', () => {
  it('should return undefined when no wrapper was given', () => {
    const { result } = renderHook(useHasContentChanged)
    expect(result.current.hasContentChanged).toBeUndefined()
  })

  it('should return false when no snapshot was given', () => {
    const { result } = renderHook(useHasContentChanged, {
      wrapper: ({ children }) => (
        <Form.Handler defaultData={undefined}>{children}</Form.Handler>
      ),
    })
    expect(result.current.hasContentChanged).toBeUndefined()
  })

  it('should return false when data matches snapshot', () => {
    const data = { name: 'Nora', age: 30 }
    const { result } = renderHook(useHasContentChanged, {
      wrapper: ({ children }) => (
        <Form.Isolation defaultData={data}>{children}</Form.Isolation>
      ),
    })
    expect(result.current.hasContentChanged).toBe(false)
  })

  it('should return true when data differs from snapshot', async () => {
    const data = { name: 'foo' }
    let hasContentChanged = null

    const RenderTheHook = () => {
      const { hasContentChanged: hasChanged } = useHasContentChanged()
      hasContentChanged = hasChanged

      return null
    }

    render(
      <Form.Isolation defaultData={data}>
        <RenderTheHook />
        <Field.String path="/name" />
      </Form.Isolation>
    )

    expect(hasContentChanged).toBe(false)

    await userEvent.type(document.querySelector('input'), 'bar')

    expect(hasContentChanged).toBe(true)
  })

  it('should return true when snapshot has missing entries', () => {
    const data = { name: 'foo' }
    const dataReference = createDataReference()
    let hasContentChanged = null

    const RenderTheHook = () => {
      const { hasContentChanged: hasChanged } = useHasContentChanged()
      hasContentChanged = hasChanged

      return null
    }

    const Component = () => (
      <Form.Isolation defaultData={data} dataReference={dataReference}>
        <RenderTheHook />
      </Form.Isolation>
    )

    const { rerender } = render(<Component />)
    expect(hasContentChanged).toBe(false)

    dataReference.update({}) // remove existing entry (name)
    rerender(<Component />)
    expect(hasContentChanged).toBe(true)
  })
})
