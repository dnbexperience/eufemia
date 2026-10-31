// @vitest-environment node

import { renderToString } from 'react-dom/server'
import SharedProvider from '../../../../../shared/Provider'
import { createSharedState } from '../../../../../shared/helpers/useSharedState'
import { Form, Field, Value, Iterate } from '../../../'

describe('DataContext.Provider SSR', () => {
  it('should not leak data to a later server render with the same id', () => {
    renderToString(
      <Form.Handler
        id="ssr-leak-data"
        data={{ name: 'Alice', ssn: '01017012345' }}
      >
        <Field.String path="/name" />
      </Form.Handler>
    )

    const html = renderToString(
      <Form.Handler id="ssr-leak-data">
        <Value.String path="/name" />
        <Value.String path="/ssn" />
      </Form.Handler>
    )

    expect(html).not.toContain('Alice')
    expect(html).not.toContain('01017012345')
  })

  it('should render the given data instead of the data of an earlier render', () => {
    renderToString(
      <Form.Handler id="ssr-given-data" data={{ name: 'Alice' }}>
        <Field.String path="/name" />
      </Form.Handler>
    )

    const html = renderToString(
      <Form.Handler id="ssr-given-data" data={{ name: 'Bob' }}>
        <Value.String path="/name" />
      </Form.Handler>
    )

    expect(html).toContain('Bob')
    expect(html).not.toContain('Alice')
  })

  it('should not leak Form.useData values to a later server render', () => {
    renderToString(
      <Form.Handler id="ssr-leak-use-data" data={{ name: 'Alice' }}>
        <Field.String path="/name" />
      </Form.Handler>
    )

    const Reader = () => {
      const { data } = Form.useData<{ name?: string }>('ssr-leak-use-data')
      return <output>{data?.name}</output>
    }

    const html = renderToString(
      <Form.Handler id="ssr-leak-use-data">
        <Reader />
      </Form.Handler>
    )

    expect(html).not.toContain('Alice')
  })

  it('should not leak Iterate.useCount to a later server render', () => {
    renderToString(
      <Form.Handler id="ssr-leak-count" data={{ list: ['a', 'b', 'c'] }}>
        <Iterate.Array path="/list">
          <Value.String itemPath="/" />
        </Iterate.Array>
      </Form.Handler>
    )

    const Count = () => {
      const { count } = Iterate.useCount('ssr-leak-count')
      return <output>count:{count('/list')}</output>
    }

    const html = renderToString(
      <Form.Handler id="ssr-leak-count">
        <Count />
      </Form.Handler>
    )

    expect(html).not.toContain('count:<!-- -->3')
  })

  it('should not keep the data in the process-wide store after a server render', () => {
    renderToString(
      <Form.Handler id="ssr-order-1" data={{ customer: 'Customer 1' }}>
        <Field.String path="/customer" />
      </Form.Handler>
    )

    expect(createSharedState('ssr-order-1').get()).toBeUndefined()
  })

  it('should not share Form.setData with later server renders', () => {
    Form.setData('ssr-set-data', { name: 'Alice' })

    const html = renderToString(
      <Form.Handler id="ssr-set-data">
        <Value.String path="/name" />
      </Form.Handler>
    )

    expect(html).not.toContain('Alice')
    expect(Form.getData('ssr-set-data').data).toBeUndefined()
  })

  it('should share data by id within the same server render', () => {
    const Reader = () => {
      const { data } = Form.useData<{ name?: string }>('ssr-same-render')
      return <output>reader:{data?.name}</output>
    }

    const html = renderToString(
      <Form.Handler id="ssr-same-render" data={{ name: 'Alice' }}>
        <Value.String path="/name" />
        <Reader />
      </Form.Handler>
    )

    expect(html).toContain('Alice')
    expect(html).toContain('reader:<!-- -->Alice')
  })

  it('should share data with components outside Form.Handler inside a Provider', () => {
    const Reader = () => {
      const { data } = Form.useData<{ name?: string }>('ssr-provider')
      return <output>reader:{data?.name}</output>
    }

    const html = renderToString(
      <SharedProvider>
        <Form.Handler id="ssr-provider" data={{ name: 'Alice' }}>
          <Field.String path="/name" />
        </Form.Handler>
        <Reader />
      </SharedProvider>
    )

    expect(html).toContain('reader:<!-- -->Alice')

    const nextHtml = renderToString(
      <SharedProvider>
        <Form.Handler id="ssr-provider">
          <Field.String path="/name" />
        </Form.Handler>
        <Reader />
      </SharedProvider>
    )

    expect(nextHtml).not.toContain('Alice')
  })

  it('should use initial data from Form.useData in a parent inside a Provider', () => {
    const MyForm = () => {
      const { data } = Form.useData('ssr-parent-data', { foo: 'bar' })

      return (
        <Form.Handler id="ssr-parent-data">
          <Value.String path="/foo" label={`label-${data.foo}`} />
        </Form.Handler>
      )
    }

    const html = renderToString(
      <SharedProvider>
        <MyForm />
      </SharedProvider>
    )

    expect(html).toContain('label-bar')
    expect(html).toContain('>bar<')
  })

  describe('imperative helpers', () => {
    // warn() logs the "Eufemia" badge first and the message second
    const getWarnings = (log: ReturnType<typeof vi.spyOn>) =>
      log.mock.calls.map(([, message]) => message)

    let log: ReturnType<typeof vi.spyOn>

    beforeEach(() => {
      log = vi.spyOn(console, 'log').mockImplementation(() => {})
    })

    afterEach(() => {
      log.mockRestore()
    })

    it('should warn once when Form.getData runs during a server render', () => {
      const Reader = () => {
        const { data } = Form.getData<{ name?: string }>('ssr-get-data')
        return <output>name:{data?.name}</output>
      }
      const element = (
        <SharedProvider>
          <Form.Handler id="ssr-get-data" data={{ name: 'Alice' }}>
            <Reader />
          </Form.Handler>
        </SharedProvider>
      )

      const html = renderToString(element)
      renderToString(element)

      // Form.getData cannot reach the store of the render, also inside a Provider
      expect(html).not.toContain('Alice')
      expect(getWarnings(log)).toEqual([
        "Form.getData('ssr-get-data') does not get form data during server rendering. Use Form.useData or Form.useDataWithoutSubscription inside the component instead.",
      ])
    })

    it('should warn with its own name when Iterate.count runs during a server render', () => {
      const Reader = () => (
        <output>
          count:{Iterate.count({ id: 'ssr-count-fn', path: '/list' })}
        </output>
      )

      const html = renderToString(
        <SharedProvider>
          <Form.Handler id="ssr-count-fn" data={{ list: [1, 2, 3] }}>
            <Reader />
          </Form.Handler>
        </SharedProvider>
      )

      expect(html).toContain('count:<!-- -->NaN')
      expect(getWarnings(log)).toEqual([
        "Iterate.count('ssr-count-fn') does not get form data during server rendering. Use Iterate.useCount inside the component instead.",
      ])
    })

    it('should warn when Form.setData runs on the server', () => {
      Form.setData('ssr-set-data-warning', { name: 'Alice' })

      expect(getWarnings(log)).toEqual([
        'Form.setData(\'ssr-set-data-warning\') has no effect during server rendering. Give the data to Form.Handler with "data" or "defaultData" instead.',
      ])
    })

    it('should name only the helper, and warn once, when the id is not a string', () => {
      const id = {}

      Form.getData(id)
      Form.getData(id)

      expect(getWarnings(log)).toEqual([
        'Form.getData does not get form data during server rendering. Use Form.useData or Form.useDataWithoutSubscription inside the component instead.',
      ])
    })

    it('should give the data to the hooks that the warnings recommend', () => {
      const Reader = () => {
        const { data } = Form.useData<{ list: number[] }>('ssr-hooks')
        const { getData } = Form.useDataWithoutSubscription<{
          list: number[]
        }>('ssr-hooks')
        const { count } = Iterate.useCount('ssr-hooks')

        return (
          <output>
            {`useData:${data.list.length} without:${getData().list.length} useCount:${count('/list')}`}
          </output>
        )
      }

      const html = renderToString(
        <SharedProvider>
          <Form.Handler id="ssr-hooks" data={{ list: [1, 2, 3] }}>
            <Reader />
          </Form.Handler>
        </SharedProvider>
      )

      expect(html).toContain('useData:3 without:3 useCount:3')
      expect(getWarnings(log)).toEqual([])
    })
  })
})
