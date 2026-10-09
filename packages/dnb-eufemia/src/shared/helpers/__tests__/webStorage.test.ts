import { getWebStorage, readWebStorageJSON } from '../webStorage'

describe('webStorage', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    window.sessionStorage.clear()
    window.localStorage.clear()
  })

  describe('getWebStorage', () => {
    it('should return the session or local storage', () => {
      expect(getWebStorage('session')).toBe(window.sessionStorage)
      expect(getWebStorage('local')).toBe(window.localStorage)
    })

    it('should return undefined when the browser blocks the storage', () => {
      vi.spyOn(window, 'sessionStorage', 'get').mockImplementation(() => {
        throw new DOMException(
          'The operation is insecure.',
          'SecurityError'
        )
      })

      expect(getWebStorage('session')).toBeUndefined()
    })
  })

  describe('readWebStorageJSON', () => {
    it('should return the parsed value', () => {
      window.sessionStorage.setItem('key', JSON.stringify({ foo: 'bar' }))
      window.localStorage.setItem('key', JSON.stringify(['baz']))

      expect(readWebStorageJSON('session', 'key')).toEqual({ foo: 'bar' })
      expect(readWebStorageJSON('local', 'key')).toEqual(['baz'])
    })

    it('should return undefined when the key is missing', () => {
      expect(readWebStorageJSON('session', 'missing')).toBeUndefined()
    })

    it('should return undefined and remove the value when it is invalid JSON', () => {
      window.sessionStorage.setItem('key', '{invalid')

      expect(readWebStorageJSON('session', 'key')).toBeUndefined()
      expect(window.sessionStorage.getItem('key')).toBeNull()
    })

    it('should return undefined when the browser blocks the storage', () => {
      vi.spyOn(window, 'sessionStorage', 'get').mockImplementation(() => {
        throw new DOMException(
          'The operation is insecure.',
          'SecurityError'
        )
      })

      expect(readWebStorageJSON('session', 'key')).toBeUndefined()
    })

    it('should keep the value when reading it fails', () => {
      window.sessionStorage.setItem('key', JSON.stringify({ foo: 'bar' }))
      vi.spyOn(
        Object.getPrototypeOf(window.sessionStorage),
        'getItem'
      ).mockImplementationOnce(() => {
        throw new DOMException(
          'The operation is insecure.',
          'SecurityError'
        )
      })

      expect(readWebStorageJSON('session', 'key')).toBeUndefined()
      expect(window.sessionStorage.getItem('key')).toBe('{"foo":"bar"}')
    })
  })
})
