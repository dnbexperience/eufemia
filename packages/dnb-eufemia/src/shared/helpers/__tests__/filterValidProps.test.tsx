import { filterValidProps } from '../filterValidProps'

describe('filterValidProps', () => {
  it('should return only declared props', () => {
    type Props = {
      key: string
      foo: string
    }
    const props: Props = { key: 'only-me', foo: 'bar' }
    const validKeys = { key: null }

    const result = filterValidProps(props, validKeys)
    expect(result).toEqual({
      key: 'only-me',
    })
  })

  it('should exclude unwanted props', () => {
    type Props = {
      key: string
      foo: string
    }
    const props: Props = { key: 'only-me', foo: 'bar' }
    const validKeys = { key: null, foo: null }
    const excludeKeys = { foo: null }

    const result = filterValidProps(props, validKeys, excludeKeys)
    expect(result).toEqual({
      key: 'only-me',
    })
  })
})
