import { act, useContext } from 'react'
import { render, screen } from '@testing-library/react'
import At from '../At'
import Provider from '../../Provider'
import Context from '../../Context'
import type { ContextState } from '../../Context'
import { Field, Form, Value } from '../../..'

describe('At', () => {
  it('should fetch data from context using provided path', () => {
    const contextData = { a: { b: 'test' } }
    const MockComponent = () => {
      const context = useContext(Context)
      return context.data
    }
    render(
      <Provider data={contextData}>
        <At path="/a/b">
          <MockComponent />
        </At>
      </Provider>
    )

    expect(screen.getByText('test')).toBeInTheDocument()
  })

  it('should handle path changes correctly', () => {
    const contextData = { a: { b: 'test' } }
    let handlePathChange = null

    const MockComponent = () => {
      const context = useContext(Context)
      handlePathChange = context.handlePathChange
      return <output>{JSON.stringify(context.data)}</output>
    }

    render(
      <Provider data={contextData}>
        <At path="/a">
          <MockComponent />
        </At>
      </Provider>
    )

    expect(document.querySelector('output')).toHaveTextContent(
      JSON.stringify({ b: 'test' })
    )

    act(() => {
      handlePathChange('/c', 'new value')
    })

    expect(document.querySelector('output')).toHaveTextContent(
      JSON.stringify({ b: 'test', c: 'new value' })
    )
  })

  it('should update when an existing path changes', () => {
    const contextData = { a: { b: 'test' } }
    let handlePathChange = null

    const MockComponent = () => {
      const context = useContext(Context)
      handlePathChange = context.handlePathChange
      return (
        <output>
          {JSON.stringify({
            data: context.data,
            value: context.getDataValue('/b'),
          })}
        </output>
      )
    }

    render(
      <Provider data={contextData}>
        <At path="/a">
          <MockComponent />
        </At>
      </Provider>
    )

    expect(document.querySelector('output')).toHaveTextContent(
      JSON.stringify({ data: { b: 'test' }, value: 'test' })
    )

    act(() => {
      handlePathChange('/b', 'new value')
    })

    expect(document.querySelector('output')).toHaveTextContent(
      JSON.stringify({ data: { b: 'new value' }, value: 'new value' })
    )
  })

  it('should update scoped field children when path data changes', () => {
    let updateData = null

    const UpdateData = () => {
      updateData = Form.useData().update
      return null
    }

    render(
      <Form.Handler data={{ foo: { one: 'One' } }}>
        <At path="/foo">
          <Field.String path="/one" label="One" />
        </At>
        <UpdateData />
      </Form.Handler>
    )

    expect(document.querySelector('input')).toHaveValue('One')

    act(() => {
      updateData('/foo/one', 'Updated one')
    })

    expect(document.querySelector('input')).toHaveValue('Updated one')
  })

  it('should update scoped value children when iterate path data changes', () => {
    let updateData = null

    const UpdateData = () => {
      updateData = Form.useData().update
      return null
    }

    render(
      <Form.Handler
        data={{
          list: [{ title: 'Object 1' }, { title: 'Object 2' }],
        }}
      >
        <At path="/list" iterate>
          <Value.String path="/title" />
        </At>
        <UpdateData />
      </Form.Handler>
    )

    expect(screen.getByText('Object 1')).toBeInTheDocument()
    expect(screen.getByText('Object 2')).toBeInTheDocument()

    act(() => {
      updateData('/list/0/title', 'Updated title')
    })

    expect(screen.getByText('Updated title')).toBeInTheDocument()
    expect(screen.queryByText('Object 1')).not.toBeInTheDocument()
    expect(screen.getByText('Object 2')).toBeInTheDocument()
  })

  it('should forward unvalidated path change options when iterating', () => {
    const onUpdateDataValue = vi.fn()
    let handlePathChangeUnvalidated: ContextState['handlePathChangeUnvalidated'] =
      () => undefined

    const CaptureFirstItem = () => {
      const context = useContext(Context)

      if (context.data === 'First') {
        handlePathChangeUnvalidated = context.handlePathChangeUnvalidated
      }

      return null
    }

    render(
      <Provider
        data={{ list: ['First', 'Second'] }}
        onUpdateDataValue={onUpdateDataValue}
      >
        <At path="/list" iterate>
          <CaptureFirstItem />
        </At>
      </Provider>
    )

    act(() => {
      handlePathChangeUnvalidated('/', 'Updated', {
        preventUpdate: true,
      })
    })

    expect(onUpdateDataValue).toHaveBeenLastCalledWith(
      '/list/0',
      'Updated',
      { preventUpdate: true }
    )
  })

  it('should return null if iterate prop is true and data is not an array', () => {
    const contextData = { a: { b: 'test' } }
    const MockComponent = () => {
      const context = useContext(Context)
      return context.data
    }
    render(
      <Provider data={contextData}>
        <At path="/a/b" iterate>
          <MockComponent />
        </At>
      </Provider>
    )

    expect(screen.queryByText('test')).toBeNull()
  })
})
