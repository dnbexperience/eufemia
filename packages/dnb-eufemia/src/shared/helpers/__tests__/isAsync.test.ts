import { isAsync } from '../isAsync'

describe('isAsync', () => {
  it('should return correct result based on arrow functions', () => {
    expect(isAsync(() => null)).toBeFalsy()
    expect(isAsync(async () => null)).toBeTruthy()

    const IAmSync = () => null
    const IAmAsync = async () => null

    expect(isAsync(IAmSync)).toBeFalsy()
    expect(isAsync(IAmAsync)).toBeTruthy()
  })

  it('should return correct result based with jest mock', () => {
    expect(isAsync(jest.fn(() => null))).toBeFalsy()
    expect(isAsync(jest.fn(async () => null))).toBeTruthy()

    const IAmSync = jest.fn(() => null)
    const IAmAsync = jest.fn(async () => null)

    expect(isAsync(IAmSync)).toBeFalsy()
    expect(isAsync(IAmAsync)).toBeTruthy()
  })

  it('should return correct result based normal functions', () => {
    expect(
      isAsync(function () {
        return null
      })
    ).toBeFalsy()
    expect(
      isAsync(async function () {
        return null
      })
    ).toBeTruthy()

    function IAmSync() {
      return null
    }
    async function IAmAsync() {
      return null
    }

    expect(isAsync(IAmSync)).toBeFalsy()
    expect(isAsync(IAmAsync)).toBeTruthy()
  })

  it('should not support functions with a promise', () => {
    expect(
      isAsync(() => {
        return new Promise(() => null)
      })
    ).toBeFalsy()

    expect(
      isAsync(function () {
        return new Promise(() => null)
      })
    ).toBeFalsy()
  })

  it('should return false is no function was given', () => {
    expect(isAsync(undefined)).toBeFalsy()
  })

  it('should return correct result based async function transpiled using @babel/plugin-transform-async-to-generator', () => {
    function asyncGeneratorStep(n, t, e, r, o, a, c) {
      try {
        var i = n[a](c),
          u = i.value
      } catch (n) {
        return void e(n)
      }
      i.done ? t(u) : Promise.resolve(u).then(r, o)
    }
    function _asyncToGenerator(n) {
      return function () {
        var t = this,
          e = arguments
        return new Promise(function (r, o) {
          var a = n.apply(t, e)
          function _next(n) {
            asyncGeneratorStep(a, r, o, _next, _throw, 'next', n)
          }
          function _throw(n) {
            asyncGeneratorStep(a, r, o, _next, _throw, 'throw', n)
          }
          _next(void 0)
        })
      }
    }
    var _ref = _asyncToGenerator(function* () {
      console.log('async')
    })

    function onSubmit() {
      return _ref.apply(this, arguments)
    }
    expect(isAsync(onSubmit)).toBeTruthy()
  })

  it('should return true if the situation is unclear', () => {
    function IAmSync() {
      return null
    }
    Object.defineProperty(IAmSync.constructor, 'name', {
      value: 'AsyncFunction',
    })

    expect(isAsync(IAmSync)).toBeTruthy()
  })
})
