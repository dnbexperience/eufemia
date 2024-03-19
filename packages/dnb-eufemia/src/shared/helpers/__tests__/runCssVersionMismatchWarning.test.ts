import { runCssVersionMismatchWarning } from '../runCssVersionMismatchWarning'

describe('runCssVersionMismatchWarning', () => {
  let consoleErrorSpy, originalGetComputedStyle

  const NODE_ENV = process.env.NODE_ENV

  beforeEach(() => {
    const requestAnimationFrame = jest.fn((fn) => {
      fn()
      return 1
    })

    jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation(requestAnimationFrame)

    process.env.NODE_ENV = 'development'
    originalGetComputedStyle = window.getComputedStyle
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
  })

  afterEach(() => {
    process.env.NODE_ENV = NODE_ENV
    window.getComputedStyle = originalGetComputedStyle
    consoleErrorSpy?.mockRestore()
    if (window?.Eufemia) {
      delete window.Eufemia.version
    }
  })

  it('should not log any error if NODE_ENV is not "development"', () => {
    const originalNodeEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'

    runCssVersionMismatchWarning()

    expect(consoleErrorSpy).not.toHaveBeenCalled()

    process.env.NODE_ENV = originalNodeEnv
  })

  it('should not log any error if jsVersion is "__VERSION__"', () => {
    const originalJsVersion = window.Eufemia?.version
    window.Eufemia = { version: '__VERSION__' }

    runCssVersionMismatchWarning()

    expect(consoleErrorSpy).not.toHaveBeenCalled()

    window.Eufemia.version = originalJsVersion
  })

  it('should log an error if cssVersion and jsVersion are different', () => {
    const originalJsVersion = window.Eufemia?.version
    window.Eufemia = { version: '1.0.0' }

    window.getComputedStyle = jest.fn().mockReturnValue({
      getPropertyValue: jest.fn().mockReturnValue('"2.0.0"'),
    })

    runCssVersionMismatchWarning()

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1)
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Eufemia CSS and JS version mismatch!',
      '\nCSS: 2.0.0',
      '\nJS: 1.0.0'
    )

    window.Eufemia.version = originalJsVersion
  })

  it('should log an error if cssVersion is not available', () => {
    const originalJsVersion = window.Eufemia?.version
    window.Eufemia = { version: '1.0.0' }

    window.getComputedStyle = jest.fn().mockReturnValue({
      getPropertyValue: jest.fn().mockReturnValue(undefined),
    })

    runCssVersionMismatchWarning()

    expect(consoleErrorSpy).toHaveBeenCalledTimes(0)

    window.Eufemia.version = originalJsVersion
  })

  it('should not log any error if document is not complete', () => {
    Object.defineProperty(document, 'readyState', {
      configurable: true,
      get: () => 'loading',
    })

    const addEventListener = jest.fn()
    jest
      .spyOn(window, 'addEventListener')
      .mockImplementation(addEventListener)

    runCssVersionMismatchWarning()

    expect(consoleErrorSpy).not.toHaveBeenCalled()
    expect(addEventListener).toHaveBeenCalledWith(
      'load',
      expect.any(Function)
    )
  })

  it('should call runCheck with requestAnimationFrame if document is complete', () => {
    const originalDocument = global.document

    Object.defineProperty(document, 'readyState', {
      configurable: true,
      get: () => 'complete',
    })

    const requestAnimationFrameSpy = jest
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementationOnce(jest.fn())

    runCssVersionMismatchWarning()

    expect(consoleErrorSpy).not.toHaveBeenCalled()
    expect(requestAnimationFrameSpy).toHaveBeenCalledWith(
      expect.any(Function)
    )

    global.document = originalDocument
    requestAnimationFrameSpy.mockRestore()
  })

  it('should not log any error if document is undefined', () => {
    const originalDocument = global.document

    Object.defineProperty(global, 'document', {
      configurable: true,
      value: undefined,
    })

    runCssVersionMismatchWarning()

    expect(consoleErrorSpy).not.toHaveBeenCalled()

    Object.defineProperty(global, 'document', {
      configurable: true,
      value: originalDocument,
    })
  })
})
