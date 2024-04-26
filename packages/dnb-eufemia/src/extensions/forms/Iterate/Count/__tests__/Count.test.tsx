import React from 'react'
import { render } from '@testing-library/react'
import { makeUniqueId } from '../../../../../shared/component-helper'
import { Count, count, useCount } from '../Count'
import { DataContext } from '../../..'

describe('Iterate.Count', () => {
  let identifier: string

  beforeEach(() => {
    identifier = makeUniqueId()
  })

  describe('array data', () => {
    describe('within DataContext', () => {
      it('should return correct count', () => {
        const path = '/myList'
        const data = {
          myList: [1, 2, 3],
        }

        const { container } = render(
          <DataContext.Provider data={data}>
            <Count path={path} />
          </DataContext.Provider>
        )

        expect(container).toHaveTextContent('3')
      })

      it('should filter the pointer data and return the count', () => {
        const path = '/myList'
        const data = {
          myList: [1, 2, 3],
        }
        const filter = (value) => {
          return value > 1
        }

        const { container } = render(
          <DataContext.Provider data={data}>
            <Count path={path} filter={filter} />
          </DataContext.Provider>
        )

        expect(container).toHaveTextContent('2')
      })

      it('should return correct count when called as a hook', () => {
        const path = '/myList'
        const data = {
          myList: [1, 2, 3],
        }
        let value = null

        const MockComponent = () => {
          const { count } = useCount()
          return (value = count(path))
        }

        const { container } = render(
          <DataContext.Provider data={data}>
            <MockComponent />
          </DataContext.Provider>
        )

        expect(container).toHaveTextContent('3')
        expect(value).toBe(3)
      })

      it('should filter the pointer data and return the count when called as a hook', () => {
        const path = '/myList'
        const data = {
          myList: [1, 2, 3],
        }
        const filter = (value) => {
          return value > 1
        }
        let value = null

        const MockComponent = () => {
          const { count } = useCount()
          return (value = count(path, filter))
        }

        const { container } = render(
          <DataContext.Provider data={data}>
            <MockComponent />
          </DataContext.Provider>
        )

        expect(container).toHaveTextContent('2')
        expect(value).toBe(2)
      })

      it('should return NaN when non existing', () => {
        const path = '/invalid'
        const data = {
          myList: [1, 2, 3],
        }

        const { container } = render(
          <DataContext.Provider data={data}>
            <Count path={path} />
          </DataContext.Provider>
        )

        expect(container).toHaveTextContent('NaN')
      })
    })

    describe('outside of DataContext', () => {
      it('should return correct count', () => {
        const id = identifier
        const path = '/myList'
        const data = {
          myList: [1, 2, 3],
        }

        const { container } = render(
          <>
            <DataContext.Provider id={id} data={data}>
              -
            </DataContext.Provider>
            <Count id={id} path={path} />
          </>
        )

        expect(container).toHaveTextContent('3')
      })

      it('should return correct count when called as a function', () => {
        const id = identifier
        const path = '/myList'
        const data = {
          myList: [1, 2, 3],
        }
        let value = null

        const MockComponent = () => {
          return (value = count({ id, path }))
        }

        const { container } = render(
          <>
            <DataContext.Provider id={id} data={data}>
              -
            </DataContext.Provider>
            <MockComponent />
          </>
        )
        expect(container).toHaveTextContent('3')
        expect(value).toBe(3)
      })

      it('should return correct count when called as a hook before DataContext', () => {
        const id = identifier
        const path = '/myList'
        const data = {
          myList: [1, 2, 3],
        }
        let value = null

        const MockComponent = () => {
          const { count } = useCount(id)
          return (value = count(path))
        }

        const { container } = render(
          <>
            <MockComponent />
            <DataContext.Provider id={id} data={data}>
              -
            </DataContext.Provider>
          </>
        )
        expect(container).toHaveTextContent('3')
        expect(value).toBe(3)
      })

      it('should return NaN when non existing', () => {
        const id = identifier
        const path = '/invalid'
        const data = {
          myList: [1, 2, 3],
        }

        const { container } = render(
          <>
            <DataContext.Provider id={id} data={data}>
              -
            </DataContext.Provider>
            <Count id={id} path={path} />
          </>
        )

        expect(container).toHaveTextContent('NaN')
      })
    })
  })

  describe('object data', () => {
    describe('within DataContext', () => {
      it('should return correct count', () => {
        const path = '/myList'
        const data = {
          myList: { foo: 1, bar: 2, baz: 3 },
        }

        const { container } = render(
          <DataContext.Provider data={data}>
            <Count path={path} />
          </DataContext.Provider>
        )

        expect(container).toHaveTextContent('3')
      })

      it('should filter the pointer data and return the count', () => {
        const path = '/myList'
        const data = {
          myList: { foo: 1, bar: 2, baz: 3 },
        }
        const filter = ([key, value]) => {
          return value > 1
        }

        const { container } = render(
          <DataContext.Provider data={data}>
            <Count path={path} filter={filter} />
          </DataContext.Provider>
        )

        expect(container).toHaveTextContent('2')
      })

      it('should return correct count when called as a hook', () => {
        const path = '/myList'
        const data = {
          myList: { foo: 1, bar: 2, baz: 3 },
        }
        let value = null

        const MockComponent = () => {
          const { count } = useCount()
          return (value = count(path))
        }

        const { container } = render(
          <DataContext.Provider data={data}>
            <MockComponent />
          </DataContext.Provider>
        )

        expect(container).toHaveTextContent('3')
        expect(value).toBe(3)
      })

      it('should filter the pointer data and return the count when called as a hook', () => {
        const path = '/myList'
        const data = {
          myList: { foo: 1, bar: 2, baz: 3 },
        }
        const filter = ([key, value]) => {
          return value > 1
        }
        let value = null

        const MockComponent = () => {
          const { count } = useCount()
          return (value = count(path, filter))
        }

        const { container } = render(
          <DataContext.Provider data={data}>
            <MockComponent />
          </DataContext.Provider>
        )

        expect(container).toHaveTextContent('2')
        expect(value).toBe(2)
      })

      it('should return NaN when non existing', () => {
        const path = '/invalid'
        const data = {
          myList: { foo: 1, bar: 2, baz: 3 },
        }

        const { container } = render(
          <DataContext.Provider data={data}>
            <Count path={path} />
          </DataContext.Provider>
        )

        expect(container).toHaveTextContent('NaN')
      })
    })

    describe('outside of DataContext', () => {
      it('should return correct count', () => {
        const id = identifier
        const path = '/myList'
        const data = {
          myList: { foo: 1, bar: 2, baz: 3 },
        }

        const { container } = render(
          <>
            <DataContext.Provider id={id} data={data}>
              -
            </DataContext.Provider>
            <Count id={id} path={path} />
          </>
        )

        expect(container).toHaveTextContent('3')
      })

      it('should return correct count when called as a function', () => {
        const id = identifier
        const path = '/myList'
        const data = {
          myList: { foo: 1, bar: 2, baz: 3 },
        }
        let value = null

        const MockComponent = () => {
          return (value = count({ id, path }))
        }

        const { container } = render(
          <>
            <DataContext.Provider id={id} data={data}>
              -
            </DataContext.Provider>
            <MockComponent />
          </>
        )
        expect(container).toHaveTextContent('3')
        expect(value).toBe(3)
      })

      it('should return correct count when called as a hook before DataContext', () => {
        const id = identifier
        const path = '/myList'
        const data = {
          myList: { foo: 1, bar: 2, baz: 3 },
        }
        let value = null

        const MockComponent = () => {
          const { count } = useCount(id)
          return (value = count(path))
        }

        const { container } = render(
          <>
            <MockComponent />
            <DataContext.Provider id={id} data={data}>
              -
            </DataContext.Provider>
          </>
        )
        expect(container).toHaveTextContent('3')
        expect(value).toBe(3)
      })

      it('should return NaN when non existing', () => {
        const id = identifier
        const path = '/invalid'
        const data = {
          myList: { foo: 1, bar: 2, baz: 3 },
        }

        const { container } = render(
          <>
            <DataContext.Provider id={id} data={data}>
              -
            </DataContext.Provider>
            <Count id={id} path={path} />
          </>
        )

        expect(container).toHaveTextContent('NaN')
      })
    })
  })
})
