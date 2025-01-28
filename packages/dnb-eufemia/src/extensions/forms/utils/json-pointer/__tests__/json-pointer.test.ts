import pointer, {
  compile,
  dict,
  get,
  has,
  parse,
  remove,
  set,
  walk,
  PointerPath,
} from '../../json-pointer'

describe('json-pointer', () => {
  let rfcExample, rfcValues, rfcParsed

  function resetExamples() {
    rfcExample = {
      foo: ['bar', 'baz'],
      bar: { baz: 10 },
      '': 0,
      'a/b': 1,
      'c%d': 2,
      'e^f': 3,
      'g|h': 4,
      'i\\j': 5,
      'k"l': 6,
      ' ': 7,
      'm~n': 8,
    }

    rfcValues = {
      '': rfcExample,
      '/foo': rfcExample.foo,
      '/foo/0': 'bar',
      '/bar': rfcExample.bar,
      '/bar/baz': 10,
      '/': 0,
      '/a~1b': 1,
      '/c%d': 2,
      '/e^f': 3,
      '/g|h': 4,
      '/i\\j': 5,
      '/k"l': 6,
      '/ ': 7,
      '/m~0n': 8,
    }

    rfcParsed = {
      '': { tokens: [], value: rfcExample },
      '/foo': { tokens: ['foo'], value: rfcExample.foo },
      '/foo/0': { tokens: ['foo', '0'], value: 'bar' },
      '/bar': { tokens: ['bar'], value: rfcExample.bar },
      '/bar/baz': { tokens: ['bar', 'baz'], value: 10 },
      '/': { tokens: [''], value: 0 },
      '/a~1b': { tokens: ['a/b'], value: 1 },
      '/c%d': { tokens: ['c%d'], value: 2 },
      '/e^f': { tokens: ['e^f'], value: 3 },
      '/g|h': { tokens: ['g|h'], value: 4 },
      '/i\\j': { tokens: ['i\\j'], value: 5 },
      '/k"l': { tokens: ['k"l'], value: 6 },
      '/ ': { tokens: [' '], value: 7 },
      '/m~0n': { tokens: ['m~n'], value: 8 },
    }
  }

  resetExamples()
  beforeEach(resetExamples)

  describe('get', () => {
    it('should work for root element', () => {
      const obj = {}
      expect(get(obj, '')).toBe(obj)
    })

    Object.keys(rfcValues).forEach((p) => {
      it('should work for "' + p + '"', () => {
        const expectedValue = rfcValues[p]
        expect(get(rfcExample, p)).toBe(expectedValue)
      })
    })

    Object.keys(rfcParsed).forEach((p) => {
      const tokens = [...rfcParsed[p].tokens]
      it('should work for ' + JSON.stringify(tokens), function () {
        const expectedValue = rfcParsed[p].value
        expect(get(rfcExample, tokens)).toBe(expectedValue)
      })
    })

    it('should work for with inherited properties', () => {
      function O() {
        // empty
      }
      O.prototype.x = 10
      expect(get(new O(), '/x')).toBe(10)
      expect(get(Object.create({ x: 10 }), '/x')).toBe(10)
    })
  })

  describe('set', () => {
    it('should throw when try to set the root object', () => {
      const obj = {} as PointerPath
      expect(() => set(pointer, obj, '')).toThrow(Error)
    })

    it('should set a value on an object with pointer', () => {
      const obj = {
        existing: 'bla',
      }

      set(obj, '/new-value/bla', 'expected')
      expect(obj['new-value'].bla).toBe('expected')
    })

    it('should set a value on an object with tokens', () => {
      const obj = {
        existing: 'bla',
      }

      set(obj, ['new-value', 'bla'], 'expected')
      expect(obj['new-value'].bla).toBe('expected')
    })

    it('should work on first level with pointer', () => {
      const obj = {
        existing: 'bla',
      }

      set(obj, '/first-level', 'expected')
      expect(obj['first-level']).toBe('expected')
    })

    it('should work on frozen objects', () => {
      const obj = {
        frozen: Object.freeze({}),
      }

      set(obj, '/frozen/first-level', 'expected')
      expect(obj['frozen']['first-level']).toBe('expected')
    })

    it('should work on first level with tokens', () => {
      const obj = {
        existing: 'bla',
      }

      set(obj, ['first-level'], 'expected')
      expect(obj['first-level']).toBe('expected')
    })

    it('should create arrays for numeric reference tokens and objects for other tokens', () => {
      const obj = []
      set(obj, '/0/test/0', 'expected')
      expect(Array.isArray(obj)).toBe(true)
      expect(Array.isArray(obj[0])).toBe(false)
      expect(Array.isArray(obj[0].test)).toBe(true)
    })

    it('should create arrays for numeric reference tokens and objects for other tokens when tokens are passed', () => {
      const obj = []
      set(obj, ['0', 'test', '0'], 'expected')
      expect(Array.isArray(obj)).toBe(true)
      expect(Array.isArray(obj[0])).toBe(false)
      expect(Array.isArray(obj[0].test)).toBe(true)
    })

    it('should create arrays for - and reference the (nonexistent) member after the last array element.', () => {
      const obj: Array<string & { test?: string }> = ['foo']
      set(obj, '/-/test/-', 'expected')
      expect(Array.isArray(obj)).toBe(true)
      expect(obj).toHaveLength(2)
      expect(Array.isArray(obj[1].test)).toBe(true)
      expect(obj[1].test).toHaveLength(1)
      expect(obj[1].test[0]).toBe('expected')
    })

    it('should create arrays for - and reference the (nonexistent) member after the last array element when tokens are passed.', () => {
      const obj: Array<string & { test?: string }> = ['foo']
      set(obj, ['-', 'test', '-'], 'expected')
      expect(Array.isArray(obj)).toBe(true)
      expect(obj).toHaveLength(2)
      expect(Array.isArray(obj[1].test)).toBe(true)
      expect(obj[1].test).toHaveLength(1)
      expect(obj[1].test[0]).toBe('expected')
    })
  })

  describe('remove', () => {
    Object.keys(rfcValues).forEach((p) => {
      if (p === '' || p === '/foo/0') return

      it('should work for "' + p + '"', () => {
        remove(rfcExample, p)
        expect(() => get(pointer, rfcExample)).toThrow(Error)
      })
    })

    it('should work for "/foo/0"', () => {
      const p = '/foo/0'
      remove(rfcExample, p)
      expect(get(rfcExample, p)).toBe('baz')
    })

    it('should work for "/foo/1"', () => {
      const p = '/foo/1'
      remove(rfcExample, p)
      expect(() => get(pointer, rfcExample)).toThrow(Error)
    })

    Object.keys(rfcParsed).forEach((p) => {
      if (p === '' || p === '/foo/0') return

      it(
        'should work for ' + JSON.stringify(rfcParsed[p].tokens),
        function () {
          remove(rfcExample, [...rfcParsed[p].tokens])
          expect(() => get(rfcExample, [...rfcParsed[p].tokens])).toThrow(
            Error
          )
        }
      )
    })

    it('should work for ["foo","0"]', () => {
      const p = ['foo', '0']
      remove(rfcExample, p)
      expect(get(rfcExample, p)).toBe('baz')
    })

    it('should work for ["foo","1"]', () => {
      const p = ['foo', '1']
      remove(rfcExample, p)
      expect(() => get(pointer, rfcExample)).toThrow(Error)
    })
  })

  describe('dict', () => {
    it('should return a dictionary (pointer -> value)', () => {
      const obj = {
          bla: {
            test: 'expected',
          },
          abc: 'bla',
        },
        dictResult = dict(obj)

      expect(dictResult['/bla/test']).toBe('expected')
      expect(dictResult['/abc']).toBe('bla')
    })

    it('should work with arrays', () => {
      const obj = {
          users: [{ name: 'example 1' }, { name: 'example 2' }],
        },
        dictResult = dict(obj),
        pointers = Object.keys(dictResult)

      expect(pointers).toHaveLength(2)
      expect(pointers[0]).toBe('/users/0/name')
      expect(pointers[1]).toBe('/users/1/name')
    })

    it('should work with other arrays', () => {
      const obj = {
          bla: {
            bli: [4, 5, 6],
          },
        },
        dictResult = dict(obj)
      expect(dictResult['/bla/bli/0']).toBe(4)
      expect(dictResult['/bla/bli/1']).toBe(5)
      expect(dictResult['/bla/bli/2']).toBe(6)
    })
  })

  describe('has', () => {
    it('should return true when the pointer exists', () => {
      const obj = {
        bla: {
          test: 'expected',
        },
        foo: [['hello']],
        abc: 'bla',
      }
      expect(has(obj, '/bla')).toBe(true)
      expect(has(obj, '/abc')).toBe(true)
      expect(has(obj, '/foo/0/0')).toBe(true)
      expect(has(obj, '/bla/test')).toBe(true)
    })

    it('should return true when the tokens point to value', () => {
      const obj = {
        bla: {
          test: 'expected',
        },
        foo: [['hello']],
        abc: 'bla',
      }
      expect(has(obj, ['bla'])).toBe(true)
      expect(has(obj, ['abc'])).toBe(true)
      expect(has(obj, ['foo', '0', '0'])).toBe(true)
      expect(has(obj, ['bla', 'test'])).toBe(true)
    })

    it('should return false when the pointer does not exist', () => {
      const obj = {
        bla: {
          test: 'expected',
        },
        abc: 'bla',
      }
      expect(has(obj, '/not-existing')).toBe(false)
      expect(has(obj, '/not-existing/bla')).toBe(false)
      expect(has(obj, '/test/1/bla')).toBe(false)
      expect(has(obj, '/bla/test1')).toBe(false)
    })

    it('should return false when the tokens do not point to value', () => {
      const obj = {
        bla: {
          test: 'expected',
        },
        abc: 'bla',
      }
      expect(has(obj, ['not-existing'])).toBe(false)
      expect(has(obj, ['not-existing', 'bla'])).toBe(false)
      expect(has(obj, ['test', '1', 'bla'])).toBe(false)
      expect(has(obj, ['bla', 'test1'])).toBe(false)
    })
  })

  describe('walk', () => {
    it('should iterate over an object', () => {
      walk({ bla: { test: 'expected' } }, function (value, pointer) {
        expect(pointer).toBe('/bla/test')
        expect(value).toBe('expected')
      })
    })
  })

  describe('parse', () => {
    it('should work with top level path', () => {
      expect(parse('/bla')[0]).toBe('bla')
      expect(parse('/bla')).toHaveLength(1)
    })

    it('should convert a pointer to an array of reference tokens', () => {
      expect(parse('/hello~0bla/test~1bla')[0]).toBe('hello~bla')
      expect(parse('/hello~0bla/test~1bla')[1]).toBe('test/bla')
    })
  })

  describe('compile', () => {
    it('should build a json pointer from an array of reference tokens', () => {
      expect(compile(['hello~bla', 'test/bla'])).toBe(
        '/hello~0bla/test~1bla'
      )
    })
  })

  describe('parse and then #compile pointer', () => {
    Object.keys(rfcValues).forEach((p) => {
      it('should equal for "' + p + '"', () => {
        expect(
          compile(parse(p) as Extract<PointerPath, Array<string>>)
        ).toBe(p)
      })
    })
  })
})
