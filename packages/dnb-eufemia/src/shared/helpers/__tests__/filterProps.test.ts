import { filterProps } from '../filterProps'

describe('"filterProps" should', () => {
  describe('object', () => {
    const attributes = {
      key1: 'value1',
      key2: 'value2',
      attr1: 'value1',
      attr2: false,
    }
    const remove = {
      key1: 'value1',
      key2: false,
    }
    const add = ['key1']

    it('remove all unwanted properties', () => {
      expect(filterProps(attributes, remove)).toEqual({
        attr1: 'value1',
        attr2: false,
      })
    })

    it('remove all unwanted properties except "allowed"', () => {
      expect(filterProps(attributes, remove, add)).toEqual({
        key1: 'value1',
        attr1: 'value1',
        attr2: false,
      })
    })
  })

  describe('array', () => {
    const attributes = ['key1', 'key2', 'attr1', 'attr2']
    const remove = ['key1', 'key2']
    const add = ['key1']

    it('remove all unwanted properties', () => {
      expect(filterProps(attributes, remove)).toEqual(['attr1', 'attr2'])
    })

    it('remove all unwanted properties except "allowed"', () => {
      expect(filterProps(attributes, remove, add)).toEqual([
        'key1',
        'attr1',
        'attr2',
      ])
    })
  })

  describe('function', () => {
    describe('object', () => {
      const attributes = {
        key1: 'value1',
        key2: 'value2',
        attr1: 'value1',
        attr2: false,
      }
      const remove = (key) => ['key1', 'key2'].includes(key)
      const add = (key) => key === 'key1'

      it('remove all unwanted properties', () => {
        expect(filterProps(attributes, remove)).toEqual({
          attr1: 'value1',
          attr2: false,
        })
      })

      it('remove all unwanted properties except "allowed"', () => {
        expect(filterProps(attributes, remove, add)).toEqual({
          key1: 'value1',
          attr1: 'value1',
          attr2: false,
        })
      })
    })

    describe('array', () => {
      const attributes = ['key1', 'key2', 'attr1', 'attr2']
      const remove = (key: string) => ['key1', 'key2'].includes(key)
      const add = (key: string) => key === 'key1'

      it('remove all unwanted properties', () => {
        expect(filterProps(attributes, remove)).toEqual(['attr1', 'attr2'])
      })

      it('remove all unwanted properties except "allowed"', () => {
        expect(filterProps(attributes, remove, add)).toEqual([
          'key1',
          'attr1',
          'attr2',
        ])
      })
    })
  })
})
