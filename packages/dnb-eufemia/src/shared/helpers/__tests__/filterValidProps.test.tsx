import {
  FormElementProps,
  filterValidProps,
  pickFormElementProps,
  prepareFormElementContext,
} from '../filterValidProps'

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

  it('should exclude unwanted props even when validKeys is not set', () => {
    type Props = {
      key: string
      foo: string
    }
    const props: Props = { key: 'only-me', foo: 'bar' }
    const excludeKeys = { foo: null }

    const result = filterValidProps(props, null, excludeKeys)
    expect(result).toEqual({
      key: 'only-me',
    })
  })

  it('should pick FormElement props', () => {
    type Props = FormElementProps & {
      label_direction?: 'vertical' | 'horizontal'
      vertical?: boolean
      foo: string
      bar: boolean
      fizz: number
    }

    const props: Props = {
      label_direction: 'horizontal',
      vertical: true,
      foo: 'test',
      bar: false,
      fizz: 123,
    }

    const elementProps = pickFormElementProps(props)

    expect(elementProps).toEqual({
      label_direction: 'horizontal',
      vertical: true,
    })
  })

  it('should prepare FormElement direction', () => {
    const verticalTrue = prepareFormElementContext({ vertical: true })

    expect(verticalTrue).toEqual({
      labelDirection: 'vertical',
      label_direction: 'vertical',
      vertical: true,
    })

    const verticalFalse = prepareFormElementContext({ vertical: false })

    expect(verticalFalse).toEqual({
      labelDirection: undefined,
      label_direction: undefined,
      vertical: false,
    })
  })
})
