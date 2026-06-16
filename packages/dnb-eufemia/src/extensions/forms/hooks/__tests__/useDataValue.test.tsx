import { render, renderHook, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useDataValue from '../useDataValue'
import Provider from '../../DataContext/Provider'
import { Form, Iterate } from '../..'

describe('useDataValue', () => {
  describe('getValue', () => {
    it('should return given value when no path is provided', () => {
      const { result } = renderHook(() => useDataValue('Test Value'))

      expect(result.current.value).toBe('Test Value')
    })

    it('should return undefined value when incorrect path is provided', () => {
      const { result } = renderHook(() =>
        useDataValue('/example/path', 'Test Value')
      )

      expect(result.current.value).toBeUndefined()
    })

    it('should return the correct value when path is provided', () => {
      const { result } = renderHook(
        () => useDataValue('/example/path', 'Test Value'),
        {
          wrapper: (props) => (
            <Provider
              {...props}
              data={{ example: { path: 'Test Value' } }}
            />
          ),
        }
      )

      expect(result.current.value).toBe('Test Value')
    })

    it('should return undefined when path is not found', () => {
      const { result } = renderHook(() =>
        useDataValue('/nonexistent/path')
      )

      expect(result.current.value).toBeUndefined()
    })

    it('should return the correct value when source is a path', () => {
      const { result } = renderHook(() => useDataValue(), {
        wrapper: (props) => (
          <Provider
            {...props}
            data={{ example: { path: 'Test Value' } }}
          />
        ),
      })

      expect(result.current.getSourceValue('/example/path')).toBe(
        'Test Value'
      )
    })

    it('should return the whole data set when the path is one level like "/"', () => {
      const { result } = renderHook(() => useDataValue(), {
        wrapper: (props) => (
          <Provider
            {...props}
            data={{ example: { path: 'Test Value' } }}
          />
        ),
      })

      expect(result.current.getSourceValue('/')).toEqual({
        example: { path: 'Test Value' },
      })
    })

    it('should return the given value when source is not a path', () => {
      const { result } = renderHook(() => useDataValue())

      expect(result.current.getSourceValue('Test Value')).toBe(
        'Test Value'
      )
    })
  })

  describe('getData', () => {
    it('should return the correct value when source is a path', () => {
      const { result } = renderHook(() => useDataValue(), {
        wrapper: (props) => (
          <Provider
            {...props}
            data={{ example: { path: { nested: 'Test Value' } } }}
          />
        ),
      })

      expect(result.current.getData('/example/path')).toEqual({
        nested: 'Test Value',
      })
    })

    it('should include current path/data key when includeCurrentPath is true', () => {
      const { result } = renderHook(() => useDataValue(), {
        wrapper: (props) => (
          <Provider
            {...props}
            data={{ example: { path: { nested: 'Test Value' } } }}
          />
        ),
      })

      expect(
        result.current.getData('/example/path', {
          includeCurrentPath: true,
        })
      ).toEqual({ example: { path: { nested: 'Test Value' } } })
    })

    it('should include the whole data set when the path is one level "/" and includeCurrentPath is true', () => {
      const { result } = renderHook(() => useDataValue(), {
        wrapper: (props) => (
          <Provider
            {...props}
            data={{ example: { path: { nested: 'Test Value' } } }}
          />
        ),
      })

      expect(
        result.current.getData('/', {
          includeCurrentPath: true,
        })
      ).toEqual({ example: { path: { nested: 'Test Value' } } })
    })

    it('should return value with getValueByPath', () => {
      const { result } = renderHook(() => useDataValue(), {
        wrapper: (props) => (
          <Provider
            {...props}
            data={{ example: { path: { nested: 'Test Value' } } }}
          />
        ),
      })

      expect(result.current.getValueByPath('/example/path')).toEqual({
        nested: 'Test Value',
      })
    })

    it('should return value with getValueByIteratePath', () => {
      const { result } = renderHook(() => useDataValue(), {
        wrapper: (props) => {
          return (
            <Provider
              data={{
                example: { list: [{ title: 'one' }, { title: 'two' }] },
              }}
            >
              <Iterate.Array {...props} path="/example/list" />
            </Provider>
          )
        },
      })

      expect(result.current.getValueByIteratePath('/title')).toEqual('two')
    })

    it('should return undefined when source is not a path', () => {
      const { result } = renderHook(() => useDataValue())

      expect(result.current.getData('Test Value')).toBeUndefined()
    })
  })

  describe('subscriptions', () => {
    it('should update when subscribed path changes', async () => {
      function Value() {
        const { value } = useDataValue('/example/path')

        return <output>{value as string}</output>
      }

      function ChangeValue() {
        const { update } = Form.useData()

        return (
          <button
            type="button"
            onClick={() => update('/example/path', 'Updated Value')}
          >
            Change value
          </button>
        )
      }

      render(
        <Provider data={{ example: { path: 'Test Value' } }}>
          <Value />
          <ChangeValue />
        </Provider>
      )

      expect(screen.getByText('Test Value')).toBeInTheDocument()

      await userEvent.click(screen.getByText('Change value'))

      expect(screen.getByText('Updated Value')).toBeInTheDocument()
    })

    it('should update when any subscribed path changes', async () => {
      function Value() {
        const { getSourceValue } = useDataValue(['/first', '/second'])

        return (
          <output>
            {getSourceValue('/first') as string}:{' '}
            {getSourceValue('/second') as string}
          </output>
        )
      }

      function ChangeValue() {
        const { update } = Form.useData()

        return (
          <button type="button" onClick={() => update('/second', 'Two')}>
            Change value
          </button>
        )
      }

      render(
        <Provider data={{ first: 'One', second: 'Second' }}>
          <Value />
          <ChangeValue />
        </Provider>
      )

      expect(screen.getByText('One: Second')).toBeInTheDocument()

      await userEvent.click(screen.getByText('Change value'))

      expect(screen.getByText('One: Two')).toBeInTheDocument()
    })

    it('should support absolute paths inside Iterate', () => {
      function Value() {
        const { value } = useDataValue('/rootValue', undefined, {
          pathType: 'absolute',
        })

        return <output>{value as string}</output>
      }

      render(
        <Provider
          data={{
            rootValue: 'Root Value',
            items: [{ value: 'Item Value' }],
          }}
        >
          <Iterate.Array path="/items">
            <Value />
          </Iterate.Array>
        </Provider>
      )

      expect(screen.getByText('Root Value')).toBeInTheDocument()
    })

    it('should support iterate paths explicitly', () => {
      function Value() {
        const { value } = useDataValue('/value', undefined, {
          pathType: 'iterate',
        })

        return <output>{value as string}</output>
      }

      render(
        <Provider data={{ items: [{ value: 'Item Value' }] }}>
          <Iterate.Array path="/items">
            <Value />
          </Iterate.Array>
        </Provider>
      )

      expect(screen.getByText('Item Value')).toBeInTheDocument()
    })
  })
})
