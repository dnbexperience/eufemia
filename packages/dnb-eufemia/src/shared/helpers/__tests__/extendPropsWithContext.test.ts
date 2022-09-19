import { extendPropsWithContext } from '../extendPropsWithContext'

describe('"extendPropsWithContext" should', () => {
  it('extend prop from other context object', () => {
    expect(
      extendPropsWithContext(
        { key: { x: 'y' }, foo: null }, // given props
        { key: { x: 'y' }, foo: null }, // default props
        { key: 'I can’t replace You', foo: 'bar' }
      )
    ).toEqual({
      key: { x: 'y' },
      foo: 'bar', // because the prop was null, we get bar
    })
  })
})
