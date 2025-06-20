/**
 * Scripts test
 *
 */

import { runFactory } from '../makeLibStyles'

jest.mock('ora', () => {
  return jest.fn(() => ({
    start: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    succeed: jest.fn(),
    fail: jest.fn(),
  }))
})

jest.setTimeout(30e3)

describe('makeLibStyles transform main SASS to CSS', () => {
  beforeAll(async () => {
    global.css = await runFactory(
      './src/components/button/style/dnb-button.scss',
      {
        returnResult: true,
      }
    )
    global.files = await runFactory(
      './src/components/button/style/dnb-button.scss',
      {
        returnFiles: true,
      }
    )
  })

  it('has to contain a button selector', () => {
    expect(global.css[0]).toMatch(new RegExp('.dnb-button\\s?{'))
  })

  it('has to contain a icon selector as it is a dependency', () => {
    expect(global.css[0]).toMatch(new RegExp('.dnb-icon\\s?{'))
  })

  it('should not contain a reset scope like font-family', () => {
    expect(global.css[0]).not.toContain('font-family')
  })

  it('should contain a non minified and a minified content', () => {
    expect(global.css[0]).toContain(':root {')
    expect(global.css[1]).toContain(':root{--')
  })

  it('includes correct files', () => {
    expect(global.files).toHaveLength(2)
    expect(global.files[0]).toContain(
      '/components/button/style/dnb-button.css'
    )
    expect(global.files[1]).toContain(
      '/components/button/style/dnb-button.min.css'
    )
  })
})

describe('makeLibStyles with enableBuildStyleScope', () => {
  // Ensure enableBuildStyleScope returns true
  let originalEnv
  beforeAll(() => {
    originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'production'
    jest.resetModules()
  })
  afterAll(() => {
    process.env.NODE_ENV = originalEnv
  })

  // Mock console.log to suppress lines containing '✨'
  const originalConsoleLog = console.log
  beforeAll(() => {
    console.log = (...args) => {
      if (
        args.some((arg) => typeof arg === 'string' && arg.includes('✨'))
      )
        return
      originalConsoleLog(...args)
    }
  })
  afterAll(() => {
    console.log = originalConsoleLog
  })

  // Run the factory
  beforeAll(async () => {
    const { runFactory } = await import('../makeLibStyles')
    global.css = await runFactory(
      './src/components/button/style/dnb-button.scss',
      {
        returnResult: true,
      }
    )
    global.files = await runFactory(
      './src/components/button/style/dnb-button.scss',
      {
        returnFiles: true,
      }
    )
  })

  it('should transform CSS to have scoped selectors', async () => {
    expect(global.css[0]).toContain('.eufemia-scope--default ')

    const count = (global.css[0].match(/\.eufemia-scope--default /g) || [])
      .length
    expect(count).toBeGreaterThan(50)
  })

  it('should generate isolated CSS files', async () => {
    expect(global.files.some((f) => f.includes('--isolated.css'))).toBe(
      true
    )
    expect(
      global.files.some((f) => f.includes('--isolated.min.css'))
    ).toBe(true)
  })
})
