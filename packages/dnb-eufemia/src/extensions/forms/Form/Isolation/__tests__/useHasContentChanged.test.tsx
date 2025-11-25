import React from 'react'
import {
  fireEvent,
  render,
  renderHook,
  screen,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Field, Form } from '../../..'
import useHasContentChanged from '../useHasContentChanged'
import { createDataReference } from '../IsolationDataReference'
import { createMockFile } from '../../../../../components/upload/__tests__/testHelpers'

import nbNOShared from '../../../../../shared/locales/nb-NO'
const nbShared = nbNOShared['nb-NO']

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
      initialProps: { enabled: true },
      wrapper: ({ children }) => (
        <Form.Isolation defaultData={data}>{children}</Form.Isolation>
      ),
    })
    expect(result.current.hasContentChanged).toBe(false)
  })

  it('should return false when data as object matches snapshot', () => {
    const data = {
      name: 'Nora',
      age: 30,
      files: [
        {
          file: createMockFile('fileName1.png', 123, 'image/png'),
          id: '1',
          exists: false,
        },
      ],
    }
    const { result } = renderHook(useHasContentChanged, {
      initialProps: { enabled: true },
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
      const { hasContentChanged: hasChanged } = useHasContentChanged({
        enabled: true,
      })
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

  it('should return true when data as object differs from snapshot', async () => {
    const data = {
      name: 'foo',
      files: [
        {
          file: createMockFile('fileName1.png', 0, 'image/png'),
          id: '1',
          exists: false,
        },
      ],
    }
    let hasContentChanged = null

    const RenderTheHook = () => {
      const { hasContentChanged: hasChanged } = useHasContentChanged({
        enabled: true,
      })
      hasContentChanged = hasChanged

      return null
    }

    render(
      <Form.Isolation defaultData={data}>
        <RenderTheHook />
        <Field.Upload path="/files" />
      </Form.Isolation>
    )

    expect(hasContentChanged).toBe(false)

    const deleteButton = screen.queryByRole('button', {
      name: nbShared.Upload.deleteButton,
    })

    await userEvent.click(deleteButton)

    fireEvent.drop(document.querySelector('.dnb-upload'), {
      dataTransfer: {
        files: [createMockFile('fileName2.jpg', 0, 'image/jpeg')],
      },
    })

    expect(hasContentChanged).toBe(true)
  })

  it('should return true when snapshot has missing entries', () => {
    const data = { name: 'foo' }
    const dataReference = createDataReference()
    let hasContentChanged = null

    const RenderTheHook = () => {
      const { hasContentChanged: hasChanged } = useHasContentChanged({
        enabled: true,
      })
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
