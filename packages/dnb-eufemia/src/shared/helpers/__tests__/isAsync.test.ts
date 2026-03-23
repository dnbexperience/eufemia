import { isAsync } from '../isAsync'

describe('isAsync', () => {
  it('should return correct result based on arrow functions', () => {
    expect(isAsync((): null => null)).toBeFalsy()
    expect(isAsync(async (): Promise<null> => null)).toBeTruthy()

    const IAmSync = (): null => null
    const IAmAsync = async (): Promise<null> => null

    expect(isAsync(IAmSync)).toBeFalsy()
    expect(isAsync(IAmAsync)).toBeTruthy()
  })

  it('should return correct result based with jest mock', () => {
    expect(isAsync(jest.fn((): null => null))).toBeFalsy()
    expect(isAsync(jest.fn(async (): Promise<null> => null))).toBeTruthy()

    const IAmSync = jest.fn((): null => null)
    const IAmAsync = jest.fn(async (): Promise<null> => null)

    expect(isAsync(IAmSync)).toBeFalsy()
    expect(isAsync(IAmAsync)).toBeTruthy()
  })

  it('should return correct result based normal functions', () => {
    expect(
      isAsync(function (): null {
        return null
      })
    ).toBeFalsy()
    expect(
      isAsync(async function (): Promise<null> {
        return null
      })
    ).toBeTruthy()

    function IAmSync(): null {
      return null
    }
    async function IAmAsync(): Promise<null> {
      return null
    }

    expect(isAsync(IAmSync)).toBeFalsy()
    expect(isAsync(IAmAsync)).toBeTruthy()
  })

  it('should not support functions with a promise', () => {
    expect(
      isAsync((): Promise<null> => {
        return new Promise((): null => null)
      })
    ).toBeFalsy()

    expect(
      isAsync(function (): Promise<null> {
        return new Promise((): null => null)
      })
    ).toBeFalsy()
  })

  it('should return false is no function was given', () => {
    expect(isAsync(undefined)).toBeFalsy()
  })

  it('should return correct result based async function transpiled using @babel/plugin-transform-async-to-generator', () => {
    /* eslint-disable */
    function asyncGeneratorStep(
      n: any,
      t: any,
      e: any,
      r: any,
      o: any,
      a: any,
      c: any
    ): void {
      try {
        var i = n[a](c),
          u = i.value
      } catch (n) {
        return void e(n)
      }
      i.done ? t(u) : Promise.resolve(u).then(r, o)
    }
    function _asyncToGenerator(n: any) {
      return function (this: unknown) {
        var t = this,
          e = arguments
        return new Promise(function (r, o) {
          var a = n.apply(t, e)
          function _next(n: any) {
            asyncGeneratorStep(a, r, o, _next, _throw, 'next', n)
          }
          function _throw(n: any) {
            asyncGeneratorStep(a, r, o, _next, _throw, 'throw', n)
          }
          _next(void 0)
        })
      }
    }
    var _ref = _asyncToGenerator(function* () {
      console.log('async')
    })
    function onSubmit(this: unknown) {
      return _ref.apply(this, arguments as unknown as [])
    }
    /* eslint-enable */

    expect(isAsync(onSubmit)).toBeTruthy()
  })

  it('should return true if the situation is unclear', () => {
    function IAmSync(): null {
      return null
    }
    Object.defineProperty(IAmSync.constructor, 'name', {
      value: 'AsyncFunction',
    })

    expect(isAsync(IAmSync)).toBeTruthy()
  })
})
