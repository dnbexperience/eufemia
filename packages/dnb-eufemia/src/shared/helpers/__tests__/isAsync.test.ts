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

  it('should return true if the situation is unclear', () => {
    function IAmSync() {
      return null
    }
    Object.defineProperty(IAmSync.constructor, 'name', {
      value: 'AsyncFunction',
    })

    expect(isAsync(IAmSync)).toBeTruthy()
  })

  it('should return false is no function was given', () => {
    expect(isAsync(undefined)).toBeFalsy()
  })
})
